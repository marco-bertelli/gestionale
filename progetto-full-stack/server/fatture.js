const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors());
app.use(bodyParser.json());

exports.insertFatture = async function (req, res, next) {
  let header = req.body.header;
  let body = req.body.body;
  let coda = req.body.coda;

  pool.getConnection(function (err, connection) {
    connection.beginTransaction(function (err) {
      if (err) {
        //Transaction Error (Rollback and release connection)
        connection.rollback(function () {
          connection.release();
          res.send("begin fallita");
        });
      } else {
        //inserimento header
        connection.query(
          `INSERT INTO DocMaster(Customer,DocDate,codice,DocumentType,PaymentCondition,PriceList) VALUES('` +
            header.Customer +
            `','` +
            header.DocDate +
            `','` +
            header.codice +
            `','` +
            header.DocumentType +
            `','` +
            header.PaymentCondition +
            `','` +
            header.PriceList +
            `');`,
          function (err, results) {
            if (err) {
              //Query Error (Rollback and release connection)
              connection.rollback(function () {
                connection.release();
                res.send(err);
              });
            } else {
              let stmt = `INSERT INTO DocDetail(DocLine,codice,Item,LineType,LineDescription,UnitOfMeasure,Qty,UnitAmount,DiscountFormula,NetPrice,DiscountAmount,TaxableAmount,TaxCode,AmountOfTaxes,TotalAmount) VALUES ? `;

              let valori = [];

              for (let index = 0; index < body.length; index++) {
                valori[index] = Object.values(body[index]); // trasforma il body in un array
              }
              //inserimento body

              connection.query(stmt, [valori], function (err, results) {
                if (err) {
                  //Query Error (Rollback and release connection)
                  res.send(err);
                } else {
                  let codaq = `INSERT INTO DocSummary(Codice,GoodsAmount,ServiceAmount,RowsDiscount,SummaryDiscount,SummaryDiscountAmount,TotalDiscount,TotalTaxableAmount,TotalTaxesAmount,FinalAmount) VALUES( ?  );`;
                  let valoriC = Object.values(coda);

                  connection.query(codaq, [valoriC], function (err, results) {
                    if (err) {
                      //Query Error (Rollback and release connection)
                      res.send(err);
                    } else {
                      connection.commit(function (err) {
                        if (err) {
                          connection.rollback(function () {
                            connection.release();
                            res.send("commit fallito");
                          });
                        } else {
                          connection.release();
                          res.send("inserita!");
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  });
};
