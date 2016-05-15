/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";
let member = require("./member.js");

class Staff extends member {
    
    constructor(id,firstName,lastName,mobile,email,username,password,staffId,staff)
    {
        if(!staff) {
            super(id,firstName, lastName, mobile, email, username, password)
            this.staffId = staffId;
        }
        else
        {
            super(staff.id,staff.firstName, staff.lastName, staff.mobile, staff.email, staff.username, staff.password)
            this.staffId = staff.staffId;
        }
    }
    
    getStaffId()
    {
        return this.staffId;
    }

    borrowItem(itemId){
        super.addItem(itemId);
    }

    returnItem(id)
    {
        super.removeItem(id);
    }
    
}
module.exports = Staff;

// staff

