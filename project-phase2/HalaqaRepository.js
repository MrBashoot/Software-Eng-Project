'use strict'

class HalaqaRepository {
    constructor() {
        this.utils = require('./Utils');
        this.parent = require('./models/parentModel');
        this.teacher = require('./models/teacherModel');
        this.task = require('./models/taskModel');
        this.surah = require('./models/surahModel');
        this.message = require('./models/messageModel');
    }

    getStudents() {
        //return this.utils.readJsonFile('./data/student.json').then(parents => {
        //    let students = this.utils.flattenMultiArray(parents.map(p=> p.students));
        //    return students;
        //});

         this.parent.find({}).then(parents => {
            let students = this.utils.flattenMultiArray(parents.map(p=> p.students));
            return students;
        });
    }

    getTeacherStudents(teacherId) {
        //return this.utils.readJsonFile('./data/student.json').then(parents => {
        //    let students = this.utils.flattenMultiArray(parents.map(p=> p.students));
        //    return students.filter(s => s.teacherId === teacherId);
        //});
        return this.parent.find({}).then(parents => {
            let students = this.utils.flattenMultiArray(parents.map(p=> p.students));
            students=students.filter(s=>s.teacherId==teacherId);
            return students;
        });
    }

    getParentStudents(parentId) {
        //return this.utils.readJsonFile('./data/student.json').then(parents => {
        //    parents = parents.filter(p => p.qatariId === parentId);
        //    return parents[0].students;
        //});

        return this.parent.findOne({qatariId: parentId}).then(parent =>{
            return parent.students;
        });
    }

    getSurahs() {
        return this.surah.find({});
    }

    getStudentTasks(studentId, taskStatus) {
        if(taskStatus=='Pending')
            return this.task.find({studentId: studentId, completedDate: null});
        else if(taskStatus=='Completed')
            return this.task.find({studentId: studentId, completedDate: {$ne: null}});
        else  return this.task.find({studentId: studentId});

    }

    getTask(taskId) {
        return this.task.find({taskId: taskId});
    }

    deleteTask(taskId) {
        return this.utils.readJsonFile('./data/task.json').then(tasks => {
            let taskIndex = tasks.findIndex(t => t.taskId === taskId);
            tasks.splice(taskIndex, 1);
            return this.utils.writeToJsonFile("./data/task.json", tasks);
        });
    }

    addTask(newTask) {
        /*return this.utils.readJsonFile('./data/task.json').then(tasks => {
            let maxId = Math.max.apply(Math, tasks.map(r => r.taskId)) + 1;
            newTask.taskId = maxId;
            tasks.push(newTask);
            return this.utils.writeToJsonFile('./data/task.json', tasks);
        });*/
        return this.addTaskToDb(newTask);
    }

    updateTask(updatedTask) {
        return this.utils.readJsonFile('./data/task.json').then(tasks => {
            let taskIndex = tasks.findIndex(t => t.taskId === updatedTask.taskId);
            tasks[taskIndex] = updatedTask;
            return this.utils.writeToJsonFile('./data/task.json', tasks);
        });
    }

    completeTask(completedTask) {
        return this.utils.readJsonFile('./data/task.json').then(tasks => {
            let taskIndex = tasks.findIndex(t => t.taskId === completedTask.taskId);
            tasks[taskIndex].completedDate = completedTask.completedDate;
            tasks[taskIndex].masteryLevel = completedTask.masteryLevel;
            tasks[taskIndex].comment = completedTask.comment;
            return this.utils.writeToJsonFile('./data/task.json', tasks);
        });
    }

    getMessages(studentId) {
        return this.utils.readJsonFile('./data/message.json').then(messages => {
            return messages.filter(m=> m.studentId === studentId);
        });
    }

    addMessage(message) {
        /*return this.utils.readJsonFile('./data/message.json').then(messages => {
            let maxId = Math.max.apply(Math, messages.map(m => m.id)) + 1;
            message.id = maxId;
            messages.push(message);

            return this.utils.writeToJsonFile('./data/message.json', messages);
        });*/
        return this.addMessageToDb(message);
    }

    addParent(newParent) {
        //console.log("addParent.newParent", newParent);
        let newId;
        return this.generateStudentId().then(id => {
            newId = id;
        //    return this.utils.readJsonFile('./data/student.json');
        //}).then(parents => {
        //    if (newParent.students) {
        //        newParent.students[0].studentId = newId;
        //    }
        //    parents.push(newParent);
        //    return this.utils.writeToJsonFile('./data/student.json', parents);
            if (newParent.students){
                newParent.students[0].studentId = newId;
            }
            return this.parent.create({newParent});
        });
    }

    /*Register new children with existing parent*/
    addStudent(student, qatariId) {
        return this.generateStudentId().then(id => {
            student.studentId = id;
            return this.utils.readJsonFile('./data/student.json');
        }).then(parents => {
            let index = parents.findIndex(p => p.qatariId === qatariId);
            parents[index].students.push(student);
            return this.utils.writeToJsonFile('./data/student.json', parents);
        });
    }

    generateStudentId()
    {
        return this.getStudents().then(students => {
            let maxId = Math.max.apply(Math, students.map(s => s.studentId)) + 1;
            return maxId;
        });
    }

    getParents() {
        return this.utils.readJsonFile('./data/student.json').then(parents => {
            for(let parent of parents) {
                delete parent.students;
            };

            return parents;
        });
    }

    getTeachers() {
        return this.utils.readJsonFile('./data/teacher.json').then(teachers=> {
            return teachers.filter(t=>t.isCoordinator != 1);
        });
    }

    emptyDB() { //in case needed during testing
        this.surah.remove({}).exec();
        this.task.remove({}).exec();
        this.message.remove({}).exec();
    }

    initDb() {
        //Uncomment to empty the database
        this.emptyDB();
        //If the db is empty then init the db with data in json files
        this.getSurahs().then(surahs => {
            console.log('Surah Count: ' + surahs.length + ' comment out this.emptyDB() to stop re-initializing the database');
            if (surahs.length == 0) {
                this.writeSurahsToDB();
                this.writeTasksToDB();
                this.writeMessagesToDB();
            }
        }).catch(err => console.log(err));
    }

    getTasks(){
        return this.teacher.find({});
    }

    writeSurahsToDB() {
        let fs = require('fs');
        fs.readFile('./data/surah.json', (err, fileData) => {
            if (err) {
                console.log(err);
            }
            else {
                let surahs = JSON.parse(fileData);
                for (let surah of surahs) {
                    this.addSurahToDb(surah);
                }
            }
        });
    }


    addSurahToDb (newSurah){
        return this.surah.create(newSurah);
    }



    writeTasksToDB() {
        let fs = require('fs');
        fs.readFile('./data/task.json', (err, fileData) => {
            if (err) {
                console.log(err);
            }
            else {
                let tasks = JSON.parse(fileData);
                for (let task of tasks) {
                    this.addTaskToDb(task);
                }
            }
        });
    }

    addTaskToDb (newTask){
        return this.task.create(newTask);
    }


    writeMessagesToDB() {
        let fs = require('fs');
        fs.readFile('./data/message.json', (err, fileData) => {
            if (err) {
                console.log(err);
            }
            else {
                let messages = JSON.parse(fileData);
                for (let message of messages) {
                    this.addMessageToDb(message);
                }
            }
        });
    }

    addMessageToDb (newMessage){
        return this.message.create(newMessage);
    }


}

module.exports = new HalaqaRepository();