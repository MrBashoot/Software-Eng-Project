'use strict'
$(document).ready(function () {
    $('#submitBtn').on('click', login);
});

function login(event) {
    event.preventDefault();

    let credentials = {
        username: $('#username').val(),
        password: $('#password').val()
    };
    console.log("login.credentials", credentials);

    let url = "http://localhost:6070/api/login";

    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(handleErrors)
        .then(response => response.json())
        .then(user => {
            console.log("Login user:", user);
            //store the userInfo in the localStorage so it is available to other pages
            localStorage.user = JSON.stringify(user);
            localStorage.selectedStudentId = "";
            window.location = user.redirectTo;
        }).catch(err => {
        $('#errMsg').html(err).parent().show();
    });
}

function handleErrors(response) {
    if (!response.ok) {
        throw response.statusText;
    }
    return response;
}