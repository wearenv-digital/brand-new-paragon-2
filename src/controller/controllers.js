const express = require('express');
const bodyParser = require('body-parser');
var util = require('util');
var { pool, pooledConnection } = require('./dbConnector');
const logger = require('../services/logger');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// async function getAll() {
// 	const result = await pooledConnection(async (connection) => {
// 		const rows = await new Promise((resolve, reject) => {
// 			connection.query('SELECT * FROM cam_info', (ex, rows) => {
// 				if (ex) {
// 					reject(ex);
// 				} else {
// 					resolve(rows);
// 				}
// 			});
// 		});
// 		return rows[0].value;
// 	});
// 	return result;
// }

async function getAll() {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	logger.customLogger.log('debug', 'await-connection', 'connection');
	var rows = await connection.query.bind(connection)('SELECT * FROM cam_features');
	var result;
	logger.customLogger.log('error', 'result:', result);
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

async function getFeatures(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	logger.customLogger.log('debug', 'await-connection', 'connection');
	var rows = await connection.query.bind(connection)(
		'SELECT * FROM cam_features WHERE product_code = ?',
		[req.params.product_code]
	);
	var result;
	logger.customLogger.log('error', 'result:', result);
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

async function getInfo(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM cam_info WHERE product_code = ?',
		[req.params.product_code]
	);
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
	});
	return result;
}

async function getCamSpecs(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM cam_specs WHERE product_code = ?',
		[req.params.product_code]
	);
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

async function getAudioVideo(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM audio_video WHERE product_code = ?',
		[req.params.product_code]
	);
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

async function getAutomation(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM automation WHERE product_code = ?',
		[req.params.product_code]
	);
	connection.release();
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

async function getElecPhys(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM electrical_physical WHERE product_code = ?',
		[req.params.product_code]
	);
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

async function getDesc(req) {
	var connection = await util.promisify(pool.getConnection.bind(pool))();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT description from cam_info WHERE product_code =?',
		[req.params.product_code]
	);
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
	});
	return result;
}

module.exports = {
	getFeatures,
	getInfo,
	getCamSpecs,
	getAudioVideo,
	getAutomation,
	getElecPhys,
	getDesc,
	getAll
};
