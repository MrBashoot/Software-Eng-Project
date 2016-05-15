/**
 * Created by Ahmed on 5/13/2016.
 */
    "use strict";
    let staff = require ('./staff.js');
class staffAdmin extends staff{


    constructor (id,firstName,lastName,mobile,email,username,password,staffId,staffAdmin)
    {
        if(!staffAdmin) {
            super(id,firstName, lastName, mobile, email, username, password, staffId);
            this.isCoordinator = 1;
        }
        else {
            super(staffAdmin.id,staffAdmin.firstName, staffAdmin.lastName, staffAdmin.mobile, staffAdmin.email, staffAdmin.username, staffAdmin.password, staffAdmin.staffId);
            this.isCoordinator = staffAdmin.isCoordinator;
        }
    }

    editApplication (application){
    }

    getApplicationApproval (){

    }

    requestReport(){

    }

    resetReport(){

    }

}
module .exports =  staffAdmin;