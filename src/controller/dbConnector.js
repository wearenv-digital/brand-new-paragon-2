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

pool.on('connection', function (connection) {
	console.log(`database connected with ID ${connection.threadId}`);

	connection.on('error', function (err) {
		logger.debugLogger.error('debug', 'caught at connection.on', err);
	});
	connection.on('close', function (err) {
		logger.debugLogger.error('error', 'sql connection closed', err);
		// logger.consoleLogger.error('debug', new Date(), 'MySQL close', err.code);
	});
});

// var connection = pool.getConnection((err) => {
// 	if (err) {
// 		logger.debugLogger.log('error', 'occured', err);
// 	} else {
// 		console.log(`connected to database with connection ID${connection.threadId}`);
// 		pool.query(sql, function (err, result) {
// 			if (err) {
// 				logger.debugLogger.log('error', 'db retrieval error', err);
// 			}
// 			console.log('SQL query ran fine');
// 		});
// 	}
// });

async function pooledConnection(actionSync) {
	const connection = await new Promise((resolve, reject) => {
		pool.getConnection((ex, connection) => {
			if (ex) {
				//---before rejecting, I would like to know the mysql.MysqlError
				logger.debugLogger.log('error', 'rejected because', ex);
				//
				reject(ex);
			} else {
				resolve(connection);
			}
		});
	});
	try {
		return await actionSync(connection);

		//
	} finally {
		connection.release();
	}
}

module.exports = {
	pool,
	pooledConnection
};
