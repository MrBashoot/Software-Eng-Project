'use strict';
$(document).ready(function () {
    let user = JSON.parse(localStorage.user);
    if (user != 'undefined') {
        $('#userName').html(user.name);
    }
    getStudents().then(students => fillStudentsDD(students, $("#studentsDD")))
        .catch(err => console.log(err));
    $('#studentsDD').on('change', onStudentChange);
    $('#taskStatusDD').on('change', onStatusChange);
    $('#tasks-table').on('click','a.deleteButton', deleteTask);
    $('#tasks-table').on('click', 'a.updateButton', showUpdateForm);
    $('#tasks-table').on('click', 'a.completeButton', showCompleteForm);
    $('#addTaskBtn').on('click', showAddForm);
});

function validateForm() {
    console.log($('#masteryLevel').val());

    let dueDate = $('#dueDate').val();
    let completed = $('#completedDate').val();

    if ($('#comment').val().length == 0 ||
        $('#completedDate').val().length == 0 ||
        $('#masteryLevel').val().length == 0
    ) {
        alert("Some fields are missing");
        return -1;
    } else if (dueDate > completed) {
        alert("Date completed must be greater than or equal the due date");
        return -1;
    }
    else {
        return 0;
    }
}

function getStudents() {
    let user = JSON.parse(localStorage.user);
    let url = `/api/students/${user.id}`;
    return fetch(url).then(response => response.json());
}

function getSurahs() {
    let url = "/api/surahs";
    return fetch(url).then(res => res.json());
}

function fillStudentsDD(students, studentsDD) {
    for (let student of students) {
        $("<option>", {
            value: student.studentId,
            text: `${student.studentId} - ${student.firstName} ${student.lastName}`
        }).appendTo(studentsDD)
    }
}

function fetchStudentTasks() {
    let selectedStudentId = $("#studentsDD").val();
    let selectedStatus= $("#taskStatusDD").val();
    let url = `/api/students/${selectedStudentId}/tasks/${selectedStatus}`;
    console.log(selectedStatus);
    console.log(selectedStudentId);
    return fetch(url).then(response => response.json());
}

function fetchTaskById(taskId) {
    let url = `/api/tasks/${taskId}`;
    return fetch(url).then(response => response.json());
}

function onStatusChange() {
    fetchStudentTasks().then(tasks => displayTasks(tasks));
}

function onStudentChange() {
    let selectedStudentId = $(this).val();
    localStorage.setItem("selectedStudentId", selectedStudentId);
    fetchStudentTasks().then(tasks => displayTasks(tasks));
}

function displayTasks(tasks) {
    $('#tasks-table').empty();
    let htmlTemplate = $('#task-template').html(),
        taskTemplate = Handlebars.compile(htmlTemplate);
    $('#tasks-table').html(taskTemplate({tasks}));
}

function getTasks(studentId) {
    let url = `/api/student/${studentId}`;
    return fetch(url).then(response => response.json());
}

function deleteTask(event){
    event.preventDefault();

    if (!confirm('Confirm delete?')) {
        return;
    }

    let taskId = $(this).attr('data-taskId');
    console.log("deleteTask.data-taskId ", taskId);

    let url = `/api/tasks/${taskId}`;
    console.log("deleteTask.taskId", taskId);

    fetch(url, {
        method: 'delete'
    }).then(() => {
        //After successful delete remove the row from the HTML table
        $(this).closest('tr').remove();
    });
}

function showCompleteForm() {
    let chosentask = {};
    let taskId = $(this).attr('data-taskId');
    fetchTaskById(taskId).then(task => {
        chosentask = task;
        let htmlTemplate = $('#complete-template').html(),
            completeTemplate = Handlebars.compile(htmlTemplate);

        $('#completeTaskDiv').html(completeTemplate(task));
        $('#completedDate').val(getToday());
        showCompleteFormDialog();
    }).catch(err => console.log(err));
}

function showCompleteFormDialog() {
    let completeForm = $("#completeTaskDiv").dialog({
        height: 500,
        width: 760,
        title: 'Complete Task',
        modal: true,
        buttons: {
            "Submit": function () {
                if (validateForm() >= 0) {
                    completeTask();
                    completeForm.dialog("close");
                }
            },
            Cancel: function () {
                completeForm.dialog("close");
            }
        }
    });
}

function showAddForm() {
    let htmlTemplate = $('#update-template').html(),
        updateTemplate = Handlebars.compile(htmlTemplate);
    $('#updateTaskDiv').html(updateTemplate({}));

    getStudents().then(students => fillStudentsDD(students, $("#studentId")))
        .catch(err => console.log(err));

    let selectedStudentId = $("#studentsDD").val();
    $("#studentId").val(selectedStudentId);

    getSurahs().then(surahs => {
        initTaskForm(undefined, surahs);
    });

    showTaskUpdateFormDialog('Add Task');
}

function showUpdateForm() {
    let selectedTask;
    let taskId = $(this).attr('data-taskId');
    fetchTaskById(taskId).then(task => {
        selectedTask = task;
        return getSurahs();
    }).then(surahs => {
        let htmlTemplate = $('#update-template').html(),
            updateTemplate = Handlebars.compile(htmlTemplate);
        $('#updateTaskDiv').html(updateTemplate(selectedTask));

        initTaskForm(selectedTask, surahs);
        
        showTaskUpdateFormDialog('Update Task');
    });
}

