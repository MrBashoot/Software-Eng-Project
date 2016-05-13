/**
 * Created by Ahmed on 5/13/2016.
 */
    let staff = require ('./staff.js');
class staffAdmin extends staff{

    var isCoordinator;

    constuctor (){
        //add supper class constructor call
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