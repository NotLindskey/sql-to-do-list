const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
	let queryText = `SELECT * from "to-dos"`;
	pool.query(queryText).then((result) => {
		console.log("results from database!", result);
		res.send(result.rows);
	});
	// .catch((error) => {
	// 	console.log("no connection to database", error);
	// 	res.sendStatus(500);
	// });
});

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

router.delete("/:id", (req, res) => {
	let id = req.params.id;
	console.log("delete request", id);
	const queryText = `DELETE from "to-dos" WHERE  task = ${req.params.id};`;
	pool.query(queryText).then((result) => {
		console.log("deleted!");
		res.send(result.rows);
	});
});

module.exports = router;
