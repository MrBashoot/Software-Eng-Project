/**
 * Created by Ahmed on 5/13/2016.
 */

let checkList = new Array();
let returnCheckList = new Array();
let USER;
$(document).ready(function(){

    $("#btnBorrow").on('click', onBorrow);
    $("#btnReturn").on('click', onReturn);
    let user = JSON.parse(localStorage.user);
    console.log(user.username + " is now logged in");
    $('#loggedInAs').html('Welcome ' + user.username);
    getUser(user.username).then(currentUser => {
        USER = currentUser;
        if (currentUser.hasOwnProperty('staffId'))
        {$('#pLoginType').html('Logged in as staff');}
        else{$('#pLoginType').html('Logged in as member');}
        fillPage(currentUser);
    });
});

function onReturn(){
    let userId = USER.id;
    let RItem = {
        items: returnCheckList,
        userId: userId
    };

    let url = "http://192.168.100.9:9090/api/items/return";
    fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(RItem)
    }).then(() =>{
        console.log("here");
        fillPage(USER);
        returnCheckList = new Array();
    })
}

function onBorrow(){
    let userId = USER.id;
    console.log(checkList);
    console.log(JSON.stringify(USER));


    if(USER.noOfBorrowed >=5){
        alert("You have exceed your maximum number of borrowed items");
    }

    else {
        let BItem = {
            items: checkList,
            userId: userId
        };

        let url = "http://192.168.100.9:9090/api/items/borrow";
        fetch(url, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(BItem)
        }).then(() =>{
            fillPage(USER);
            checkList = new Array();
        })
    }


}

function onSelected(element){
    if(element.checked)
    {
        if(element.value!= "available")
        {
            element.disabled = true;
            element.checked = false;
        }
        else
        checkList.push(element.id);
    }
    else{
        var index = checkList.indexOf(element.id);
        if (index > -1) {
            checkList.splice(index, 1);
        }
    }

    console.log(checkList);
}


function onReturnSelected(element){
    if(element.checked)
    {
        returnCheckList.push(element.value);
    }
    else{
        var index = returnCheckList.indexOf(element.value);
        if (index > -1) {
            returnCheckList.splice(index, 1);
        }
    }

    console.log(returnCheckList);
}

function getUser(username){
    let url= 'http://192.168.100.9:9090/api/users/' + username;
    return fetch(url).then(response => response.json());
}

function getAllItems(){
    let url= 'http://192.168.100.9:9090/api/items';
    return fetch(url).then(response => response.json());
}

function getBorrowedItems(username){
    let url = 'http://192.168.100.9:9090/api/items/' + username;
    return fetch(url).then(response => response.json());
}

function fillPage(currentUser) {

    fillBorrowed(currentUser);
    fillItems();
    fillPersonalInfo(currentUser);
}

function fillBorrowed(currentUser){
    let htmlTemplate = $('#borrowed-item-template').html(),
    itemsTemplate = Handlebars.compile(htmlTemplate);

    getBorrowedItems(currentUser.username).then(items => {
        console.log('burrowed items: ' + JSON.stringify(items));
        console.log('Items template: ' + itemsTemplate);
        $('#borrowed-Table-Body').html(itemsTemplate({items}));
    });
}

function fillItems (){

    let htmlTemplate = $('#item-template').html(),
        itemsTemplate = Handlebars.compile(htmlTemplate);

    getAllItems().then(items => {
        console.log("items" + items)
        $('#items-Table-Body').html(itemsTemplate({items}));
    });
}

function fillPersonalInfo(currentUser){
    let htmlTemplate = $('#personal-info-template').html(),
        infoTemplate = Handlebars.compile(htmlTemplate);
    console.log("Personal Info: currentUser "+currentUser);
    console.log(JSON.stringify(currentUser));
    $('#personal-info-body').html(infoTemplate({currentUser}));

}

