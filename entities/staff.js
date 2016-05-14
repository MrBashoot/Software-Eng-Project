/**
 * Created by Ahmed on 5/13/2016.
 */
class staff{
    
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