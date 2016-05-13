/**
 * Created by Ahmed on 5/13/2016.
 */
$(document).ready(function(){
    let user = JSON.parse(localStorage.user);
    console.log(user.username + " is now logged in");
    $('#loggedInAs').html('Welcome ' + user.username);
    getUser(user.username).then(currentUser => {
        if (currentUser.hasOwnProperty('staffId'))
        {$('#pLoginType').html('Logged in as staff');}
        else{$('#pLoginType').html('Logged in as member');}
        fillPage(currentUser);
    });
});


function getUser(username){
    let url= 'http://localhost:9090/api/users/' + username;
    return fetch(url).then(response => response.json());
}

function getAllItems(){
    let url= 'http://localhost:9090/api/items';
    return fetch(url).then(response => response.json());
}

function getBorrowedItems(username){
    let url = 'http://localhost:9090/api/items/' + username;
    return fetch(url).then(response => response.json());
}

function fillPage(currentUser) {

    fillBorrowed(currentUser);
    fillItems();
}

function fillBorrowed(currentUser){
    let htmlTemplate = $('#borrowed-item-template').html(),
    itemsTemplate = Handlebars.compile(htmlTemplate);

    getBorrowedItems(currentUser.username).then(bItems => {
        console.log('burrowed items: ' + JSON.stringify(bItems));
        console.log('Items template: ' + itemsTemplate);
        $('#borrowed-Table-Body').html(itemsTemplate({bItems}));
    });
}

function fillItems (){

    let htmlTemplate = $('#item-template').html(),
        itemsTemplate = Handlebars.compile(htmlTemplate);

    getAllItems().then(items => {
        console.log('All items: ' + JSON.stringify(items));
        console.log('Items template: ' + itemsTemplate);
        $('#items-Table-Body').html(itemsTemplate({items}));
    });
}

