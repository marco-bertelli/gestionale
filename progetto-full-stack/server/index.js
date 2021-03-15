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

app.get('/getTable', get.getTable);

app.get('/getUser', get.getUser);


app.get('/getSingolo',get.getSingolo);


app.post('/insert', (req, res) => {

    let table = req.query.table;

    let campi = "";

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            campi += key + ",";
        }
    }

    campi = campi.slice(0, -1);

    let valori = "";

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            valori += "'" + req.body[key] + "',";
        }
    }

    valori = valori.slice(0, -1);
    //riconosce se c'è il codice o meno 

    if (req.body.hasOwnProperty("codice")) {
        pool.query("SELECT * FROM " + table + " where codice='" + req.body.codice + "'", (err, results) => {
            if (results.length == 0) {
                pool.query("INSERT INTO " + table + " (" + campi + ") VALUES (" + valori + ")", (err, results) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.send(results);
                    }
                });
            } else {
                res.send("attenzione non è possibile inserire due codici prodotto uguali");
            }
        });
    }
    //in caso non ci sia controlla l'id 
    else {
        if (req.body.hasOwnProperty("id")) {
            pool.query("SELECT * FROM " + table + " where id='" + req.body.id + "'", (err, results) => {
                if (results.length == 0) {
                    pool.query("INSERT INTO " + table + " (" + campi + ") VALUES (" + valori + ")", (err, results) => {
                        if (err) {
                            return res.send(err);
                        } else {
                            return res.send(results);
                        }
                    });
                } else {
                    res.send("attenzione non è possibile inserire due codici prodotto uguali");
                }
            });
        } else {
            //da aggiungere in caso non abbia controlli
        }

    }
});

app.put('/change', (req, res) => {

    let table = req.query.table;

    let campi = [];

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            if (key != 'DocLine') campi.push(key);
        }
    }

    let valori = [];

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            if (key != 'DocLine') valori.push(req.body[key]);
        }
    }

    let str = '';

    for (let i = 0; i < campi.length; i++) {
        if (i == (campi.length - 1)) {
            str = str + campi[i] + " ='" + valori[i] + "' ";
        } else str = str + campi[i] + " ='" + valori[i] + "', ";
    }

    if (req.body.hasOwnProperty("DocLine")) {
        pool.query("SELECT * FROM " + table + " where DocLine='" + req.body.DocLine + "'", (err, results) => {
            if (results.length == 0) {
                res.send("attenzione non è possibile cambiare il DocLine");
            } else {
                pool.query("UPDATE " + table + " SET " + str + " WHERE DocLine = " + req.body.DocLine + "", (err, results) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.send(results);
                    }
                });

            }
        });
    } else {
        //riconosce se c'è il codice o meno 

        if (req.body.hasOwnProperty("codice")) {
            pool.query("SELECT * FROM " + table + " where codice='" + req.body.codice + "'", (err, results) => {
                if (results.length == 0) {
                    res.send("attenzione non è possibile cambiare il codice");
                } else {
                    pool.query("UPDATE " + table + " SET " + str + " WHERE codice = '" + req.body.codice + "'", (err, results) => {
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
        else {
            if (req.body.hasOwnProperty("id")) {
                pool.query("SELECT * FROM " + table + " where id='" + req.body.id + "'", (err, results) => {
                    if (results.length == 0) {
                        res.send("attenzione non è possibile inserire due codici prodotto uguali");
                    } else {
                        pool.query("UPDATE " + table + " SET " + str + " WHERE id = " + req.body.id + "", (err, results) => {
                            if (err) {
                                return res.send(err);
                            } else {
                                return res.send(results);
                            }
                        });

                    }
                });
            } else {
                //da aggiungere in caso non abbia controlli
            }

        }
    }

});

app.post('/delete', (req, res) => {

    let table = req.query.table;
    if (req.body.hasOwnProperty("id")) {
        pool.query("DELETE FROM " + table + " WHERE id=" + req.body.id, (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        });
    } else {
        pool.query("DELETE FROM " + table + " WHERE codice='" + req.body.codice + "'", (err, results) => {
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

    let string = req.query.string;
    //non solo fulltext ma anche su un campo aggiuntivo *da migliorare con un array di campi*
    let addCamp = req.query.addCamp;


    pool.query("SELECT * FROM " + table + " WHERE MATCH(descrizione) AGAINST('" + string + "') || " + addCamp + " = " + string + ";", (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});


// ---------------------------------------------------------------------------------- DASHBOARD QUERY ---------------------------------------------------------------------------------- //

app.get('/getCostumerRagioneSociale', (req, res) => {
    pool.query("SELECT ragione_sociale,codice FROM clienti", (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

//ritorna il numero di fatture per il cliente (accetta come paramentro il codice cliente)
app.get('/getNumDocCustomer', (req, res) => {
    let codCustomer = req.query.codCustomer;

    pool.query("SELECT COUNT(Customer) as numDoc FROM DocMaster WHERE Customer LIKE " + codCustomer, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

//ritorna il totalAmount delle fatture per il cliente (accetta come paramentro il codice cliente)
app.get('/getTotalAmountCustomer', (req, res) => {
    let codCustomer = req.query.codCustomer;

    pool.query("SELECT SUM(TaxableAmount) as totalAmountCustomer FROM DocDetail INNER JOIN DocMaster ON DocDetail.DocId = DocMaster.codice  WHERE Customer LIKE " + codCustomer, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

//ritorna totalAmount del mese e dell'anno passato come parametro della query
app.get('/getTotalAmountYearMonth', (req, res) => {
    let year = req.query.year;
    let month = req.query.month;

    pool.query("SELECT SUM(TaxableAmount)as Tot FROM DocDetail INNER JOIN DocMaster ON DocDetail.DocId = DocMaster.codice WHERE YEAR(DocDate)=" + year + " AND MONTH(DocDate)=" + month, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});


//ritorna il numeto totale delle fatture
app.get('/getTotNumDoc', (req, res) => {
    pool.query("SELECT COUNT(*) as numDocTot FROM `DocMaster` ", (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

//ritorna il numeto totale delle fatture del mese 
app.get('/getTotNumDocCurrentMonth', (req, res) => {
    let currentMonth = req.query.currentMonth;
    let currentYear = req.query.currentYear;

    pool.query("SELECT COUNT(*) as numDocTotCurrentMonth FROM `DocMaster` " +
        "WHERE MONTH(DocDate) = " + currentMonth + " AND YEAR(DocDate) = " + currentYear, (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        });
});


//ritorna il fatturato totale
app.get('/getTotAmount', (req, res) => {
    pool.query("SELECT SUM(TaxableAmount) totAmount FROM DocDetail INNER JOIN DocMaster ON DocDetail.DocId = DocMaster.codice", (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

//ritorna il fatturato del mese corrente
app.get('/getTotAmountCurrentMonth', (req, res) => {
    let currentMonth = req.query.currentMonth;
    let currentYear = req.query.currentYear;

    pool.query("SELECT SUM(TaxableAmount) as totAmountCurrentMonth FROM DocDetail INNER JOIN DocMaster ON DocDetail.DocId = DocMaster.codice " +
        "WHERE MONTH(DocDate) = " + currentMonth + " AND YEAR(DocDate) = " + currentYear, (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        });
});