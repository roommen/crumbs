'use strict';

const Hapi = require('hapi');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
//const node_dropbox = require('node-dropbox');
const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');
//const dropboxV2 = require('dropbox-v2-api');
const splitter = require('split-file');
//const googleapis = require('googleapis');

const server = Hapi.server({
    port: 1990,
    host: 'localhost'
});

//For server testing
let user = {};

const db = new sqlite3.Database('../../crumbs_master', err => {
	if (err) {
		return console.error('Connection Error::',err.message);
	}
	console.log('Connected to the Crumbs SQlite database.');
});

//const closeDB = () => db.close();

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
				//db.close();
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
				//db.close();
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
					//db.close();
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
					select user_id, uname, fname, lname, user_pic,token from 
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
						//db.close();
						resolve(response);			
					});	
				 });
				}
			});

			server.route({
				method: 'GET',
				path: '/files/{fileID}/chunks',
				handler: (request, h) => {
					 return new Promise(resolve => {
						let query = `
						select chunk_name from chunks where file_id=?
						`;
						db.all(
						   query, 
						   [request.params.fileID],
						   (err, rows) => {
							if (err) {
								console.error('Query Error::',err.message);
							}
							const chunks = rows.map(row => row.chunk_name);
							splitter.mergeFiles(chunks,'C:\\temp\\result.pdf')
							.then(resp => {
								console.log(resp);
							})
							// const response = h.response(rows);
							// response.type('application/json');
							// response.header('Access-Control-Allow-Origin', '*');
							// db.close();
							// resolve(response);			
						});	
					 });
					}
				});

			server.route({
				method: 'GET',
				path: '/groups/{param}/files',
				handler: (request, h) => {
					 return new Promise(resolve => {
						let query = `
						select * from files where group_id=?
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
							//db.close();
							resolve(response);			
						});	
					 });
					}
				});

			server.route({
				method: 'POST',
				path: '/users/saveChunkInfo',
				handler: (req, h) => {
					 return new Promise(resolve => {
						console.log(req.payload);
						const fs = require('fs');
						const payload = JSON.parse(req.payload);
						const {file, fileURL, groupID, size, members} = payload;
						let insertFilesQuery = 
						'insert into files (group_id,file_name,file_type,file_size) values(?,?,?,?)';
						let params = [groupID,file,'gen',size];						
						db.run(insertFilesQuery, params, function(err) {
							if (err) {
							  return console.error(err.message);
							}
							const fileID = this.lastID;
							splitter.splitFile(fileURL, 3)
								.then((names) => {
									console.log('Split Success',names);
									names.forEach((chunkPath,idx) => {
										let token = members[idx].token;
										let chunkContent = fs.readFileSync("C:\\temp\\"+chunkPath.split('\\').pop());
										fetch('https://content.dropboxapi.com/2/files/upload',{
											method: "POST",
											headers: {
											"Content-Type": "application/octet-stream",
											"Authorization": "Bearer " + token,
											"Dropbox-API-Arg":  "{\"path\": \"/temp/"+chunkPath.split('\\').pop()+"\",\"mode\": {\".tag\":\"overwrite\"},\"autorename\": true,\"mute\": false}",
											},
											body:chunkContent,
											json: true
										})
										.then(resp => {
											return resp.json();
										})
										.then(uploadResp =>{
											console.log('Upload Success:::',uploadResp);
											let insertChunksQuery = 
											'insert into chunks (file_id, user_id, chunk_name) values(?,?,?)';
											let chunkParams = [fileID, members[idx].user_id,chunkPath.split('\\').pop()];
											db.run(insertChunksQuery, chunkParams, function(error) {
												if(error){
													return console.log('Chunk Data Persist Error:::', error);
												}
												const response = h.response({
													status:'Chunking Success',
													statusCode:'201'
												});
			 									response.type('application/json');
			 									response.header('Access-Control-Allow-Origin', '*');
												//db.close();
								 				resolve(response);
											});			
										})
										
									});
									//resolve(names);
								})
								.catch((err) => {
									console.log('Error Splitting: ', err);
									//resolve(err);
								});				   
					    	});
						});
					}
				});

			server.route({
				method: 'GET',
				path: '/groups/{groupID}/downloadFile/{fileID}',
				handler: (req, h) => {
					 return new Promise(resolve => {
						let fetchQuery = `select user_id,chunk_name,token from (select * from users u inner join chunks c on u.user_id = c.user_id ) t where t.file_id=?`;
						let params = [req.params.fileID];
						const request = require('request');
						db.all(fetchQuery, params, function(err,rows) {
							if (err) {
							  return console.error(err.message);
							}
							const mappedFiles = rows.map(row => (`C:\\temp\\${row.chunk_name}`)).sort();
							rows.forEach((row,idx) => {
								console.log('Downloading File:::',(idx+1));
								const stream = request('https://content.dropboxapi.com/2/files/download',{
									method: "POST",
								 	headers: {
								 	"Authorization": "Bearer " + row.token,
								 	"Dropbox-API-Arg":  "{\"path\": \"/temp/"+row.chunk_name+"\"}"
									}}
								).pipe(fs.createWriteStream(`C:\\temp\\${row.chunk_name}`));
								stream.on('finish',() => {
									splitter.mergeFiles(mappedFiles, `C:\\temp\\merged_${row.chunk_name.split('.s')[0]}`)
										.then(() => {
											console.log('Downloaded '+row.chunk_name.split('.s')[0])
										})
										.catch((err) => {
											console.log('Error: ', err);
									});
								});
							});
							const response = h.response({
								status:'download',
								code:'200'
							});
							 response.type('application/json');
							 response.header('Access-Control-Allow-Origin', '*');
							//db.close();
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