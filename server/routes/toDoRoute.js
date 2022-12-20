const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// get tasks from BD and append to DOM.
router.get("/", (req, res) => {
	let queryText = `SELECT * from "to-dos"`;
	pool
		.query(queryText)
		.then((result) => {
			console.log("results from database!", result);
			res.send(result.rows);
		})
		.catch((error) => {
			console.log("no connection to database", error);
			res.sendStatus(500);
		});
});

// post new task route.
router.post("/", (req, res) => {
	const newToDo = req.body;
	const queryText = `
    INSERT INTO "to-dos" ("task")
    VALUES ($1);
    `;
	pool.query(queryText, [newToDo.task]).then((result) => {
		console.log("post was made!", result);
		res.sendStatus(201);
	});
});

// delete route.
router.delete("/:id", (req, res) => {
	console.log("delete request", req.params.id);
	const queryText = `DELETE from "to-dos" WHERE id = ${req.params.id};`;
	pool
		.query(queryText)
		.then((result) => {
			console.log(result);
			res.sendStatus(202);
		})
		.catch((error) => {
			console.log("error", error);
			res.sendStatus(500);
		});
});

module.exports = router;
