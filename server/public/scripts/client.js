$(document).ready(onReady);

function onReady() {
	// A // post new item from user to database.
	$("#add-to-do").on("click", postToDoTask);

	// B // function that will display items from database.
	displayTasks();

	// D // function to delete a row from table.
	$("#to-do-table-body").on("click", ".delete", deleteRow);

	// F // function to complete a task
	$("#to-do-table-body").on("click", ".task-completed", completeTask);
}

// A //
// function that adds new item to database.
function postToDoTask() {
	console.log("clicking");
	let toDoTask = {
		task: $("#user-input-text").val(),
	};
	$.ajax({
		type: "POST",
		url: "/toDoList",
		data: toDoTask,
	}).then(function (response) {
		console.log(response);

		// B //
		// function that displays tasks added by user.
		displayTasks();

		// C //
		// clear user inputs.
		clearInputs();
	});
}

// B //
// function that grabs and appends items on to DOM.
function displayTasks() {
	$("#to-do-table-body").empty();
	console.log("working!");
	$.ajax({
		type: "GET",
		url: "/toDoList",
	}).then(function (response) {
		console.log("response working!", response);
		for (let i = 0; i < response.length; i++) {
			$("#to-do-table-body").prepend(`
            <tr></tr>
                <td>${response[i].task}</td>
                <td>
                    <button class='task-completed' data-id=${response[i].id}>Complete</button>
                </td>
                <td>
                    <button class="delete" data-id=${response[i].id}>Delete</button>
                </td>
        `);
		}
	});
}

// C //
// clear user inputs.
function clearInputs() {
	$("#user-input-text").val("");
}

// D //
// function to delete row by id from table.
function deleteRow() {
	console.log("hello from delete");
	console.log($(this).data("id"));
	const id = $(this).data("id");
	$.ajax({
		type: "DELETE",
		url: `/toDoList/${id}`,
	})
		.then(function () {
			displayTasks();
		})
		.catch(function (error) {
			console("deleting error occurred", error);
		});
}

function completeTask() {
	console.log("clicking!");
	console.log($(this).data("id"));
	const id = $(this).data("id");
	$.ajax({
		type: "GET",
		url: `/toDoList/${id}`,
	});
}

//  WORK ON COMPETE TASK FUNCTION. GET ?? //
