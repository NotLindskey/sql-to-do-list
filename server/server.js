const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

const toDoRouter = require("./routes/toDoRoute");

app.use("/toDoList", toDoRouter);

const PORT = 5002;

app.listen(PORT, () => {
	console.log("> tuned into PORT: 5002 <");
});
