const { query } = require('express');
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

let dbResults = {};
// const sqlQuery = `SELECT * FROM cam_info`;

dbResults.all = () => {
	return new Promise((resolve, reject) => {
		const sqlQuery = `SELECT * FROM cam_info`;

		pool.query(sqlQuery, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

// LETS TRY AND MAKE THIS REUSABLE
dbResults.id = (prodCode) => {
	return new Promise((resolve, reject) => {
		const sqlQuery = `SELECT * FROM cam_info WHERE product_code = ?`;

		pool.query(sqlQuery, [prodCode], (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(results);
		});
	});
};

module.exports = dbResults;

// module.exports = pool;
// module.exports = dbConnect;
