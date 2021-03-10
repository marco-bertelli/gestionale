-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: sampledb
-- ------------------------------------------------------
-- Server version	5.7.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DocDetail`
--

DROP TABLE IF EXISTS `DocDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocDetail` (
  `DocLine` int(11) NOT NULL,
  `DocId` varchar(10) NOT NULL,
  `Item` varchar(12) NOT NULL,
  `LineType` char(1) NOT NULL,
  `LineDescription` varchar(128) NOT NULL,
  `UnitOfMeasure` varchar(6) NOT NULL,
  `Qty` float NOT NULL,
  `UnitAmount` varchar(6) NOT NULL,
  `DiscountFormula` varchar(8) NOT NULL,
  `NetPrice` float NOT NULL,
  `DiscountAmount` float NOT NULL,
  `TaxableAmount` float NOT NULL,
  `TaxCode` int(11) NOT NULL,
  `AmountOfTaxes` float NOT NULL,
  `TotalAmount` float NOT NULL,
  PRIMARY KEY (`DocId`,`DocLine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocDetail`
--

LOCK TABLES `DocDetail` WRITE;
/*!40000 ALTER TABLE `DocDetail` DISABLE KEYS */;
INSERT INTO `DocDetail` VALUES  (1,'21/000001','TESTITEM01','M','Descrizione riga 1 documento 1' ,'NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000001','TESTITEM02','M','Descrizione riga 2 documento 1' ,'KG',240,'10.00','',160,0,160,22,35.2,195.2),
                                (1,'21/000002','TESTITEM01','M','Descrizione riga 1 documento 2' ,'NR',10 ,'15.00','10+5',160,23.2,136.8,22,30.096,166.896),
                                (2,'21/000002','TESTITEM02','M','Descrizione riga 2 documento 2' ,'KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000003','TESTITEM01','M','Descrizione riga 1 documento 3' ,'NR',10 ,'15.00','10+5',180,26.1,153.9,22,33.858,187.758),
                                (2,'21/000003','TESTITEM02','M','Descrizione riga 2 documento 3' ,'KG',240,'10.00','',160,0,160,22,35.2,195.2),
                                (1,'21/000004','TESTITEM01','M','Descrizione riga 1 documento 4' ,'NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000004','TESTITEM02','M','Descrizione riga 2 documento 4' ,'KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (3,'21/000004','TESTITEM01','M','Descrizione riga 3 documento 4' ,'NR',10 ,'15.00','10+5',180,26.1,153.9,22,33.858,187.758),
                                (1,'21/000005','TESTITEM01','M','Descrizione riga 1 documento 5' ,'NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000005','TESTITEM02','M','Descrizione riga 2 documento 5' ,'KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000006','TESTITEM01','M','Descrizione riga 1 documento 6' ,'NR',10 ,'15.00','10+5',160,23.2,136.8,22,30.096,166.896),
                                (2,'21/000006','TESTITEM02','M','Descrizione riga 2 documento 6' ,'KG',240,'10.00','',160,0,160,22,35.2,195.2),
                                (1,'21/000007','TESTITEM01','M','Descrizione riga 1 documento 7' ,'NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000007','TESTITEM02','M','Descrizione riga 2 documento 7' ,'KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000008','TESTITEM01','M','Descrizione riga 1 documento 8' ,'NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000008','TESTITEM02','M','Descrizione riga 2 documento 8' ,'KG',240,'10.00','',160,0,160,22,35.2,195.2),
                                (1,'21/000009','TESTITEM01','M','Descrizione riga 1 documento 9' ,'NR',10 ,'15.00','10+5',160,23.2,136.8,22,30.096,166.896),
                                (2,'21/000009','TESTITEM02','M','Descrizione riga 2 documento 9' ,'KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000010','TESTITEM01','M','Descrizione riga 1 documento 10','NR',10 ,'15.00','10+5',160,23.2,136.8,22,30.096,166.896),
                                (2,'21/000010','TESTITEM02','M','Descrizione riga 2 documento 10','KG',240,'10.00','',160,0,160,22,35.2,195.2),
                                (1,'21/000011','TESTITEM01','M','Descrizione riga 1 documento 11','NR',10 ,'15.00','10+5',180,26.1,153.9,22,33.858,187.758),
                                (2,'21/000011','TESTITEM02','M','Descrizione riga 2 documento 11','KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000012','TESTITEM01','M','Descrizione riga 1 documento 12','NR',10 ,'15.00','10+5',180,26.1,153.9,22,33.858,187.758),
                                (2,'21/000012','TESTITEM02','M','Descrizione riga 2 documento 12','KG',240,'10.00','',160,0,160,22,35.2,195.2),
                                (1,'21/000013','TESTITEM01','M','Descrizione riga 1 documento 13','NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000013','TESTITEM02','M','Descrizione riga 2 documento 13','KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000014','TESTITEM01','M','Descrizione riga 1 documento 14','NR',10 ,'15.00','10+5',160,23.2,136.8,22,30.096,166.896),
                                (2,'21/000014','TESTITEM02','M','Descrizione riga 2 documento 14','KG',240,'10.00','',140,0,140,22,30.08,170.08),
                                (1,'21/000015','TESTITEM01','M','Descrizione riga 1 documento 15','NR',10 ,'15.00','10+5',150,21.75,128.25,22,28.215,156.465),
                                (2,'21/000015','TESTITEM02','M','Descrizione riga 2 documento 15','KG',240,'10.00','',160,0,160,22,35.2,195.2);
                                
/*!40000 ALTER TABLE `DocDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocMaster`
--

DROP TABLE IF EXISTS `DocMaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocMaster` (
  `Customer` varchar(6) NOT NULL,
  `DocDate` date NOT NULL,
  `codice` varchar(10) NOT NULL,
  `DocumentType` char(3) NOT NULL,
  `PaymentCondition` varchar(6) NOT NULL,
  `PriceList` varchar(6) NOT NULL,
  PRIMARY KEY (`codice`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocMaster`
