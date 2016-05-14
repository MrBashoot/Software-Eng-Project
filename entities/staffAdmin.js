/**
 * Created by Ahmed on 5/13/2016.
 */
    let staff = require ('./staff.js');
class staffAdmin extends staff{


    constructor (firstName,lastName,mobile,email,username,password,staffId){
        super(firstName,lastName,mobile,email,username,password,staffId);
        this.isCoordinator = 1;
    }

    editApplication (application){
    }

    getApplicationApproval (){

    }

    requestReport(){

    }

    resetReport

}
module .exports = new staffAdmin();