const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const config = require("config");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const userRouter = require("./routes/user.routes");
const corsMiddleWare = require('./middleware/cors.middleware');
const filePathMiddleWare = require('./middleware/filepath.middleware');

const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const path = require('path');

app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}))
app.use(corsMiddleWare);
app.use(filePathMiddleWare(path.resolve(__dirname, 'files')));
app.use(express.json());
app.use(express.static('static'))

app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use('/api/user', userRouter);


const start = async () => {
    try{
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log(`Server started and listening port: ${PORT}`)
        })
    } catch (e){
        console.log(e);
    }
}

start()