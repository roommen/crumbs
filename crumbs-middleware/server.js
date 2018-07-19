'use strict';

const Hapi = require('hapi');
const sqlite3 = require('sqlite3').verbose();
const node_dropbox = require('node-dropbox');

const server = Hapi.server({
    port: 1990,
    host: 'localhost'
});

//For server testing

const db = new sqlite3.Database('../../crumbs_master', err => {
	if (err) {
		return console.error('Connection Error::',err.message);
	}
	console.log('Connected to the Crumbs SQlite database.');
});

let user = {};

const closeDB = () => db.close();

server.route({
    method: 'GET',
    path: '/users',
    handler: (request, h) => {
		return new Promise(resolve => {
			let query = 'SELECT * FROM users';
			db.all(
			query, 
			[],
			(err, rows) => {
				if (err) {
					console.error('Query Error::',err.message);
				}
				const response = h.response(rows);
				response.type('application/json');
    			response.header('Access-Control-Allow-Origin', '*');
				resolve(response);			
			});	
		});
    }
});

server.route({
    method: 'GET',
    path: '/users/{param}',
    handler: (request, h) => {
		 return new Promise(resolve => {
			let query = 'SELECT * FROM users where user_id=? OR fname=?';
			db.get(
			   query, 
			   [request.params.param, request.params.param.split(' ')[0]],
			   (err, row) => {
				if (err) {
					console.error('Query Error::',err.message);
				}
				const response = h.response(row);
				response.type('application/json');
    			response.header('Access-Control-Allow-Origin', '*');
				resolve(response);			
			});	
		 });
    	}
	});
	
	server.route({
		method: 'GET',
		path: '/users/{param}/all',
		handler: (request, h) => {
			 return new Promise(resolve => {
				let query = `
				select * from 
				(select * from users u inner join subscriptions s on u.user_id = s.user_id ) t
				inner join groups g on t.group_id = g.group_id
				where user_id=? OR fname=?
				`;
				db.all(
				   query, 
				   [request.params.param, request.params.param.split(' ')[0]],
				   (err, row) => {
					if (err) {
						console.error('Query Error::',err.message);
					}
					const response = h.response(row);
					response.type('application/json');
					response.header('Access-Control-Allow-Origin', '*');
					resolve(response);			
				});	
			 });
			}
		});

		server.route({
			method: 'GET',
			path: '/groups/{param}/users',
			handler: (request, h) => {
				 return new Promise(resolve => {
					let query = `
					select user_id, uname, fname, lname, user_pic from 
					(select * from users u inner join subscriptions s on u.user_id = s.user_id ) t
					inner join groups g on t.group_id = g.group_id
					where t.group_id=?
					`;
					db.all(
					   query, 
					   [request.params.param],
					   (err, rows) => {
						if (err) {
							console.error('Query Error::',err.message);
						}
						const response = h.response(rows);
						response.type('application/json');
						response.header('Access-Control-Allow-Origin', '*');
						resolve(response);			
					});	
				 });
				}
			});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();