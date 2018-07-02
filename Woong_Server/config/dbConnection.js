const mysql=require('promise-mysql');

const dbConfig={
	host:'',
	port:,
	user:'',
	password:'',
	database:'',
	connectionLimit:20
};

module.exports=mysql.createPool(dbConfig);