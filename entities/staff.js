/**
 * Created by Ahmed on 5/13/2016.
 */
    
let member = require("./member.js");

class Staff extends member {
    
    constructor(firstName,lastName,mobile,email,username,password,staffId,staff)
    {
        if(!staff) {
            super(firstName, lastName, mobile, email, username, password)
            this.staffId = staffId;
        }
        else
        {
            super(staff.firstName, staff.lastName, staff.mobile, staff.email, staff.username, staff.password)
            this.staffId = staff.staffId;
        }
    }
    
    getStaffId()
    {
        return this.staffId;
    }
    
}
module.exports = Staff;

// staff

