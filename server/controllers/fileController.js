const fileService = require('../services/fileService');
const config = require('config');
const File = require('../models/File');
const User = require('../models/User');
const fs = require('fs');
const UUid = require('uuid');

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
                await fileService.createNewDir(file);
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
            const {sort} = request.query
            let files = '';
            switch (sort){
                case 'name':
                    files = await File.find({user: request.user.id, parent: request.query.parent}).sort({filename:-1});
                    break
                case 'type':
                    files = await File.find({user: request.user.id, parent: request.query.parent}).sort({filetype:1});
                    break
                case 'size':
                    files = await File.find({user: request.user.id, parent: request.query.parent}).sort({size:-1});
                    break
                case 'date':
                    files = await File.find({user: request.user.id, parent: request.query.parent}).sort({date:-1});
                    break
                default:
                    files = await File.find({user: request.user.id, parent: request.query.parent});
                    break
            }

            return response.json(files);
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Error while [fetching] file"
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

            const filetype = file && file.name ? file.name.split('.').pop() : 'unknown';
            let file_path = file.name;
            console.log(`FILENAME${file.filename} + FILE.NAME ${file.name}`)
            if (parent) {
                file_path = parent.filepath + "\\" + file.filename;
            }

            const loadedFile = new File({
                filename: file.name,
                filetype: filetype,
                size: file.size,
                filepath: file_path,
                parent: parent ? parent._id : null,
                user: user._id
            })

            await loadedFile.save();
            await user.save();

            response.json(loadedFile);
        } catch (e) {
            console.log(e);
            return response.status(505).json({
                message: "Error while [uploading] files"
            });
        }
    }

    async downloadFile(request, response) {
        try {
            const file = await File.findOne({_id:request.query.id, user: request.user.id})
            const path = `${config.get('filepath')}\\${request.user.id}\\${file.filepath}`;

            if(fs.existsSync(path)){
                return response.download(path, file.filename);
            } else {
                return response.status(404).json({
                    message: "Oops! File not found"
                });
            }
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Oops! Downloading problems"
            });
        }
    }

    async deleteFIle(request, response) {
        try {
            const file = await File.findOne({_id:request.query.id, user: request.user.id})

            if(!file){
                return response.status(404).json({
                    message: 'File not found'
                });
            }
            fileService.deleteFile(file);
            await File.deleteOne({ _id: file._id });
            return response.json({
                message: `File [${file.filename}] was deleted`
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Error while [deleting] assidefiles"
            });
        }
    }

    async searchFile(request, response){
        try {
            const searchName = request.query.search;
            let files = await File.find({user: request.user.id});
            files = files.filter(file => file.filename.includes(searchName));
            return response.json(files);
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Error while [searching] assidefiles"
            });
        }
    }

    async uploadAvatar(request, response){
        try{
            const file = request.files.file
            const user = await User.findById(request.user.id);
            const avatarFileName = UUid.v4() + '.jpg';
            file.mv(`${config.get('staticPath')}\\${avatarFileName}`);
            user.avatar = avatarFileName;
            await user.save();
            return response.json(user);
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Error while [uploading] avatar file"
            });
        }
    }

    async deleteAvatar(request, response){
        try{
            const user = await User.findById(request.user.id);
            fs.unlinkSync(`${config.get('staticPath')}\\${user.avatar}`);
            user.avatar = null;

            await user.save();
            return response.json(user);
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: "Error while [deleting] avatar"
            });
        }
    }
}

module.exports = new FileController();