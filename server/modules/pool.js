const pg = require("pg");

const Pool = pg.Pool;

const pool = new Pool({
	database: "to-do-list",
	host: "localhost",
	port: 5432,
	max: 10,
	idleTimeOutMilliSec: 30000,
});

pool.on("connect", () => {
	console.log("postgres is connected");
});

pool.on("error", (error) => {
    console.log('error with postgres pool', error);
});

module.exports = pool;