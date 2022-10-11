const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
	host: 'sql',
	user: 'root',
	password: 'password',
	database: 'paragon',
	connectionLimit: 10
});

pool.on('connection', function (connection) {
	console.log('database connected as ID ' + connection.threadId);

	connection.on('error', function (err) {
		console.error(new Date(), 'MySQL error', err.code);
	});
	connection.on('close', function (err) {
		console.error(new Date(), 'MySQL close', err.code);
	});
});

// pool.getConnection((err, connection) => {
// if (err) {
// 	if (err.code === 'PROTOCOL_CONNECTION_LOST') {
// 		console.error('Database connection was closed.');
// 	}
// 	if (err.code === 'ER_CON_COUNT_ERROR') {
// 		console.error('Database has too many connections.');
// 	}
// 	if (err.code === 'ECONNREFUSED') {
// 		console.error('Database connection was refused.');
// 	}
// }
// 	if (connection) connection.release();
// 	return;
// });

module.exports = pool;
