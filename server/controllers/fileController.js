const fileService = require('../services/fileService');
const config = require('config');
const File = require('../models/File');
const User = require('../models/User');
const fs = require('fs');

class FileController {
    async createDirectory (request, response){
        try {
            const {filename, filetype, parent} = request.body;
            const file = new File({filename, filetype, parent, user: request.user.id});
            const parentFile = await File.findOne({_id: parent});
            if(!parentFile) {
                file.filepath = filename;
                await fileService.createNewDir(file);
            } else {
                file.filepath = `${parentFile.filepath}\\${file.filename}`
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return response.json(file);
        } catch (e){
            console.log(e);
            return response.status(400).json(e);
        }
    }

    async fetchFile (request, response) {
        try {
            const files = await File.find({user: request.user.id, parent: request.query.parent})
            return response.json(files);
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Ooops! We can`t get this file"
            });
        }
    }

    async uploadFile(request, response){
        try{
            const file = request.files.file;
            const parent = await File.findOne({user: request.user.id, _id: request.body.parent});
            const user = await User.findOne({_id: request.user.id});

            if(user.usedSpace + file.size > user.storageSpace){
                return request.status(400).json({
                    message: "You don`t have space for this operation. Please delete previous files to upload new."
                })
            }
            user.usedSpace = user.usedSpace + file.size;

            let filepath;
            if (parent) {
                filepath = `${config.get('filepath')}\\${user._id}\\${parent.filepath}\\${file.name}`
            } else {
                filepath = `${config.get('filepath')}\\${user._id}\\${file.name}`
            }

            if (fs.existsSync(filepath)) {
                return response.status(400).json({
                    message: "File already exist!"
                });
            }
            file.mv(filepath);

            const cleanFileName = (name) => name.replace(/[\\/:*?"<>|]/g, '');
            const filetype = file && file.name ? file.name.split('.').pop() : 'unknown';

            const loadedFile = new File({
                filename: cleanFileName(file.name),
                filetype: filetype,
                size: file.size,
                filepath: parent?.filepath,
                parent: parent?._id,
                user: user._id
            })

            await loadedFile.save();
            await user.save();

            response.json(loadedFile);
        } catch (e) {
            console.log(e);
            return response.status(505).json({
                message: "Cant upload file"
            });
        }
    }
}

module.exports = new FileController();