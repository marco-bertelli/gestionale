const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');


const app = express();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

app.use(cors());
app.use(bodyParser.json());


exports.getTable = function(req, res, next){
    let table = req.query.table;
      
        pool.query("select * from "+table, (err, results) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send(results);
          }
        });
};

exports.getSingolo = function(req, res, next){
  let table = req.query.table;

  let codice = req.query.codice;

  pool.query("select * from "+table+" WHERE codice ='"+codice+"'", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
};
      
      
