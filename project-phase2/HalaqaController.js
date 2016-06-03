'use strict'

class HalaqaController {
    constructor() {
        this.halaqaRepository = require('./HalaqaRepository');
    }

    getStudents(req, res) {
        this.halaqaRepository.getStudents().then(students => {
            res.json(students);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
    
    getTeacherStudents(req, res) {
        let teacherId = parseInt(req.params.teacherId);
        this.halaqaRepository.getTeacherStudents(teacherId).then(students => {
            res.json(students);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getParentStudents (req,res) {
        let parentId = parseInt(req.params.parentId);
        this.halaqaRepository.getParentStudents(parentId).then(students => {
            res.json(students);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getSurahs(req, res) {
        this.halaqaRepository.getSurahs().then(surahs => {
            res.json(surahs);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getStudentTasks(req, res){
        let studentId = parseInt(req.params.studentId);
        let taskStatus = req.params.status;
        this.halaqaRepository.getStudentTasks(studentId, taskStatus).then(tasks => {
            res.json(tasks);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getTask(req, res) {
        let taskId = parseInt(req.params.taskId);
        this.halaqaRepository.getTask(taskId).then(task => {
            res.json(task);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    deleteTask(req,res){
        let taskId = req.params.taskId;
        this.halaqaRepository.deleteTask(parseInt(taskId)).then(() =>{
            res.status(200).send("Task is successfully deleted.")
        }).catch(err => res.status(500).send(err));
    }

    addTask(req, res) {
        let newTask = req.body;
        this.halaqaRepository.addTask(newTask).then(() => {
            res.status(200).send("Task added successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
    
    updateTask(req, res) {
        let updatedTask = req.body;
        this.halaqaRepository.updateTask(updatedTask).then(() => {
            res.status(200).send("Task updated successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    completeTask(req, res) {
        let completedTask = req.body;
        console.log("completeTask", completedTask);
        this.halaqaRepository.completeTask(completedTask).then(() => {
            res.status(200).send("Task updated successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    getMessages (req,res) {
        let studentId;
        //if studentId is not passed then annoucments will be returned
        if (req.params.studentId) {
            studentId = parseInt(req.params.studentId);
        }
        this.halaqaRepository.getMessages(studentId).then(messages => {
            res.json(messages);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
    
    addMessage(message) {
        //If message.studentId is empty then delete it to make an annoucement
        if (message.studentId) {
            message.studentId = parseInt(message.studentId);
        } else {
            delete message.studentId;
        }
        message.date = (new Date()).toLocaleString('en-GB');

        console.log("Message to add:", message);
        
        return this.halaqaRepository.addMessage(message);
    }

    addParent(req, res) {
        let parent = req.body;
        this.halaqaRepository.addParent(parent).then(()=> {
            res.status(201).send(`Student successfully added`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }

    addStudent(req, res) {
        let newStudent = req.body;
        let parentId = parseInt(req.params.parentId);
        this.halaqaRepository.addStudent(newStudent, parentId).then(()=> {
            res.status(201).send(`Student successfully added`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }

    getParents(req, res) {
        this.halaqaRepository.getParents().then(parents => {
            res.json(parents);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    getTeachers(req,res){
        this.halaqaRepository.getTeachers().then(teachers => {
            res.json(teachers);
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    initDb(){
        this.halaqaRepository.initDb();
    }
}

module.exports = new HalaqaController();