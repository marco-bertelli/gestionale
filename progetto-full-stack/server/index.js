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

app.post('/insertProdotti', (req, res) => {

  pool.query("INSERT INTO prodotti (nome,descrizione,categoria,prezzo) VALUES ('"+req.body.nome+"','"+req.body.descrizione+"','"+req.body.categoria+"','"+req.body.prezzo+"')", (err, results) => {
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

  //clienti
  app.get('/getClienti', (req, res) => {

    pool.query(`select * from clienti`, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
    });
  });

  // app.put('/changeClienti', (req, res) => {
  
  //   pool.query("SELECT * FROM clienti where id='"+req.body.id+"'", (err, results) => {
  //     if (results.length==0) { 
  //       res.send("attenzione non è possibile cambiare l'id cliente");
  //     } else {
  //       pool.query("UPDATE clienti SET ragione_sociale = '"+req.body.ragione_sociale+"',indirizzo='"+req.body.indirizzo+"',citta='"+req.body.citta+"' WHERE id = '"+req.body.id+"'", (err, results) => {
  //         if (err) {
  //           return res.send(err);
  //         } else {
  //           return res.send(results);
  //         }
  //       });
  //     }
  //   });
  // }
  
  // app.post('/insertClienti', (req, res) => {

  //   pool.query("INSERT INTO clienti (id,ragione_sociale,indirizzo,citta) VALUES ('"+req.body.id+"','"+req.body.ragione_sociale+"','"+req.body.indirizzo+"','"+req.body.citta+"')", (err, results) => {
  //     if (err) {
  //       return res.send(err);
  //     } else {
  //       return res.send(results);
  //     }
  //   });
  // });
  
});
