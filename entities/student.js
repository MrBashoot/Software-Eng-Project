/**
 * Created by Ahmed on 5/13/2016.
 */

class Student{

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
