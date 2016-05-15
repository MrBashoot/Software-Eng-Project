/**
 * Created by Ahmed on 5/13/2016.
 */
    "use strict";
let member = require("./member.js");

class Student extends member{

    constructor(id,firstName,lastName,mobile,email,username,password,memeberId ,student)
    {
        if(!student) {
            super(id,firstName, lastName, mobile, email, username, password)
            this.memberId = memeberId;
        }
        else {
            super(student.id,student.firstName, student.lastName, student.mobile, student.email, student.username, student.password,student);
            this.memberId = student.memberId
        }
    }

    getStudentId()
    {
        return this.memberId;
    }

    borrowItem(itemId){
        super.addItem(itemId)
    }

    returnItem(id)
    {
        super.removeItem(id);
    }
}

module.exports = Student;
