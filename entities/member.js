/**
 * Created by Ahmed on 5/13/2016.
 */
class Member{
    
    constructor(firstName,lastName,mobile,email,username,password , member)
    {
        if(!member) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.mobile = mobile;
            this.email = email;
            this.username = username;
            this.password = password;
            this.noOfBorrowed = 0;
            this.balance = 500;
            this.borrowed = [];
            this.reserved = [];
        }
        else
        {
            this.firstName = member.firstName;
            this.lastName = member.lastName;
            this.mobile = member.mobile;
            this.email = member.email;
            this.username = member.username;
            this.password = member.password;
            this.noOfBorrowed = member.noOfBorrowed;
            this.balance = member.balance;
            this.borrowed = member.borrowed;
            this.reserved = member.reserved;
        }
    }
    deduct(fine)
    {
        let newBalance = this.balance - fine;
        this.setBalance(newBalance);
    }

    setBalance(balance)
    {
        this.balance = balance;
    }

    addItem(id)
    {
        this.borrowed.push(id);
    }
    removeItem(id)
    {
        var index = this.borrowed.indexOf(id);
        if (index > -1) {
            this.borrowed.splice(index, 1);
        }
    }
    reserveItem(id)
    {
        this.reserved.push(id);
    }
    
    getNumOfReserved()
    {
        return this.reserved.length;
    }
    isMaxBorrowd()
    {
        if(this.borrowed.length == 3)
            return true;
    }
    getLoanedItems(){
        return this.borrowed;
    }
    deductNoOfBorrowed()
    {
        this.noOfBorrowed -= 1;
    }
    addNumberOfborrowed(){
        this.noOfBorrowed += 1
    }
    deposit(amount)
    {
        this.balance += amount;
    }
}
// hamdi ur git hub is not working

module.exports = Member;