function initTaskForm(selectedTask, surahs) {
    fillSurahsDD(surahs);
    
    if (selectedTask) {
        console.log(selectedTask);
        $('#surahsDD').val(selectedTask.surahId);
        $('#dueDate').val(getDate(selectedTask.dueDate));

        if (selectedTask.type === 'Memorization') {
            $("#memorization").prop("checked", true);
        }
        else {
            $("#revision").prop("checked", true);
        }

        let ayaCount = $("option:selected", "#surahsDD").attr('data-ayaCount');

        updateAyaSlider(ayaCount, selectedTask.fromAya, selectedTask.toAya);

        console.log("$('#fromAya').val()", $('#fromAya').val());
        console.log("$('#toAya').val()", $('#toAya').val());
    }
    
    if ($('#dueDate').val() === "") {
        //Set the due date to today + 1
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('dueDate').valueAsDate = tomorrow;
    }

    $('#dueDate').on("input", validateDueDate);

    //When the Sura changes change the max-value of the Aya sliders
    $('#surahsDD').on("change", function () {
        let ayaCount = $('option:selected', this).attr('data-ayaCount');
        console.log('ayaCount = ' + ayaCount);
        updateAyaSlider(ayaCount, 1, 1);
    });

    //Make sure toAya is never less than fromAya
    $("#fromAya").on('change', onFromAyaChange);

    //Make sure toAya is never less than fromAya
    $("#toAya").on('change', onToAyaChange);
}

//updating max of toAya and fromAya by getting the aya count of the selected surah
function updateAyaSlider(ayaCount, fromAya, toAya) {
    $('#fromAya').attr('max', ayaCount);
    $("#fromAya").val(fromAya);
    $("#selectedFromAya").html(fromAya);
    $("#fromMaxAya").html(ayaCount);

    $('#toAya').attr('max', ayaCount);
    $("#toAya").val(toAya);
    $("#selectedToAya").html(toAya);
    $("#toMaxAya").html(ayaCount);
}

function onFromAyaChange() {
    let fromAya = parseInt($("#fromAya").val());
    let toAya = parseInt($('#toAya').val());

    if (toAya < fromAya) {
        let ayaCount = parseInt($('#fromAya').attr('max'));
        let toAya = fromAya === ayaCount ? ayaCount : fromAya + 1;

        $("#toAya").val(toAya);
        $("#selectedToAya").html(toAya);
    }
}

function onToAyaChange() {
    let fromAya = parseInt($("#fromAya").val());
    let toAya = parseInt($('#toAya').val());
    if (toAya < fromAya) {
        $('#toAya').val(fromAya);
        $("#selectedToAya").html(fromAya);
    }
}

function fillSurahsDD(surahs) {
    for (let surah of surahs) {
        $("<option>", {
            value: surah.id,
            text: `${surah.id}. ${surah.name} - ${surah.englishName} (${surah.ayaCount} Aya)`,
        }).attr('data-ayaCount', surah.ayaCount)
            .attr('data-surahName', surah.englishName)
            .appendTo($("#surahsDD"));
    }
}

function showTaskUpdateFormDialog(title) {
    let updateForm = $("#updateTaskDiv").dialog({
        height: 410,
        width: 760,
        title: title,
        modal: true,
        buttons: {
            "Submit": function () {
                updateTask();
                updateForm.dialog("close");
            },
            Cancel: function () {
                updateForm.dialog("close");
            }
        }
    });
}

function completeTask() {
    let completedDate = $('#completedDate').val();
    completedDate = moment(completedDate).format("D/MM/YYYY");

    let completedTask = {
        taskId: parseInt($('#taskId').val()),
        completedDate: completedDate,
        masteryLevel: $('#masteryLevel').val(),
        comment: $('#comment').val()
    };
    console.log("completedTask", completedTask);
    let url = "/api/tasks";
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedTask)
    }).then(() => {
        fetchStudentTasks().then(tasks => displayTasks(tasks));
    }).catch(err => console.log(err));
}

function updateTask() {
    let httpVerb = 'post';
    let dueDate = $('#dueDate').val();
    dueDate = moment(dueDate).format("D/MM/YYYY");
    let surahName = $("option:selected", "#surahsDD").attr('data-surahName');

    let updatedTask = {
        studentId: parseInt($('#studentId').val()),
        surahId: parseInt($('#surahsDD').val()),
        surahName: surahName,
        fromAya: parseInt($('#fromAya').val()),
        toAya: parseInt($('#toAya').val()),
        type: $('input[name=taskType]:checked').val(),
        dueDate: dueDate,
    };
    
    let taskId = $('#taskId').val();
    if (taskId != '') {
        updatedTask.taskId = parseInt(taskId);
        httpVerb = 'put';
    }
    
    let url = "/api/tasks";
    fetch(url, {
        method: httpVerb,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    }).then(() => {
        $("#studentsDD").val(updatedTask.studentId);
        fetchStudentTasks().then(tasks => displayTasks(tasks));
    }).catch(err => console.log(err));
}

function validateDueDate(){
    let dueDate = new Date( this.value );
    dueDate.setHours(0, 0, 0, 0);
    console.log("dueDate: " + dueDate);

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log("today: " + today);

    if( dueDate < today ){
        this.setCustomValidity('Due date should be >= today');
    } else {
        this.setCustomValidity('');
    }
}

function getToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
}

function getDate(date) {
    let dateString = date;
    let dateParts = dateString.split("/"); //because new Date read it as mm-dd-yyyy
    let today = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
}