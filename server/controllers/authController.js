const {validationResult} = require("express-validator");
const User = require("../models/User");
const crypt = require("bcryptjs");
const fileService = require("../services/fileService");
const File = require("../models/File");
const jwt = require("jsonwebtoken");
const config = require("config");


class AuthController {
    async registerNewAccount(request, response){
        try{
            const errors = validationResult(request);
            if(!errors.isEmpty()){
                return response.status(400).json({
                    message : "Bad request .", errors
                })
            }

            const {email, password} = request.body;
            const candidate = await User.findOne({email});

            if(candidate){
                return response.status(400).json({
                    message: `User with mail ( ${email} ) already has an account`
                });
            }
            const hashedPassword = await crypt.hash(password, 5);
            const user = new User({email, password: hashedPassword});
            await user.save();
            await fileService.createNewDir(new File({
                user: user.id,
                name: ``
            }))
            return response.json({
                message: "New user was created!"
            })
        } catch (e) {
            console.log(e);
            response.send({
                message: "Error while [register] account"
            })
        }
    }

    async loginToAccount(request, response){
        try{
            const  {email, password} = request.body;
            const user = await User.findOne({email})
            if(!user){
                return response.status(404).json({
                    message: "User with this mail not found"
                })
            }
            const isValidPassword = crypt.compareSync(password, user.password)
            if(!isValidPassword){
                return response.status(400).json({
                    message: "Incorrect password"
                })
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return response.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e);
            response.send({
                message: "Error while [login] account"
            })
        }
    }

    async authoriseAccount(request, response){
        try{
            const user = await User.findOne({_id: request.user.id});
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
            return response.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e);
            response.send({
                message: "Error while [authorize] account"
            })
        }
    }
}

module.exports = new AuthController();