'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let favicon = require('serve-favicon');
let authenticationController = require('./AuthenticationController');
let halaqaController = require('./HalaqaController');

let fs = require('fs'),
    //multer is a package used to ease uploading files
    multer = require('multer'),
    path = require('path'),
    //node-uuid is a package to generate a unique identifier
    uuid = require('node-uuid');

let app = express();


//Allow serving static files
app.use(express.static(__dirname));
let port = 6070;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + '/image/favicon.ico'));

//Speficy upload options: destination path and file naming mechanism
let options = multer.diskStorage(
    {
        destination : 'uploads/' ,
        filename: function (req, file, cb) {
            let fileName = uuid.v1() + path.extname(file.originalname);
            cb(null, fileName);
        }
    });

app.get('/', (req, res) => {
    res.sendFile('login.html', {root: __dirname});
});

app.post('/api/login', (req, res) => authenticationController.login(req, res));

app.get('/api/surahs', (req, res) => halaqaController.getSurahs(req, res));
app.get('/api/students/:teacherId', (req, res) => halaqaController.getTeacherStudents(req, res));
app.get('/api/students/', (req, res) => halaqaController.getStudents(req, res));

app.get('/api/students/:studentId/tasks/:status', (req, res) => halaqaController.getStudentTasks(req, res));
app.get('/api/tasks/:taskId', (req, res) => halaqaController.getTask(req, res));

app.delete('/api/tasks/:taskId', (req, res) => halaqaController.deleteTask(req, res));
app.post('/api/tasks', (req, res) => halaqaController.addTask(req, res));
app.put('/api/tasks', (req, res) => halaqaController.updateTask(req, res));
app.patch('/api/tasks', (req, res) => halaqaController.completeTask(req, res));

app.post('/api/messages', multer({ storage: options}).single('msgImage'), (req, res) => {
    let message = req.body;
    message.imageUrl = req.file.filename;

    halaqaController.addMessage(message).then(() => {
        res.redirect('/sendMessage.html');
    });
    //console.log("Uploaded file details", req.file);

    //let imgUrl = `http://localhost:${port}/uploads/${uploadedFileName}`;
    //console.log('Url of uploaded image', imgUrl);

    //redirect to the uploaded image
    //res.redirect(imgUrl);
});

//Follow-up
app.get('/api/parents/:parentId/students',(req,res) => halaqaController.getParentStudents(req,res));
app.get('/api/announcements/',(req,res) => halaqaController.getMessages(req,res)) ;
app.get('/api/messages/:studentId',(req,res) => halaqaController.getMessages(req,res)) ;

//Add Student
app.get('/api/teachers',(req,res) => halaqaController.getTeachers(req,res));
app.get('/api/parents', (req, res) => halaqaController.getParents(req, res));

app.post('/api/students', (req, res) => halaqaController.addParent(req, res));
app.put('/api/students/:parentId', (req, res) => halaqaController.addStudent(req, res));


app.listen(port, function () {
    console.log("HalaqaMetrash App is running on http://localhost:" + port);
});