--

LOCK TABLES `DocMaster` WRITE;
/*!40000 ALTER TABLE `DocMaster` DISABLE KEYS */;
INSERT INTO `DocMaster` VALUES  ('000001','2021-01-22','21/000001','DDT','BON' ,'STAND'),
                                ('000001','2021-02-18','21/000002','SIS','CONT','MENO10'),
                                ('000001','2021-03-20','21/000003','DDT','RIBA','MENO20'),
                                ('000001','2021-04-21','21/000004','FAT','ASS' ,'STAND'),
                                ('000002','2021-05-12','21/000005','DDT','RIBA','STAND'),
                                ('000002','2021-06-14','21/000006','FAT','ASS' ,'STAND'),
                                ('000002','2021-07-16','21/000007','DDT','CONT','STAND'),
                                ('000003','2021-08-18','21/000008','DDT','CONT','STAND'),
                                ('000003','2021-09-22','21/000009','FAT','RIBA','STAND'),
                                ('000004','2020-10-24','21/000010','DDT','CONT','STAND'),
                                ('000004','2020-11-17','21/000011','FAT','RIBA','STAND'),
                                ('000004','2020-12-15','21/000012','DDT','ASS' ,'STAND'),
                                ('000004','2020-01-12','21/000013','DDT','CONT','STAND'),
                                ('000005','2020-02-23','21/000014','FAT','RIBA','STAND'),
                                ('000005','2020-03-11','21/000015','DDT','CONT','STAND'),
                                ('000005','2020-04-07','21/000016','FAT','ASS' ,'STAND'),
                                ('000005','2020-05-05','21/000017','DDT','CONT','STAND');
