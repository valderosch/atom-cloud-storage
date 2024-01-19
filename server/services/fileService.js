const fs = require('fs');
const File = require('../models/File');
const config = require('config');

class FileService {

    createNewDir(file){
        const filePath = `${config.get('filepath')}\\${file.user}\\${file.filepath}`
        return new Promise((resolve, reject) => {
            try{
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath);
                    return resolve({
                        message: "File Created"
                    })
                } else {
                    return reject({
                        message: "File with this name already exist."
                    })
                }
            } catch (e) {
                return reject({
                    message: "File error!"
                })
            }
        })
    }

    deleteFile(file) {
        const path = this.getFilePath(file);
        if(file.filetype === 'dir'){
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path)
        }
    }

    getFilePath(file) {
        return config.get('filepath') + '\\' + file.user + '\\' + file.filepath;
    }
}




module.exports = new FileService();
