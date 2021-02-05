const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.ANGULAR_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});


app.get('/getProdotti', (req, res) => {

  pool.query(`select * from prodotti`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.get('/getTable', (req, res) => {

  let table = req.query.table;

  pool.query("select * from "+table, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.post('/insertCat', (req, res) => {

  let table = req.query.table;

  pool.query("INSERT INTO "+table+" (id,descrizione) VALUES ('"+req.body.id+"','"+req.body.descrizione+"')", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.put('/changeProdotti', (req, res) => {
  
  pool.query("SELECT * FROM prodotti where codice='"+req.body.codice+"'", (err, results) => {
    if (results.length==0) { 
      res.send("attenzione non è possibile cambiare il codice prodotto");
    } else {
      pool.query("UPDATE prodotti SET nome = '"+req.body.nome+"', codice='"+req.body.codice+"',descrizione='"+req.body.descrizione+"',categoria='"+req.body.categoria+"',prezzo='"+req.body.prezzo+"' WHERE id = '"+req.body.id+"'", (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(results);
        }
      });
    }
  });

  
});

app.get('/search', (req, res) => {

  let table = req.query.table;

  let string= req.query.string;
  //non solo fulltext ma anche su un campo aggiuntivo *da migliorare con un array di campi*
  let addCamp = req.query.addCamp;

  
  pool.query("SELECT * FROM "+table+" WHERE MATCH(descrizione) AGAINST('"+string+"') || "+addCamp+" = "+string+";", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});


