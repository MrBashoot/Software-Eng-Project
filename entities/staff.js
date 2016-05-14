/**
 * Created by Ahmed on 5/13/2016.
 */
    
    let member = require("./member.js");

class staff extends member {
    
    constructor(firstName,lastName,mobile,email,username,password,staffId)
    {
        super(firstName,lastName,mobile,email,username,password)
        this.staffId = staffId;
    }
    
    getStaffId()
    {
        return this.staffId;
    }
    
}
module.exports = staff;

// staff

