const express = require('express');
const mysql   = require('mysql');

// create connection to mysql
const db = mysql.createConnection({
		host     : 'localhost',
  	user     : 'root',
  	password : '',
  	database : 'nodemysql'
});

//connect
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('Mysql Connected....');
});

const app = express();


//created db
app.get('/createdb',(req, res) => {
	let sql = 'CREATE DATABASE nodemysql';
	db.query(sql,(err,result)=> {
		if(err) throw err;
		console.log(result);
		res.send('Database created');

	});
});

//create table
app.get('/createpoststable',(req, res) => {
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err,result)=> {
		if(err) throw err;
		console.log(result);
		res.send('Post Table Created');
	});
});

//create table
app.get('/addpost1',(req, res) => {
	let post  = {title: 'Post One', body:'this is 1'};
	let sql   = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Post 1 Created');
	});
});

//get all posts
app.get('/getpost',(req, res) => {
	//let post  = {title: 'Post One', body:'this is 1'};
	let sql   = 'SELECT * FROM posts';
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		console.log(results);
		res.send('fetchh');
	});
});

//get single post
app.get('/getpost/:id',(req, res) => {
	//let post  = {title: 'Post One', body:'this is 1'};
	let sql   = `SELECT * FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('fetchh');
	});
});

//update postss
app.get('/updatepost/:id',(req, res) => {
	let newTitle  = "Updated title";
	//{title: 'Post One', body:'this is 1'};
	let sql   = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('updateddd');
	});
});


//get single post
app.get('/deletepost/:id',(req, res) => {
	//let post  = {title: 'Post One', body:'this is 1'};
	let sql   = `DELETE FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('DELETED');
	});
});

app.listen('2222',() => {
	console.log('Server Started on PORT 2222');
});