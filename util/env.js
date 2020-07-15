// Connect Mongodb
// const url = 'mongodb://127.0.0.1:27017';
// const MongoClient = require('mongodb').MongoClient;
// const option = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }

// const con = new MongoClient(url, option);

// Connect MySQL
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   database: "product",
//   host: "localhost",
//   user: "root",
//   password: "root"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// module.exports = con;

const env = {
  database: 'product',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'mysql'
};

module.exports = env;
