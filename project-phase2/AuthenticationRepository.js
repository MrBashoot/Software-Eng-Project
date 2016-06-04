'use strict'

class AuthenticationRepository {
    constructor() {
        this.utils = require('./Utils');
        this.staff = require('./models/teacherModel');
        this.parent = require('./models/parentModel');
    }

    login(credentials) {
        return this.verifyStaffLogin(credentials).then(userInfo => {
            return userInfo;
        }).catch(err => {
            return this.verifyParentLogin(credentials);
        });
    }

    verifyStaffLogin(credentials) {
        return this.staff.findOne({username: credentials.username, password: credentials.password}).exec().then(staff => {
            if(staff){
                let userInfo = {
                                id: staff.staffNo,
                                username: staff.username,
                                name: `${staff.firstName} ${staff.lastName}`
                            };

                            if (staff.isCoordinator === 1) {
                                userInfo.type = 'Coordinator';
                                userInfo.redirectTo = '/followup.html';
                            } else {
                                userInfo.type = 'Teacher';
                                userInfo.redirectTo = '/manageTasks.html';
                            }
                            return userInfo;
            }
                else {
                    throw "Username and/or password invalid";
                }
        });
    }

    verifyParentLogin(credentials) {
        return this.parent.findOne({username: credentials.username, password: credentials.password}).then(parent => {
            if (parent) {
                let userInfo = {
                    id: parent.qatariId,
                    username: parent.username,
                    name: `${parent.firstName} ${parent.lastName}`,
                    type: 'Parent',
                    redirectTo: '/followup.html'
                };
                return userInfo;
            }
            else {
                throw "Username and/or password invalid";
            }
        });
    }

    getParents() {
        return this.parent.find({});
    }

    emptyDB() { //in case needed during testing
        this.staff.remove({}).exec();
        this.parent.remove({}).exec();
    }


    initDb() {
        //Uncomment to empty the database
        this.emptyDB();
        //If the db is empty then init the db with data in json files
        this.getParents().then(parents => {
            console.log('Parents Count: ' + parents.length + ' comment out this.emptyDB() to stop re-initializing the database');
            if (parents.length == 0) {
                this.writeStaffToDB();
                this.writeParentsToDB();
            }
        }).catch(err => console.log(err));
    }


    addParent(newParent) {
        return this.parent.create(newParent);
    }

    addStaff(newStaff) {
        return this.staff.create(newStaff);
    }

    writeParentsToDB() {
        let fs = require('fs');
        fs.readFile('./data/student.json', (err, fileData) => {
            if (err) {
                console.log(err);
            }
            else {
                let parents = JSON.parse(fileData);

                for (let parent of parents) {
                    this.addParent(parent);
                }
            }
        });
    }


    writeStaffToDB() {
        let fs = require('fs');
        fs.readFile('./data/teacher.json', (err, fileData) => {
            if (err) {
                console.log(err);
            }
            else {
                let staffs = JSON.parse(fileData);
                for (let staff of staffs) {
                    this.addStaff(staff);
                }
            }
        });
    }

}



module.exports = new AuthenticationRepository();