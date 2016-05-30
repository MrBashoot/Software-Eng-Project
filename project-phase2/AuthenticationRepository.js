'use strict'

class AuthenticationRepository {
    constructor() {
        this.utils = require('./Utils');
        this.staff = require('./models/teacherModel');
        this.parent = require('./model/parentModel');
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
        //return this.utils.readJsonFile('./data/teacher.json').then(teachers => {
        //    teachers = teachers.filter(s => s.username === credentials.username && s.password === credentials.password);
        //    if (teachers.length > 0) {
        //        let userInfo = {
        //            id: teachers[0].staffNo,
        //            username: teachers[0].username,
        //            name: `${teachers[0].firstName} ${teachers[0].lastName}`
        //        };
        //
        //        if (teachers[0].isCoordinator === 1) {
        //            userInfo.type = 'Coordinator';
        //            userInfo.redirectTo = '/followup.html';
        //        } else {
        //            userInfo.type = 'Teacher';
        //            userInfo.redirectTo = '/manageTasks.html';
        //        }
        //        return userInfo;
        //    }
        //    else {
        //        throw "Username and/or password invalid";
        //    }
        //});
    }

    verifyParentLogin(credentials) {
        return this.utils.readJsonFile('./data/student.json').then(parents => {
            parents = parents.filter(s => s.username === credentials.username && s.password === credentials.password);
            if (parents.length > 0) {
                let userInfo = {
                    id: parents[0].qatariId,
                    username: parents[0].username,
                    name: `${parents[0].firstName} ${parents[0].lastName}`,
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
}

module.exports = new AuthenticationRepository();