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
  `codice` varchar(16) NOT NULL,
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
  PRIMARY KEY (`DocLine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocDetail`
--

LOCK TABLES `DocDetail` WRITE;
/*!40000 ALTER TABLE `DocDetail` DISABLE KEYS */;
INSERT INTO `DocDetail` VALUES (1,'000001','scaldacazziz','M','cazzoni','MM',10,'300','10',3000,300,2700,10,270,2970),(2,'000001','cazzo','M','cazzini','MM',12,'3000','si',123,2,123,12,123,122333);
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
INSERT INTO `DocMaster` VALUES ('000002','2021-01-18','000001','SES','CONT','MENO10'),('000002','2021-02-11','000003','FAT','CONT','SEEEES');
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
INSERT INTO `DocSummary` VALUES ('000001',2550,0,21.75,0,0,21.75,2528.25,556.215,3084.47);
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
INSERT INTO `citta` VALUES (1,'prova'),(2,'brescia');
/*!40000 ALTER TABLE `citta` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clienti`
--

LOCK TABLES `clienti` WRITE;
/*!40000 ALTER TABLE `clienti` DISABLE KEYS */;
INSERT INTO `clienti` VALUES (1,'AA1','ses','cazzo','1'),(2,'BB2','azienda1','Darfo Boari','BS'),(3,'AA3','siiis','asddas','BS');
/*!40000 ALTER TABLE `clienti` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordini`
--

LOCK TABLES `ordini` WRITE;
/*!40000 ALTER TABLE `ordini` DISABLE KEYS */;
INSERT INTO `ordini` VALUES (1,'AB123','2020-02-04',3,167.4);
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
INSERT INTO `prodotti` VALUES (1,'EA230','cambiatoasdasd','ses','3',22.6),(2,'EA239','prod2','prodotto secondario','1',20);
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

-- Dump completed on 2021-02-17 11:00:13
