$(document).ready(function () {

    getTeachers().then(teachers=> {
        fillTeachersDD(teachers);
    }).catch(err=>console.log(err));

    fetchParents().then(parents => fillParentDD(parents))
        .catch(err => console.log(err));

    $("#existingParentPanel").hide();
    
    $("#newParentRadio").on('click', showNewParentFields);
    $("#existingParentRadio").on('click', hideNewParentFields);
    $("#addStudent").on('click', addStudent);
});

function fillTeachersDD(teachers) {
    for (let teacher of teachers) {
        let teacherText = `${teacher.firstName} ${teacher.lastName} - ${teacher.halaqa}`;
        $("<option>", {
            value: teacher.staffNo,
            text: teacherText
        }).appendTo($("#teachersDD"))
    }
}

function showNewParentFields() {
    $('#parentForm').show();
    $("#existingParentPanel").hide();
}

function hideNewParentFields() {
    $('#parentForm').hide();
    $("#existingParentPanel").show();
}


function getTeachers() {
    let url = "/api/teachers";
    return fetch(url).then(response => response.json());
}

function fetchParents() {
    let url = "/api/parents";
    return fetch(url).then(response => response.json());
}

function fillParentDD(parents) {
    console.log(parents);
    for (let parent of parents) {
        $("<option>", {
            value: parent.qatariId,
            text: `${parent.firstName} ${parent.lastName}`
        }).appendTo($("#parentDD"));
    }
}

function addStudent() {
    let url = "/api/students/";
    let requestMethod = "post";

    let student = {
        "firstName": $('#childFirstName').val(),
        "lastName": $('#childLastName').val(),
        "dob": $('#birthDate').val(),
        "gender": $("#femaleRadio").is(":checked") ? "F" : "M",
        "schoolGrade": parseInt($('#schooleGrade').val()),
        "teacherId": parseInt($('#teachersDD').val())
    };

    let requestBody = student;

    console.log('$("#existingParentRadio").is(":checked")', $("#existingParentRadio").is(":checked"));
    if ($("#existingParentRadio").is(":checked")) {
        let parentId = $("#parentDD").val();
        url += parentId;
        requestMethod = "put";
    } else {
        requestBody = {
            "qatariId": parseInt($('#qatariId').val()),
            "firstName": $('#firstName').val(),
            "lastName": $('#lastName').val(),
            "mobile": $('#mobileNumber').val(),
            "email": $('#email').val(),
            "username": $('#username').val(),
            "password": $('#password').val(),
            "students": [student]
        };
    }

    console.log("addStudent.requestBody", requestBody);

    fetch(url, {
        method: requestMethod,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }).then(() => {
        window.location = '/followup.html';
    });
}