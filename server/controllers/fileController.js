const fileService = require('../services/fileService');
const File = require('../models/File');
const User = require('../models/User');

class FileController {
    async createDirectory (request, response){
        try {
            const {name, type, parent} = request.body;
            const file = new File({name, type, parent, user: user.id});
            const parentFile = await File.findOne({_id: parent});
            if(!parentFile) {
                file.filepath = name;
                await fileService.createNewDir(file);
            } else {
                file.filepath = `${parentFile.filepath}\\${file.name}`
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return response.json(file);
        } catch (e){
            console.log(e);
            return response.status(400).json({
                message: `Error: ${e}`
            })
        }
    }
}

module.exports = new FileController();