/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";
class Recipt {
    
    constructor(amount,details,recipt){
        if(!recipt) {
            this.date = this.dateFormater(new Date());
            this.amount = amount;
            this.details = details;
        }
        else {
            this.date = recipt.date;
            this.amount = recipt.amount;
            this.details = recipt.details;
        }
    }

    dateFormater(date) {
        var d = new Date(date || Date.now()),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    print (){
        return this.toString();
    }
}
module .exports = Recipt;
