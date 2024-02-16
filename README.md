# ATOM Cloud Storage Application ☁
### Based on MERN Stack.
*current version: v0.2.5*

## About
Atom Cloud - simple fullstack web-application where users can store their files in remote storage. Named like cloud storage. because this app don`t need store files locally on user device. For calculationg operations and store information this app using server. Client application is presentes like light-weight page in browser without storing any data. 

### Actions
Regular user can perform these actions while using application.
- Upload files (by button / by dropping).
- Delete files.
- Download files to computer.
- Change view type of files grid.
- View additional info about files.
- Register and manage his account.
- View personal info.
- Change account details.

### Environment
**Client 💻**
- **JavaScript** as main language.
- **React** as tool for build interactive UI.
- **Redux** as adon for React.

**Server 📼**
- **JavaScript** as main language.
- **NodeJS** as building tool.
- **Express** for HTTP handling.

**Storage 🗃**
- **Mongo DB** as main tool to store information.

### Installing Application on your machine.
**Dependencies ⚠**
- Check that JavaScript / HTML / CSS supports by your system
- `NodeJS ver.16.20.0` and newer installed on your PC.
- You must have at least 250MB Free disk space.

**Installing ⚙**
1) Download source code from this repository to your machine.
2) Navigate to Folder ./server/
3) Open terminal, and run command `npm i` to install all dependencies.
4) After installing you must specify Mongodb access link
5) You nust to create MongoDB collection and database user.
6) Run server in release mode using `npm start` or 
in development mode using `npm run dev`
7) Navigate to Folder ./client and repeat step 3.
8) Start client application using `npm start`
9) Navigate to `http://localhost:4200` for dev. mode in your browser.
10) Use the app.