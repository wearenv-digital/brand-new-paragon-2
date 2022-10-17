const mysql = require('mysql');
require('dotenv').config();
var logger = require('../services/logger');

// if (!process.env.NODE_ENV === 'development') { };

const pool = mysql.createPool({
	host: 'sql',
	// host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'paragon',
	connectionLimit: 10
});

async function dbConnect() {
	pool.getConnection((err, connection) => {
		if (err) throw err;
		console.log(`database connected with ID ${connection.threadId}`);
		connection.release();
	});
}

// const getCircularReplacer = () => {
// 	const seen = new WeakSet();
// 	return (key, value) => {
// 		if (typeof value === 'object' && value !== null) {
// 			if (seen.has(value)) {
// 				return;
// 			}
// 			seen.add(value);
// 		}
// 		return value;
// 	};
// };

// console.log(JSON.stringify(pool, getCircularReplacer()));

module.exports = pool;
module.exports = dbConnect;
