const Router = require("express");
const User = require("../models/User");
const config = require("config");
const {check, validationResult} = require("express-validator");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middleware/auth.middleware");

const router = new Router();
router.post('/registration',
    [
        check('email', 'Incorrect email format.').isEmail(),
        check('password', 'Password must have at least 3 characters and shorter than 15').isLength({mim:3, max: 15})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message : "Bad request .", errors
            })
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if(candidate){
            return res.status(400).json({
                message: `User with mail ( ${email} ) already has an account`
            });
        }
        const hashedPassword = await crypt.hash(password, 5);
        const user = new User({email, password: hashedPassword});
        await user.save();
        return res.json({
            message: "New user was created!"
        })
    } catch (e) {
        console.log(e);
        res.send({
            message: "Server have some problems"
        })
    }
})

router.post('/login',
    async (req, res) => {
        try{
            const  {email, password} = req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({
                    message: "User with this mail not found"
                })
            }
            const isValidPassword = crypt.compareSync(password, user.password)
            if(!isValidPassword){
                return res.status(400).json({
                    message: "Incorrect password"
                })
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
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
            res.send({
                message: "Server have some problems"
            })
        }
    })

router.get('/auth', authMiddleWare,
    async (req, res) => {
        try{
            const user = await User.findOne({_id: req.user.id});
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
            return res.json({
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
            res.send({
                message: "Server have some problems"
            })
        }
    })


module.exports = router