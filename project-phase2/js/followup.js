let parentId;
let userType;
let studentId;

$(document).ready(function () {

    let user = JSON.parse(localStorage.user);
    if (user != 'undefined') {
        $('#username').html(user.name);
        parentId = user.id;
        userType = user.type;
    }

    if (userType === 'Parent') {
        $('.coordinatorMenu').hide();
    }

    getStudents().then(students => {
        fillStudentsDD(students); //studentId is assigned here
        getStudentTasks(); //need to have studentId first before this
        getStudentMessages(); //need to have studentId first before this
        getAnnouncements();
    }).catch(err => console.log(err));


    $("#studentsDD").on('change', onStudentChange);
});

function getStudents() {
    let url = '/api/students'
    if (userType === 'Parent') {
        url = `/api/parents/${parentId}/students`;
    }
    return fetch(url).then(response => response.json());
}

function getStudentTasks() {
    let url = `/api/students/${studentId}/tasks/all`;
    fetch(url).then(response => response.json()).then(tasks =>displayTasks(tasks)).catch(err => console.log(err));
}

function getStudentMessages() {
    let url = `/api/messages/${studentId}`;
    fetch(url).then(response => response.json()).then(messages => displayMessages(messages)).catch(err => console.log(err));
}

function getAnnouncements() {
    let url = '/api/announcements/';
    fetch(url).then(response => response.json()).then(announcements => displayAnnouncements(announcements)).catch(err => console.log(err));
}

function fillStudentsDD(students) {
    for (let student of students) {
        $("<option>", {
            value: student.studentId,
            text: student.firstName + " " + student.lastName
        }).appendTo($("#studentsDD"))
    }
    studentId = $("#studentsDD").val();//initially selected
}

function displayTasks(tasks) {
    let htmlTemplate = $('#task-template').html(),
        taskTemplate = Handlebars.compile(htmlTemplate)
    $('#tasksTableDiv').html(taskTemplate({tasks}));
}

function displayMessages(messages) {
    let htmlTemplate = $('#messages-template').html(),
        messageTemplate = Handlebars.compile(htmlTemplate)
    $('#messagesTableDiv').html(messageTemplate({messages}));
}

function displayAnnouncements(announcements) {
    let htmlTemplate = $('#announcements-template').html(),
        announcementTemplate = Handlebars.compile(htmlTemplate)
    $('#announcementsTableDiv').html(announcementTemplate({announcements}));
}

function onStudentChange() {
    studentId = $(this).val();
    getStudentTasks();
    getStudentMessages();
}


