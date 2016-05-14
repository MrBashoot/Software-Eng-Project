/**
 * Created by Ahmed on 5/13/2016.
 */
let member = require("./member.js");

class Student extends member{

    constructor(firstName,lastName,mobile,email,username,password,memeberId)
    {
        super(firstName,lastName,mobile,email,username,password)
        this.memberId = memeberId;
    }

    getStudentId()
    {
        return this.memberId;
    }
}

module.exports = Student;
