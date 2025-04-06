-- MySQL dump 10.13  Distrib 9.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: monuments
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Authenticator`
--

DROP TABLE IF EXISTS `Authenticator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Authenticator` (
  `credentialID` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` int NOT NULL,
  `credentialPublicKey` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `counter` int NOT NULL,
  `credentialDeviceType` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `credentialBackedUp` tinyint(1) NOT NULL,
  `transports` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userId`,`credentialID`),
  UNIQUE KEY `Authenticator_credentialID_key` (`credentialID`),
  CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authenticator`
--

LOCK TABLES `Authenticator` WRITE;
/*!40000 ALTER TABLE `Authenticator` DISABLE KEYS */;
/*!40000 ALTER TABLE `Authenticator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Batch`
--

DROP TABLE IF EXISTS `Batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Batch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityType` enum('MATERIAL','DETAIL','PRODUCT','SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int NOT NULL,
  `quantity` int NOT NULL,
  `productionDate` datetime(3) NOT NULL,
  `expiryDate` datetime(3) DEFAULT NULL,
  `status` enum('ACTIVE','USED','EXPIRED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Batch_number_key` (`number`),
  KEY `Batch_entityType_entityId_idx` (`entityType`,`entityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Batch`
--

LOCK TABLES `Batch` WRITE;
/*!40000 ALTER TABLE `Batch` DISABLE KEYS */;
/*!40000 ALTER TABLE `Batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Counterparty`
--

DROP TABLE IF EXISTS `Counterparty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Counterparty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `legalAddress` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `INN` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `KPP` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `OGRN` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `counterpartyTypeId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Counterparty_name_key` (`name`),
  KEY `Counterparty_counterpartyTypeId_fkey` (`counterpartyTypeId`),
  CONSTRAINT `Counterparty_counterpartyTypeId_fkey` FOREIGN KEY (`counterpartyTypeId`) REFERENCES `CounterpartyType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Counterparty`
--

LOCK TABLES `Counterparty` WRITE;
/*!40000 ALTER TABLE `Counterparty` DISABLE KEYS */;
INSERT INTO `Counterparty` VALUES (1,'asdasdasd','ACTIVE','','','','','','','',1,'2025-04-03 20:55:37.347','2025-04-03 20:55:37.347');
/*!40000 ALTER TABLE `Counterparty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CounterpartyType`
--

DROP TABLE IF EXISTS `CounterpartyType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CounterpartyType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CounterpartyType_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CounterpartyType`
--

LOCK TABLES `CounterpartyType` WRITE;
/*!40000 ALTER TABLE `CounterpartyType` DISABLE KEYS */;
INSERT INTO `CounterpartyType` VALUES (1,'sdsadsd','ACTIVE','','2025-04-03 19:51:20.592','2025-04-03 19:51:20.592');
/*!40000 ALTER TABLE `CounterpartyType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Detail`
--

DROP TABLE IF EXISTS `Detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kod` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `priceIn` int NOT NULL DEFAULT '0',
  `priceOut` int NOT NULL DEFAULT '0',
  `count` int NOT NULL DEFAULT '0',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `article` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `minBalance` int NOT NULL DEFAULT '0',
  `unitId` int NOT NULL,
  `warehouseId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Detail_kod_key` (`kod`),
  UNIQUE KEY `Detail_name_key` (`name`),
  KEY `Detail_warehouseId_idx` (`warehouseId`),
  KEY `Detail_unitId_fkey` (`unitId`),
  CONSTRAINT `Detail_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Detail_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Detail`
--

LOCK TABLES `Detail` WRITE;
/*!40000 ALTER TABLE `Detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `Detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DetailMaterial`
--

DROP TABLE IF EXISTS `DetailMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetailMaterial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detailId` int NOT NULL,
  `materialId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DetailMaterial_detailId_materialId_key` (`detailId`,`materialId`),
  KEY `DetailMaterial_detailId_idx` (`detailId`),
  KEY `DetailMaterial_materialId_idx` (`materialId`),
  CONSTRAINT `DetailMaterial_detailId_fkey` FOREIGN KEY (`detailId`) REFERENCES `Detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DetailMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DetailMaterial`
--

LOCK TABLES `DetailMaterial` WRITE;
/*!40000 ALTER TABLE `DetailMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `DetailMaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DetailService`
--

DROP TABLE IF EXISTS `DetailService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetailService` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detailId` int NOT NULL,
  `serviceId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DetailService_detailId_serviceId_key` (`detailId`,`serviceId`),
  KEY `DetailService_detailId_idx` (`detailId`),
  KEY `DetailService_serviceId_idx` (`serviceId`),
  CONSTRAINT `DetailService_detailId_fkey` FOREIGN KEY (`detailId`) REFERENCES `Detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DetailService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DetailService`
--

LOCK TABLES `DetailService` WRITE;
/*!40000 ALTER TABLE `DetailService` DISABLE KEYS */;
/*!40000 ALTER TABLE `DetailService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('INVOICE','DELIVERY_NOTE','QUALITY_CERTIFICATE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `status` enum('DRAFT','CONFIRMED','ARCHIVED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `orderId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Document_number_key` (`number`),
  KEY `Document_orderId_idx` (`orderId`),
  CONSTRAINT `Document_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Material`
--

DROP TABLE IF EXISTS `Material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `article` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `priceIn` int NOT NULL DEFAULT '0',
  `priceOut` int NOT NULL DEFAULT '0',
  `count` int NOT NULL DEFAULT '0',
  `minBalance` int NOT NULL DEFAULT '0',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `materialGroupId` int NOT NULL,
  `unitId` int NOT NULL,
  `warehouseId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Material_name_key` (`name`),
  KEY `Material_warehouseId_idx` (`warehouseId`),
  KEY `Material_materialGroupId_fkey` (`materialGroupId`),
  KEY `Material_unitId_fkey` (`unitId`),
  CONSTRAINT `Material_materialGroupId_fkey` FOREIGN KEY (`materialGroupId`) REFERENCES `MaterialGroup` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Material_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Material_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Material`
--

LOCK TABLES `Material` WRITE;
/*!40000 ALTER TABLE `Material` DISABLE KEYS */;
/*!40000 ALTER TABLE `Material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialGroup`
--

DROP TABLE IF EXISTS `MaterialGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialGroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MaterialGroup_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialGroup`
--

LOCK TABLES `MaterialGroup` WRITE;
/*!40000 ALTER TABLE `MaterialGroup` DISABLE KEYS */;
INSERT INTO `MaterialGroup` VALUES (1,'Материалы',0,'2025-04-03 08:46:43.545','2025-04-03 08:46:43.545');
/*!40000 ALTER TABLE `MaterialGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaterialMovement`
--

DROP TABLE IF EXISTS `MaterialMovement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaterialMovement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `materialId` int NOT NULL,
  `type` enum('IN','OUT','TRANSFER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MaterialMovement_materialId_idx` (`materialId`),
  CONSTRAINT `MaterialMovement_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaterialMovement`
--

LOCK TABLES `MaterialMovement` WRITE;
/*!40000 ALTER TABLE `MaterialMovement` DISABLE KEYS */;
/*!40000 ALTER TABLE `MaterialMovement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('STOCK_ALERT','ORDER_STATUS','PRODUCTION_STATUS','QUALITY_ALERT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('NEW','READ','ARCHIVED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `readAt` datetime(3) DEFAULT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stockAlertId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Notification_userId_idx` (`userId`),
  KEY `Notification_stockAlertId_idx` (`stockAlertId`),
  CONSTRAINT `Notification_stockAlertId_fkey` FOREIGN KEY (`stockAlertId`) REFERENCES `StockAlert` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NotificationPreference`
--

DROP TABLE IF EXISTS `NotificationPreference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NotificationPreference` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('STOCK_ALERT','ORDER_STATUS','PRODUCTION_STATUS','QUALITY_ALERT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` enum('LOW','MEDIUM','HIGH') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NotificationPreference_userId_type_priority_key` (`userId`,`type`,`priority`),
  KEY `NotificationPreference_userId_idx` (`userId`),
  CONSTRAINT `NotificationPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NotificationPreference`
--

LOCK TABLES `NotificationPreference` WRITE;
/*!40000 ALTER TABLE `NotificationPreference` DISABLE KEYS */;
/*!40000 ALTER TABLE `NotificationPreference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OperationMaterial`
--

DROP TABLE IF EXISTS `OperationMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OperationMaterial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `operationId` int NOT NULL,
  `materialId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OperationMaterial_operationId_materialId_key` (`operationId`,`materialId`),
  KEY `OperationMaterial_operationId_idx` (`operationId`),
  KEY `OperationMaterial_materialId_idx` (`materialId`),
  CONSTRAINT `OperationMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OperationMaterial_operationId_fkey` FOREIGN KEY (`operationId`) REFERENCES `ProductionOperation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OperationMaterial`
--

LOCK TABLES `OperationMaterial` WRITE;
/*!40000 ALTER TABLE `OperationMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `OperationMaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OperationTool`
--

DROP TABLE IF EXISTS `OperationTool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OperationTool` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `operationId` int NOT NULL,
  `toolId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OperationTool_operationId_toolId_key` (`operationId`,`toolId`),
  KEY `OperationTool_operationId_idx` (`operationId`),
  KEY `OperationTool_toolId_idx` (`toolId`),
  CONSTRAINT `OperationTool_operationId_fkey` FOREIGN KEY (`operationId`) REFERENCES `ProductionOperation` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OperationTool_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `Tool` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OperationTool`
--

LOCK TABLES `OperationTool` WRITE;
/*!40000 ALTER TABLE `OperationTool` DISABLE KEYS */;
/*!40000 ALTER TABLE `OperationTool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('SALE','PURCHASE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('DRAFT','CONFIRMED','IN_PROCESS','COMPLETED','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `deliveryDate` datetime(3) DEFAULT NULL,
  `totalAmount` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `counterpartyId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Order_number_key` (`number`),
  KEY `Order_counterpartyId_idx` (`counterpartyId`),
  CONSTRAINT `Order_counterpartyId_fkey` FOREIGN KEY (`counterpartyId`) REFERENCES `Counterparty` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItem`
--

DROP TABLE IF EXISTS `OrderItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entityType` enum('MATERIAL','DETAIL','PRODUCT','SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `amount` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `orderId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderItem_orderId_idx` (`orderId`),
  KEY `OrderItem_entityType_entityId_idx` (`entityType`,`entityId`),
  CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItem`
--

LOCK TABLES `OrderItem` WRITE;
/*!40000 ALTER TABLE `OrderItem` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderItem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PasswordResetToken`
--

DROP TABLE IF EXISTS `PasswordResetToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PasswordResetToken` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PasswordResetToken_token_key` (`token`),
  UNIQUE KEY `PasswordResetToken_email_token_key` (`email`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PasswordResetToken`
--

LOCK TABLES `PasswordResetToken` WRITE;
/*!40000 ALTER TABLE `PasswordResetToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `PasswordResetToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `date` datetime(3) NOT NULL,
  `type` enum('CASH','BANK','CARD') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','COMPLETED','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `orderId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Payment_orderId_idx` (`orderId`),
  CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PriceHistory`
--

DROP TABLE IF EXISTS `PriceHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PriceHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entityType` enum('MATERIAL','DETAIL','PRODUCT','SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int NOT NULL,
  `priceType` enum('IN','OUT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PriceHistory_entityType_entityId_idx` (`entityType`,`entityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PriceHistory`
--

LOCK TABLES `PriceHistory` WRITE;
/*!40000 ALTER TABLE `PriceHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `PriceHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kod` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `priceIn` int NOT NULL DEFAULT '0',
  `priceOut` int NOT NULL DEFAULT '0',
  `count` int NOT NULL DEFAULT '0',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `article` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `minBalance` int NOT NULL DEFAULT '0',
  `unitId` int NOT NULL,
  `warehouseId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_kod_key` (`kod`),
  UNIQUE KEY `Product_name_key` (`name`),
  KEY `Product_warehouseId_idx` (`warehouseId`),
  KEY `Product_unitId_fkey` (`unitId`),
  CONSTRAINT `Product_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductDetail`
--

DROP TABLE IF EXISTS `ProductDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `detailId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductDetail_productId_detailId_key` (`productId`,`detailId`),
  KEY `ProductDetail_productId_idx` (`productId`),
  KEY `ProductDetail_detailId_idx` (`detailId`),
  CONSTRAINT `ProductDetail_detailId_fkey` FOREIGN KEY (`detailId`) REFERENCES `Detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductDetail`
--

LOCK TABLES `ProductDetail` WRITE;
/*!40000 ALTER TABLE `ProductDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductMaterial`
--

DROP TABLE IF EXISTS `ProductMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductMaterial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `materialId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductMaterial_productId_materialId_key` (`productId`,`materialId`),
  KEY `ProductMaterial_productId_idx` (`productId`),
  KEY `ProductMaterial_materialId_idx` (`materialId`),
  CONSTRAINT `ProductMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductMaterial_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductMaterial`
--

LOCK TABLES `ProductMaterial` WRITE;
/*!40000 ALTER TABLE `ProductMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductMaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductService`
--

DROP TABLE IF EXISTS `ProductService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductService` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `serviceId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductService_productId_serviceId_key` (`productId`,`serviceId`),
  KEY `ProductService_productId_idx` (`productId`),
  KEY `ProductService_serviceId_idx` (`serviceId`),
  CONSTRAINT `ProductService_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductService`
--

LOCK TABLES `ProductService` WRITE;
/*!40000 ALTER TABLE `ProductService` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductionOperation`
--

DROP TABLE IF EXISTS `ProductionOperation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductionOperation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sequence` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` enum('PLANNED','IN_PROCESS','COMPLETED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `quantity` int NOT NULL,
  `completedQuantity` int NOT NULL DEFAULT '0',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `productionOrderId` int NOT NULL,
  `workCenterId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductionOperation_productionOrderId_idx` (`productionOrderId`),
  KEY `ProductionOperation_workCenterId_idx` (`workCenterId`),
  CONSTRAINT `ProductionOperation_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductionOperation_workCenterId_fkey` FOREIGN KEY (`workCenterId`) REFERENCES `WorkCenter` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductionOperation`
--

LOCK TABLES `ProductionOperation` WRITE;
/*!40000 ALTER TABLE `ProductionOperation` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductionOperation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductionOrder`
--

DROP TABLE IF EXISTS `ProductionOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductionOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PLANNED','IN_PROCESS','COMPLETED','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `quantity` int NOT NULL,
  `completedQuantity` int NOT NULL DEFAULT '0',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `productId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductionOrder_number_key` (`number`),
  KEY `ProductionOrder_productId_idx` (`productId`),
  CONSTRAINT `ProductionOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductionOrder`
--

LOCK TABLES `ProductionOrder` WRITE;
/*!40000 ALTER TABLE `ProductionOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductionOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QualityCheck`
--

DROP TABLE IF EXISTS `QualityCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QualityCheck` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('INCOMING','IN_PROCESS','FINAL') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','PASSED','FAILED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `quantity` int NOT NULL,
  `checkedQuantity` int NOT NULL,
  `passedQuantity` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `productionOrderId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `QualityCheck_productionOrderId_idx` (`productionOrderId`),
  CONSTRAINT `QualityCheck_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `ProductionOrder` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QualityCheck`
--

LOCK TABLES `QualityCheck` WRITE;
/*!40000 ALTER TABLE `QualityCheck` DISABLE KEYS */;
/*!40000 ALTER TABLE `QualityCheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SerialNumber`
--

DROP TABLE IF EXISTS `SerialNumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SerialNumber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityType` enum('MATERIAL','DETAIL','PRODUCT','SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int NOT NULL,
  `status` enum('NEW','IN_USE','SCRAPPED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `batchId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SerialNumber_number_key` (`number`),
  KEY `SerialNumber_entityType_entityId_idx` (`entityType`,`entityId`),
  KEY `SerialNumber_batchId_idx` (`batchId`),
  CONSTRAINT `SerialNumber_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `Batch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SerialNumber`
--

LOCK TABLES `SerialNumber` WRITE;
/*!40000 ALTER TABLE `SerialNumber` DISABLE KEYS */;
/*!40000 ALTER TABLE `SerialNumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `price` int NOT NULL DEFAULT '0',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Service_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceTask`
--

DROP TABLE IF EXISTS `ServiceTask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceTask` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` enum('PENDING','IN_PROGRESS','COMPLETED','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `plannedDuration` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `serviceId` int NOT NULL,
  `assignedToId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ServiceTask_serviceId_idx` (`serviceId`),
  KEY `ServiceTask_assignedToId_idx` (`assignedToId`),
  CONSTRAINT `ServiceTask_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ServiceTask_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceTask`
--

LOCK TABLES `ServiceTask` WRITE;
/*!40000 ALTER TABLE `ServiceTask` DISABLE KEYS */;
/*!40000 ALTER TABLE `ServiceTask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_idx` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StockAlert`
--

DROP TABLE IF EXISTS `StockAlert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StockAlert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entityType` enum('MATERIAL','DETAIL','PRODUCT','SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int NOT NULL,
  `type` enum('LOW_STOCK','REORDER_POINT','EXPIRY','OVERSTOCK') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `threshold` int NOT NULL,
  `currentValue` int NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StockAlert_entityType_entityId_idx` (`entityType`,`entityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StockAlert`
--

LOCK TABLES `StockAlert` WRITE;
/*!40000 ALTER TABLE `StockAlert` DISABLE KEYS */;
/*!40000 ALTER TABLE `StockAlert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StockMovement`
--

DROP TABLE IF EXISTS `StockMovement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StockMovement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entityType` enum('MATERIAL','DETAIL','PRODUCT','SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` int NOT NULL,
  `type` enum('IN','OUT','TRANSFER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `warehouseId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `StockMovement_entityType_entityId_idx` (`entityType`,`entityId`),
  KEY `StockMovement_warehouseId_idx` (`warehouseId`),
  CONSTRAINT `StockMovement_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StockMovement`
--

LOCK TABLES `StockMovement` WRITE;
/*!40000 ALTER TABLE `StockMovement` DISABLE KEYS */;
/*!40000 ALTER TABLE `StockMovement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tool`
--

DROP TABLE IF EXISTS `Tool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tool` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `workCenterId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Tool_name_key` (`name`),
  KEY `Tool_workCenterId_idx` (`workCenterId`),
  CONSTRAINT `Tool_workCenterId_fkey` FOREIGN KEY (`workCenterId`) REFERENCES `WorkCenter` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tool`
--

LOCK TABLES `Tool` WRITE;
/*!40000 ALTER TABLE `Tool` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TwoFactorConfirmation`
--

DROP TABLE IF EXISTS `TwoFactorConfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TwoFactorConfirmation` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TwoFactorConfirmation_userId_key` (`userId`),
  CONSTRAINT `TwoFactorConfirmation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TwoFactorConfirmation`
--

LOCK TABLES `TwoFactorConfirmation` WRITE;
/*!40000 ALTER TABLE `TwoFactorConfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `TwoFactorConfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TwoFactorToken`
--

DROP TABLE IF EXISTS `TwoFactorToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TwoFactorToken` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `TwoFactorToken_token_key` (`token`),
  UNIQUE KEY `TwoFactorToken_email_token_key` (`email`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TwoFactorToken`
--

LOCK TABLES `TwoFactorToken` WRITE;
/*!40000 ALTER TABLE `TwoFactorToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `TwoFactorToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Unit`
--

DROP TABLE IF EXISTS `Unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Unit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Unit_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Unit`
--

LOCK TABLES `Unit` WRITE;
/*!40000 ALTER TABLE `Unit` DISABLE KEYS */;
INSERT INTO `Unit` VALUES (1,'sdsd','ACTIVE','','2025-04-03 19:44:04.052','2025-04-03 19:44:04.052');
/*!40000 ALTER TABLE `Unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `idInt` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobTitle` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phoneNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `role` enum('OWNER','ADMIN','OPERATOR') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPERATOR',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `isTwoFactorEnabled` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_idInt_key` (`idInt`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cm9143lfs00007taaox2hw9fl',1,'Тест','Админ','','test_admin@monuments.ru','2025-04-03 08:46:43.460','$2a$10$/N9ghkIWD5LxCPjvTUyrYePoXlug/mdDAI3ekaAvCJbT/IR0KW.py','','','+7 (921) 111-22-28','ADMIN','ACTIVE',0,'2025-04-03 08:46:43.529','2025-04-03 20:24:25.998'),('cm9143lft00017taadhs968e2',2,'Тест','Оператор','','test_operator@monuments.ru','2025-04-03 08:46:43.528','$2a$10$R7WUNfeow2jqHmgIbMgsEO.ILCAF21z9jJlEZYB2E2nm7Nf5RPSZ2','','','+7 (911) 377-55-28','OPERATOR','ACTIVE',0,'2025-04-03 08:46:43.529','2025-04-03 08:46:43.529');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationToken` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_email_token_key` (`email`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationToken`
--

LOCK TABLES `VerificationToken` WRITE;
/*!40000 ALTER TABLE `VerificationToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `VerificationToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Warehouse`
--

DROP TABLE IF EXISTS `Warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Warehouse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `warehouseGroupId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Warehouse_name_key` (`name`),
  KEY `Warehouse_warehouseGroupId_fkey` (`warehouseGroupId`),
  CONSTRAINT `Warehouse_warehouseGroupId_fkey` FOREIGN KEY (`warehouseGroupId`) REFERENCES `WarehouseGroup` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Warehouse`
--

LOCK TABLES `Warehouse` WRITE;
/*!40000 ALTER TABLE `Warehouse` DISABLE KEYS */;
INSERT INTO `Warehouse` VALUES (1,'Основной склад','','ACTIVE','',1,'2025-04-03 19:05:29.308','2025-04-03 19:05:29.308'),(3,'asdasd','','ACTIVE','',1,'2025-04-04 05:39:32.265','2025-04-04 05:39:32.265');
/*!40000 ALTER TABLE `Warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WarehouseGroup`
--

DROP TABLE IF EXISTS `WarehouseGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WarehouseGroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `WarehouseGroup_name_key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WarehouseGroup`
--

LOCK TABLES `WarehouseGroup` WRITE;
/*!40000 ALTER TABLE `WarehouseGroup` DISABLE KEYS */;
INSERT INTO `WarehouseGroup` VALUES (1,'Склады',0,'2025-04-03 08:46:43.549','2025-04-03 08:46:43.549'),(2,'adssd',1,'2025-04-03 21:59:58.071','2025-04-03 21:59:58.071');
/*!40000 ALTER TABLE `WarehouseGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WorkCenter`
--

DROP TABLE IF EXISTS `WorkCenter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WorkCenter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` enum('ACTIVE','ARCHIVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `capacity` int NOT NULL DEFAULT '1',
  `comment` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `WorkCenter_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WorkCenter`
--

LOCK TABLES `WorkCenter` WRITE;
/*!40000 ALTER TABLE `WorkCenter` DISABLE KEYS */;
/*!40000 ALTER TABLE `WorkCenter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-06  6:00:04
