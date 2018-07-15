'use strict';

const Hapi = require('hapi');
const sqlite3 = require('sqlite3').verbose();

const server = Hapi.server({
    port: 1990,
    host: 'localhost'
});

//For local DB Testing

/* const db = new sqlite3.Database('./chinook/chinook.db', err => {
	if (err) {
		return console.error('Connection Error::',err.message);
	  }
	  console.log('Connected to the Chinook SQlite database.');
}); 

let playlists = [];

const fetchPlaylists = db => {
	let query = 'SELECT PlaylistId as id, Name as name FROM playlists';
	db.all(
	   query, 
	   [],
	   (err, rows) => {
    	if (err) {
    		console.error('Query Error::',err.message);
    	}
    	playlists = rows;			
  	   });		
  };

server.route({
    method: 'GET',
    path: '/playlists',
    handler: (request, h) => {
		fetchPlaylists(db);
		//});
		//return null;
		return playlists;
		
    }
});
*/

//For server testing

const db = new sqlite3.Database('../../crumbs_master', err => {
			if (err) {
    			return console.error('Connection Error::',err.message);
  			}
  			console.log('Connected to the Crumbs SQlite database.');
});

//let users = [];
let user = {};

// const fetchUsers = (db) => {
// 	let query = 'SELECT * FROM users';
// 	return db.all(
// 	   query, 
// 	   [],
// 	   (err, rows) => {
//     	if (err) {
//     		console.error('Query Error::',err.message);
//     	}
//     	return rows;			
//   	});	
// }

// const fetchUser = (db,id) => {
// 	let query = 'SELECT * FROM users where user_id=?';
// 	return db.get(
// 	   query, 
// 	   [id],
// 	   (err, row) => {
//     	if (err) {
//     		console.error('Query Error::',err.message);
//     	}
//     	return row;			
//   	});	
// }

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
				resolve(rows);			
			});	
		});
    }
});

server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => {
		 return new Promise(resolve => {
			let query = 'SELECT * FROM users where user_id=?';
			db.get(
			   query, 
			   [request.params.id],
			   (err, row) => {
				if (err) {
					console.error('Query Error::',err.message);
				}
				resolve(row);			
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