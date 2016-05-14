/**
 * Created by Ahmed on 5/13/2016.
 */
let member = require("./member.js");

class Student extends member{

    constructor(firstName,lastName,mobile,email,username,password,memeberId ,student)
    {
        if(!student) {
            super(firstName, lastName, mobile, email, username, password)
            this.memberId = memeberId;
        }
        else {
            super(student.firstName, student.lastName, student.mobile, student.email, student.username, student.password)
            this.memberId = student.memberId
        }
    }

    getStudentId()
    {
        return this.memberId;
    }
}

module.exports = Student;
