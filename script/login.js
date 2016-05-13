/**
 * Created by Ahmed on 5/12/2016.
 */

"use strict";

$(document).ready(function(){
    $('#button').on('click' , login)
    $('#errorMsg').hide();
});
function login(event){
    event.preventDefault();
    let loginID = $('#loginID').val();
    let loginPassword = $('#loginPassword').val();

    let user = {
        username: loginID,
        password: loginPassword
    };

    let url = 'http://localhost:9090/api/users/login';

    console.log('user entered: ' + loginID + " " + loginPassword );
    console.log('user created ' + user.username + ' ' + user.password);

    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json()).then(user => {
        if(user.isIn) {
            console.log(user.goTo + '?username=' + user.username);
            localStorage.user = JSON.stringify(user);
            window.location = user.goTo + '?username=' + user.username;
        }
        else{
            $('#errorMsg').html(user.allert);
            $('#errorMsg').show();
        }
    });
}