/*!40000 ALTER TABLE `DocMaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocSummary`
--

DROP TABLE IF EXISTS `DocSummary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DocSummary` (
  `DocId` varchar(10) NOT NULL,
  `GoodsAmount` float NOT NULL,
  `ServiceAmount` float NOT NULL,
  `RowsDiscount` float NOT NULL,
  `SummaryDiscount` float NOT NULL,
  `SummaryDiscountAmount` float NOT NULL,
  `TotalDiscount` float NOT NULL,
  `TotalTaxableAmount` float NOT NULL,
  `TotalTaxesAmount` float NOT NULL,
  `FinalAmount` float NOT NULL,
  PRIMARY KEY (`DocId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocSummary`
--

LOCK TABLES `DocSummary` WRITE;
/*!40000 ALTER TABLE `DocSummary` DISABLE KEYS */;
INSERT INTO `DocSummary` VALUES ('21/000001',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000002',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000003',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000004',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000005',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000006',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000007',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000008',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000009',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000010',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000011',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000012',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000013',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000014',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000015',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000016',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47),
                                ('21/000017',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47);
/*!40000 ALTER TABLE `DocSummary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `test` (`descrizione`),
  FULLTEXT KEY `descrizione` (`descrizione`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (1,'cat1'),(3,'cat3'),(2,'prova'),(4,'prova con altra parola');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citta`
--

DROP TABLE IF EXISTS `citta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citta` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `descrizione` (`descrizione`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citta`
--

LOCK TABLES `citta` WRITE;
/*!40000 ALTER TABLE `citta` DISABLE KEYS */;
INSERT INTO `citta` VALUES  (1,'Bergamo'),
                            (2,'Brescia'),
                            (3,'Padova'),
                            (4,'Verona'),
                            (5,'Milano');
/*!40000 ALTER TABLE `citta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordini`
--

DROP TABLE IF EXISTS `ordini`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordini` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ordine` varchar(32) NOT NULL,
  `data` date NOT NULL,
  `cliente` int(11) NOT NULL,
  `totale` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordini`
--

LOCK TABLES `ordini` WRITE;
/*!40000 ALTER TABLE `ordini` DISABLE KEYS */;
INSERT INTO `ordini` VALUES (1,'AB124','2020-02-04',3,167.5);
/*!40000 ALTER TABLE `ordini` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodotti`
--

DROP TABLE IF EXISTS `prodotti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodotti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codice` varchar(32) NOT NULL,
  `nome` varchar(32) NOT NULL,
  `descrizione` varchar(128) NOT NULL,
  `categoria` varchar(32) NOT NULL,
  `prezzo` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodotti`
--

LOCK TABLES `prodotti` WRITE;
/*!40000 ALTER TABLE `prodotti` DISABLE KEYS */;
INSERT INTO `prodotti` VALUES (1,'EA001','prodotto1','descrizione 1','1',22.7),
                              (2,'EA002','prodotto2','descrizione 2','1',20),
                              (3,'EA003','prodotto3','descrizione 3','2',24),
                              (4,'EA004','prodotto4','descrizione 4','1',26),
                              (5,'EA005','prodotto5','descrizione 5','1',1),
                              (6,'EA006','prodotto6','descrizione 6','1',140.5);
/*!40000 ALTER TABLE `prodotti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-03 15:55:00


--
-- Table structure for table `clienti`
--

DROP TABLE IF EXISTS `clienti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clienti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codice` varchar(32) NOT NULL,
  `ragione_sociale` varchar(50) NOT NULL,
  `indirizzo` varchar(50) NOT NULL,
  `citta` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clienti`
--

LOCK TABLES `clienti` WRITE;
/*!40000 ALTER TABLE `clienti` DISABLE KEYS */;
INSERT INTO `clienti` VALUES  (1,'000001','azienda1','Vilminore di Scalve','BG'),
                              (2,'000002','azienda2','Darfo Boario'       ,'BS'),
                              (3,'000003','azienda3','Clusone'            ,'BG'),
                              (4,'000004','azienda4','Sondrio'            ,'SO'),
                              (5,'000005','azienda5','Palermo'            ,'PA'),
                              (6,'000006','azienda6','Milano'             ,'MI'),
                              (7,'000007','azienda7','Padova'             ,'PD');
/*!40000 ALTER TABLE `clienti` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `citta`
--

DROP TABLE IF EXISTS `citta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citta` (
  `id` int(11) NOT NULL,
  `descrizione` varchar(64) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citta`
--

LOCK TABLES `citta` WRITE;
/*!40000 ALTER TABLE `citta` DISABLE KEYS */;
INSERT INTO `citta` VALUES (1,'Bergamo','BG'),(2,'Brescia','BS'),(3,'Sondrio','SO');
/*!40000 ALTER TABLE `citta` ENABLE KEYS */;
UNLOCK TABLES;

-- creare dati per provare i grafici (inserire dati nel db e fare query)