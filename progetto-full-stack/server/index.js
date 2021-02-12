const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

var get = require('./get');

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

app.get('/getTable',get.getTable);


app.get('/getSingolo', (req, res) => {

  let table = req.query.table;

  let codice = req.query.codice;

  pool.query("select * from "+table+" WHERE codice ='"+codice+"'", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});

app.post('/insert', (req, res) => {

  let table = req.query.table;

  let campi="";

  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)){
      campi+=key+",";
    }
  }

  campi=campi.slice(0, -1);

  let valori ="";

  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)){
      valori+="'"+req.body[key]+"',";
    }
  }

  valori=valori.slice(0, -1);
  //riconosce se c'è il codice o meno 
  
  if(req.body.hasOwnProperty("codice") ){
  pool.query("SELECT * FROM "+table+" where codice='"+req.body.codice+"'", (err, results) => {
    if (results.length==0) { 
      pool.query("INSERT INTO "+table+" ("+campi+") VALUES ("+valori+")", (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(results);
        }
      });
    } 
    else {
      res.send("attenzione non è possibile inserire due codici prodotto uguali");
    }
  });
}
//in caso non ci sia controlla l'id 
else{
  if(req.body.hasOwnProperty("id")){
    pool.query("SELECT * FROM "+table+" where id='"+req.body.id+"'", (err, results) => {
      if (results.length==0) { 
        pool.query("INSERT INTO "+table+" ("+campi+") VALUES ("+valori+")", (err, results) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send(results);
          }
        });
      } 
      else {
        res.send("attenzione non è possibile inserire due codici prodotto uguali");
      }
    });
  }
  else{
    //da aggiungere in caso non abbia controlli
  }
  
}
});

app.put('/change', (req, res) => {

  let table = req.query.table;

  let campi=[];

  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)){
      if(key!='DocLine') campi.push(key);
    }
  }

  let valori =[];

  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)){
      if(key!='DocLine')  valori.push(req.body[key]);
    }
  }

  let str = '';

  for (let i = 0; i < campi.length; i++) {
    if(i==(campi.length-1)){
      str = str + campi[i]+" ='"+valori[i]+"' ";
    }
    else str = str + campi[i]+" ='"+valori[i]+"', ";
  }

  if(req.body.hasOwnProperty("DocLine") ){
    pool.query("SELECT * FROM "+table+" where DocLine='"+req.body.DocLine+"'", (err, results) => {
      if (results.length==0) { 
        res.send("attenzione non è possibile cambiare il DocLine");
      } 
      else {
        pool.query("UPDATE "+table+" SET "+str+" WHERE DocLine = "+req.body.DocLine+"", (err, results) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send(results);
          }
        });
        
      }
    });
  }
  else{
  //riconosce se c'è il codice o meno 
  
  if(req.body.hasOwnProperty("codice") ){
  pool.query("SELECT * FROM "+table+" where codice='"+req.body.codice+"'", (err, results) => {
    if (results.length==0) { 
      res.send("attenzione non è possibile cambiare il codice");
    } 
    else {
      pool.query("UPDATE "+table+" SET "+str+" WHERE codice = '"+req.body.codice+"'", (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(results);
        }
      });
      
    }
  });
}
//in caso non ci sia controlla l'id 
else{
  if(req.body.hasOwnProperty("id")){
    pool.query("SELECT * FROM "+table+" where id='"+req.body.id+"'", (err, results) => {
      if (results.length==0) { 
        res.send("attenzione non è possibile inserire due codici prodotto uguali");
      } 
      else {
        pool.query("UPDATE "+table+" SET "+str+" WHERE id = "+req.body.id+"", (err, results) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send(results);
          }
        });
       
      }
    });
  }
  else{
    //da aggiungere in caso non abbia controlli
  }
  
}}

});

app.post('/delete', (req, res) => {

  let table = req.query.table;
if(req.body.hasOwnProperty("id")){
    pool.query("DELETE FROM "+table+" WHERE id="+req.body.id, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(results);
      }
    });
}else{
  pool.query("DELETE FROM "+table+" WHERE codice='"+req.body.codice+"'", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
}
});




app.get('/search', (req, res) => {

  let table = req.query.table;

  let string= req.query.string;
  //non solo fulltext ma anche su un campo aggiuntivo *da migliorare con un array di campi*
  let addCamp = req.query.addCamp;

  
  pool.query("SELECT * FROM "+table+" WHERE id LIKE '%'"+string+"'%' or descrizione LIKE '%'"+string+"'%'", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  });
});


// alter table per fare il full text - non credo si possa sull'id (PROVO CON IL LIKE)
// EASY QUERY CON IL LIKE E SOLO UN PARAMETRO--> SELECT * FROM categorie WHERE id LIKE '%1%' or descrizione LIKE '%1%'
