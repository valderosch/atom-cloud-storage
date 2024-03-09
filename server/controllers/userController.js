const User = require("../models/User");
const UUid = require("uuid");
const config = require("config");
const fs = require("fs");


class userController {
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
                message: "Error while [uploading] avatar"
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

    async editUserEmail(request, response) {
        try {
            const user = await User.findById(request.user.id);
            if(request.email === user.email){
                return response.json({
                    message: "This E-mail is assigned already"
                });
            }
            user.email = request.email;
            await user.save();
            return response.json(user);
        }
        catch (e) {
            return response.status(500).json({
                message: "Error while [editing] Email"
            });
        }
    }
}

module.exports = new userController();