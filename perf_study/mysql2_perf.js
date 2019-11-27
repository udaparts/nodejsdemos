const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '10.16.50.19',
  user: 'root',
  password : 'Smash123',
  database: 'sakila'
});

setInterval(()=>{
	var stmt = 'SELECT * FROM actor WHERE actor_id between 11 and 40';
	var start = new Date();
	var count = 1800;
	for (var n = 0; n < count; ++n) {
		connection.query(stmt, (err, results, fields)=>{
		});
	}
	connection.query(stmt, (err, results, fields)=>{
		console.log('Time required: ' + (new Date() - start));
	});
}, 1000);
