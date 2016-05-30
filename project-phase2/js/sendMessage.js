'use strict';
let userType;

$(document).ready(function () {
    let user = JSON.parse(localStorage.user);
    if (user != 'undefined') {
        $('#userName').html(user.name);
        userType = user.type;
    }

    if (userType === 'Teacher') {
        $('.coordinatorMenu').hide();
        getStudents().then(students => fillStudentsDD(students))
            .catch(err => console.log(err));
    } else {
        $('.teacherMenu').hide();
        $('#formTitle').html("Make Announcement");
    }
});

function getStudents() {
    let user = JSON.parse(localStorage.user);
    let url = `/api/students/${user.id}`;
    return fetch(url).then(response => response.json());
}

function fillStudentsDD(students) {
    for (let student of students) {
        $("<option>", {
            value: student.studentId,
            text: `${student.studentId} - ${student.firstName} ${student.lastName}`
        }).appendTo($("#studentsDD"))
    }
}