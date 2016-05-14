/**
 * Created by Ahmed on 5/12/2016.
 */

"use strict";
class userRepository {

    constructor() {
        this.fs = require('fs');
    }

    getAllUsers(){ //gets all users in username/password format
        return new Promise((resolve,reject) =>{
            this.getMembers().then(Members =>{
                this.getAdmins().then(Admins =>{
                    let users = Admins.concat(Members);
                    resolve(users);
                });
            }).catch(err => {
                reject(err);
            });
        });
    }

    getUserByUsername(username){
        return new Promise ((resolve, reject) =>{
            this.getAllUsers().then(users =>{
                let user =users.filter(u =>  u.username === username);
                if (user.length>0){
                    resolve(user[0]);
                }
                else {
                    reject('username not found');
                }
            })
        });
    }

    getMembers(){
        return new Promise ((resolve,reject) =>{
            this.readJsonFile('./data/Member.json').then(Members => {
                resolve(Members);
            }).catch(err => {
                reject(err);
            });
        });
    }

    addMemberTest(members) {
        return new Promise((resolve, reject) => {
                return this.writeJsonFile('../data/Member.json', members)
            resolve(members);
        });
    }
    
    getAdmins(){
        return new Promise ((resolve,reject) =>{
            this.readJsonFile('./data/Admin.json').then(Admins => {
                resolve(Admins);
            }).catch(err => {
                reject(err);
            });
        });
    }

    readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, (error, data) => {
                if (error) {
                    reject("Reading file failed: " + error);
                }
                else {
                    let json = JSON.parse(data);
                    resolve(json);
                }
            });
        });
    }

    writeJsonFile(filePath, data) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filePath, JSON.stringify(data), error => {
                if (error) {
                    reject("Write to file failed: " + error);
                }
                else {
                    resolve();
                }
            });
        });
    }

}

module.exports = new userRepository();
