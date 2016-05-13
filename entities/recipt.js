/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";
class Recipt {

    var date,amount,details;

    constructor(amount,details){
        this.date = this.dateFormater (new Date());
        this.amount = amount;
        this.details = details;
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
module .exports = new Recipt();