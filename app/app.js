var express = require('express');
var bodyParser = require('body-parser');
// const Joi = require('joi');
var app = express();
// create application/json parser
var jsonParser = bodyParser.json();
var mysql      = require('mysql');

app.use(express.json());
// juste pour changer port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port '+[port]+' Jungmin!!!'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111'
  database : 'inscription'
});

connection.connect(function(error){
  if(!error){
    console.log('Essayer!');
  }else{
    console.log('connected!');
  }
});
app.get('/api/users',function(req, res) => {

  connection.query('SELECT * FROM user', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);

});


});

connection.end();
