$(document).ready(onReady);

function onReady() {
	$("#add-to-do").on("click", postToDoTask);

	$("#to-do-table-body").on("click", ".delete", deleteRow);
	displayTasks();
}

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
		displayTasks();
		clearInputs();
	});
}

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
                    <button>Complete</button>
                </td>
                <td>
                    <button class="delete" data-id=${response[i].id}>Delete</button>
                </td>
        `);
		}
	});
}

function clearInputs() {
	$("#user-input-text").val("");
}

function deleteRow() {
	console.log("hello from delete");
	console.log($(this).data('id'));
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
