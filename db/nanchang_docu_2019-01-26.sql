# ************************************************************
# Sequel Pro SQL dump
# Version 4529
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 40.73.7.90 (MySQL 5.6.30)
# Database: nanchang_docu
# Generation Time: 2019-01-26 11:37:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table t_docu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_docu`;

CREATE TABLE `t_docu` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_no` varchar(20) NOT NULL,
  `c_type` int(10) NOT NULL,
  `c_way` int(10) NOT NULL,
  `c_supplier` int(10) NOT NULL,
  `c_stock` int(10) NOT NULL,
  `c_type_from` int(10) NOT NULL,
  `c_manager` int(10) NOT NULL,
  `c_salesman` int(10) NOT NULL,
  `c_jizhang` int(10) NOT NULL,
  `c_baoguan` int(10) NOT NULL,
  `c_user` int(10) NOT NULL,
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_dept` int(10) NOT NULL,
  `c_status` int(10) NOT NULL,
  `c_is_back` bit(1) NOT NULL,
  `c_appr_people` int(10) NOT NULL,
  `c_appr_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_no_from` varchar(20) NOT NULL,
  `c_no_order` varchar(20) NOT NULL,
  `c_kp_type` int(10) NOT NULL,
  `c_pay_type` int(10) NOT NULL,
  `c_stock_to` int(10) NOT NULL,
  `c_period` int(10) NOT NULL,
  `c_amt_should` decimal(18,2) NOT NULL,
  `c_amt_actual` decimal(18,2) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  `c_group` int(10) NOT NULL,
  `c_act` int(10) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_DOCU` (`c_id`),
  KEY `idx_docu_group` (`c_group`),
  KEY `idx_docu_status` (`c_status`),
  KEY `idx_docu_stock` (`c_stock`),
  KEY `idx_docu_supplier` (`c_supplier`),
  KEY `idx_docu_time` (`c_time`),
  KEY `idx_docu_user` (`c_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_docu` WRITE;
/*!40000 ALTER TABLE `t_docu` DISABLE KEYS */;

INSERT INTO `t_docu` (`c_id`, `c_no`, `c_type`, `c_way`, `c_supplier`, `c_stock`, `c_type_from`, `c_manager`, `c_salesman`, `c_jizhang`, `c_baoguan`, `c_user`, `c_time`, `c_dept`, `c_status`, `c_is_back`, `c_appr_people`, `c_appr_time`, `c_no_from`, `c_no_order`, `c_kp_type`, `c_pay_type`, `c_stock_to`, `c_period`, `c_amt_should`, `c_amt_actual`, `c_memo`, `c_group`, `c_act`)
VALUES
	(2,'GR201712130001',4,1,2,671,0,2,1,0,0,1,'2017-12-14 09:18:02.000000',1207,1213,b'0',1,'2017-12-14 09:18:02.000000','','',0,0,0,0,0.00,0.00,'',2,131),
	(3,'XC201712130001',5,1,2,667,0,2,1,0,0,1,'2017-12-13 06:01:18.000000',1207,1211,b'0',0,'2017-12-13 06:01:18.000000','','',0,0,0,0,0.00,0.00,'',2,116),
	(4,'XC201712130002',5,1,2,667,0,2,1,0,0,1,'2017-12-13 06:46:49.000000',1207,1212,b'0',1,'2017-12-13 06:46:49.000000','','',0,0,0,0,0.00,0.00,'',2,117),
	(5,'GR201712130002',4,1,1,667,0,2,1,0,0,1,'2018-11-12 17:58:11.000000',1207,1213,b'1',0,'2017-12-13 09:37:47.000000','','',0,0,0,0,0.00,0.00,'',2,131),
	(6,'GR201811020001',4,1,1,667,0,2,1,0,0,1,'2018-11-03 01:19:34.000000',1207,-1,b'1',0,'2018-11-03 01:19:34.000000','','',0,0,0,0,0.00,0.00,'',2,0),
	(7,'GR201811120001',4,1,1,672,0,2,1,0,0,1,'2018-11-12 16:23:43.000000',1207,-1,b'1',0,'2018-11-12 16:23:43.000000','','',0,0,0,0,0.00,0.00,'',2,0),
	(8,'GR201811120002',4,1,1,667,0,2,1,0,0,1,'2018-11-12 16:34:33.000000',1207,1211,b'1',0,'2018-11-12 16:34:33.000000','','',0,0,0,0,0.00,0.00,'',2,129),
	(9,'GR201811120003',4,1,1,672,0,2,1,0,0,1,'2018-11-12 17:27:36.000000',1207,-1,b'1',0,'2018-11-12 17:27:36.000000','','',0,0,0,0,0.00,0.00,'',2,0);

/*!40000 ALTER TABLE `t_docu` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_docu_rec
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_docu_rec`;

CREATE TABLE `t_docu_rec` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_docu` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_unit` int(10) NOT NULL,
  `c_qty` decimal(8,3) NOT NULL,
  `c_price` decimal(12,6) NOT NULL,
  `c_price_tax` decimal(12,6) NOT NULL,
  `c_tax` decimal(5,2) NOT NULL,
  `c_amt` decimal(18,2) NOT NULL,
  `c_amt_tax` decimal(18,2) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  `c_price_out` decimal(12,6) NOT NULL,
  `c_price_out_tax` decimal(12,6) NOT NULL,
  `c_amt_out` decimal(18,2) NOT NULL,
  `c_amt_out_tax` decimal(18,2) NOT NULL,
  `c_qty_from` decimal(8,3) NOT NULL,
  `c_qty_to` decimal(8,3) NOT NULL,
  `c_qty_stock` decimal(8,3) NOT NULL,
  `c_rec_from` int(10) NOT NULL,
  `c_no_from` varchar(20) NOT NULL,
  `c_no_order` varchar(20) NOT NULL,
  `c_qty_kp` decimal(8,3) NOT NULL,
  `c_close` bit(1) NOT NULL,
  `c_supplier` int(10) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_DOCU_REC` (`c_id`),
  KEY `idx_docu_rec_master` (`c_docu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_docu_rec` WRITE;
/*!40000 ALTER TABLE `t_docu_rec` DISABLE KEYS */;

INSERT INTO `t_docu_rec` (`c_id`, `c_docu`, `c_goods`, `c_unit`, `c_qty`, `c_price`, `c_price_tax`, `c_tax`, `c_amt`, `c_amt_tax`, `c_memo`, `c_price_out`, `c_price_out_tax`, `c_amt_out`, `c_amt_out_tax`, `c_qty_from`, `c_qty_to`, `c_qty_stock`, `c_rec_from`, `c_no_from`, `c_no_order`, `c_qty_kp`, `c_close`, `c_supplier`)
VALUES
	(4,2,4,1224,5.000,0.000000,0.000000,17.00,0.00,0.00,'',0.000000,0.000000,0.00,0.00,5.000,0.000,0.000,3,'PO201712060001','PO201712060001',0.000,b'0',1),
	(5,2,5,1224,1.000,0.000000,0.000000,17.00,0.00,0.00,'',0.000000,0.000000,0.00,0.00,1.000,0.000,0.000,2,'PO201712060001','PO201712060001',0.000,b'0',1),
	(6,4,6,688,1.000,0.000000,0.000000,17.00,0.00,0.00,'',0.000000,0.000000,0.00,0.00,1.000,0.000,0.000,4,'PO201712060002','PO201712060002',0.000,b'0',2),
	(9,4,5,1224,1.000,0.000000,0.000000,17.00,0.00,0.00,'',0.000000,0.000000,0.00,0.00,0.000,0.000,0.000,0,'','',0.000,b'0',0),
	(10,5,4,1224,1.000,0.000000,0.000000,17.00,0.00,0.00,'',0.000000,0.000000,0.00,0.00,1.000,0.000,0.000,5,'PR201809300001','PR201809300001',0.000,b'0',1),
	(11,3,4,1224,1.000,0.000000,0.000000,17.00,0.00,0.00,'',0.000000,0.000000,0.00,0.00,0.000,0.000,0.000,0,'','',0.000,b'0',0);

/*!40000 ALTER TABLE `t_docu_rec` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_goods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_goods`;

CREATE TABLE `t_goods` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_ucode` varchar(50) NOT NULL,
  `c_name` varchar(255) NOT NULL,
  `c_desc` varchar(255) NOT NULL,
  `c_property` int(10) NOT NULL,
  `c_class` int(10) NOT NULL,
  `c_unit` int(10) NOT NULL,
  `c_type` int(10) NOT NULL,
  `c_default_warehouse` int(10) NOT NULL,
  `c_default_position` int(10) NOT NULL,
  `c_default_supplier` int(10) NOT NULL,
  `c_source` int(10) NOT NULL,
  `c_min_stock` decimal(8,3) NOT NULL,
  `c_max_stock` decimal(8,3) NOT NULL,
  `c_status` int(10) NOT NULL,
  `c_cost` decimal(12,6) NOT NULL,
  `c_pic` varchar(255) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_GOODS` (`c_id`),
  KEY `idx_goods_class` (`c_class`),
  KEY `idx_goods_no` (`c_ucode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_goods` WRITE;
/*!40000 ALTER TABLE `t_goods` DISABLE KEYS */;

INSERT INTO `t_goods` (`c_id`, `c_ucode`, `c_name`, `c_desc`, `c_property`, `c_class`, `c_unit`, `c_type`, `c_default_warehouse`, `c_default_position`, `c_default_supplier`, `c_source`, `c_min_stock`, `c_max_stock`, `c_status`, `c_cost`, `c_pic`, `c_memo`)
VALUES
	(4,'0101','钢筋','xxx1223xxxxxx',0,720,1224,0,0,0,0,0,0.000,0.000,0,0.000000,'/static/upfiles/t_goods/2018/gangcai4.jpg',''),
	(5,'0401','粗砂','0122',0,709,1224,0,0,0,0,0,0.000,0.000,0,0.000000,'/static/upfiles/t_goods/2018/shashi3.jpeg',''),
	(6,'0301','混凝土','001xxxxxx',0,711,695,0,0,0,0,0,0.000,0.000,0,0.000000,'/static/upfiles/t_goods/2018/huningtu1.jpeg',''),
	(7,'0102','钢筋','1222',0,707,1224,0,0,0,0,0,0.000,0.000,-1,0.000000,'/static/upfiles/t_goods/2018/sk.jpg',''),
	(8,'0102','槽钢','01002',0,716,1224,0,0,0,0,0,0.000,0.000,0,0.000000,'/static/upfiles/t_goods/2018/gangcai1.jpeg',''),
	(9,'0402','细砂','01102',0,707,1224,0,0,0,0,0,0.000,0.000,0,0.000000,'/static/upfiles/t_goods/2018/shashi4.jpg','');

/*!40000 ALTER TABLE `t_goods` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_order`;

CREATE TABLE `t_order` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_no` varchar(20) NOT NULL,
  `c_uid` varchar(64) DEFAULT NULL,
  `c_name` varchar(64) DEFAULT NULL,
  `c_type` int(10) DEFAULT NULL,
  `c_way` int(10) DEFAULT NULL,
  `c_supplier` int(10) NOT NULL,
  `c_type_from` int(10) DEFAULT NULL,
  `c_addr_delivery` int(10) NOT NULL,
  `c_consignee` varchar(50) NOT NULL,
  `c_cash_type` int(10) NOT NULL,
  `c_currency` int(10) DEFAULT NULL,
  `c_exchange_rate` decimal(5,2) DEFAULT NULL,
  `c_manager` int(10) DEFAULT NULL,
  `c_salesman` int(10) DEFAULT NULL,
  `c_user` int(10) NOT NULL,
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_dept` int(10) NOT NULL,
  `c_memo` varchar(255) DEFAULT NULL,
  `c_is_back` bit(1) DEFAULT NULL,
  `c_group` int(10) DEFAULT NULL,
  `c_appr_people` int(10) DEFAULT NULL,
  `c_appr_time` timestamp(6) NULL DEFAULT NULL,
  `c_no_from` varchar(20) DEFAULT NULL,
  `c_no_order` varchar(20) DEFAULT NULL,
  `c_guarantee` int(10) DEFAULT NULL,
  `c_content` varchar(225) DEFAULT NULL,
  `c_amt_should` decimal(18,2) DEFAULT NULL,
  `c_amt_actual` decimal(18,2) DEFAULT NULL,
  UNIQUE KEY `c_id` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_order` WRITE;
/*!40000 ALTER TABLE `t_order` DISABLE KEYS */;

INSERT INTO `t_order` (`c_id`, `c_no`, `c_uid`, `c_name`, `c_type`, `c_way`, `c_supplier`, `c_type_from`, `c_addr_delivery`, `c_consignee`, `c_cash_type`, `c_currency`, `c_exchange_rate`, `c_manager`, `c_salesman`, `c_user`, `c_time`, `c_dept`, `c_memo`, `c_is_back`, `c_group`, `c_appr_people`, `c_appr_time`, `c_no_from`, `c_no_order`, `c_guarantee`, `c_content`, `c_amt_should`, `c_amt_actual`)
VALUES
	(1,'PO201712060001',NULL,NULL,2,1,1,0,795,'',798,NULL,NULL,2,1,1,'2017-12-12 07:55:22.000000',1207,'dsss',NULL,2,1,'2017-12-12 07:55:22.000000',NULL,NULL,NULL,NULL,NULL,NULL),
	(2,'PO201712060002',NULL,NULL,2,1,2,0,795,'',798,NULL,NULL,2,1,1,'2017-12-06 08:35:28.000000',1207,'',NULL,2,1,'2017-12-06 08:35:28.000000',NULL,NULL,NULL,NULL,NULL,NULL),
	(3,'PO201810040001','100001','江西中舜建筑公司',2,1,1,0,795,'',798,NULL,NULL,2,1,1,'2018-10-04 08:00:00.000000',1207,'',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,'PR201809300001','100001','江西中舜建筑公司',0,0,2,0,795,'苏毅',798,NULL,NULL,0,2,1,'2018-10-31 00:00:00.000000',0,'',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(5,'PR201809300001','100001','江西中舜建筑公司',0,0,1,0,795,'老胡',799,NULL,NULL,0,0,1,'2018-10-27 08:00:00.000000',74,'test',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `t_order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_order_apply
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_order_apply`;

CREATE TABLE `t_order_apply` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_no` varchar(20) NOT NULL,
  `c_uid` varchar(64) DEFAULT NULL COMMENT '供应商id',
  `c_name` varchar(128) DEFAULT NULL COMMENT '交易名称',
  `c_money` double DEFAULT NULL COMMENT '合同总价',
  `c_type` int(11) DEFAULT NULL COMMENT '收款方式',
  `c_account` varchar(128) DEFAULT NULL COMMENT '收款账户',
  `c_dept` int(10) NOT NULL,
  `c_way` int(10) NOT NULL,
  `c_rec_money` double DEFAULT NULL COMMENT '已收工程款',
  `c_complete` int(11) DEFAULT NULL COMMENT '已经完成工作量',
  `c_appr_money` float DEFAULT NULL COMMENT '已经申请融资金额',
  `c_appr_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_applicant` int(10) NOT NULL,
  `c_applicat_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_group` int(10) NOT NULL,
  `c_user` int(10) NOT NULL DEFAULT '1',
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_memo` varchar(255) NOT NULL,
  `c_status` int(11) DEFAULT '0',
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_ORDER_APPLY` (`c_id`),
  KEY `idx_order_apply_group` (`c_group`),
  KEY `idx_order_apply_time` (`c_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_order_apply` WRITE;
/*!40000 ALTER TABLE `t_order_apply` DISABLE KEYS */;

INSERT INTO `t_order_apply` (`c_id`, `c_no`, `c_uid`, `c_name`, `c_money`, `c_type`, `c_account`, `c_dept`, `c_way`, `c_rec_money`, `c_complete`, `c_appr_money`, `c_appr_time`, `c_applicant`, `c_applicat_time`, `c_group`, `c_user`, `c_time`, `c_memo`, `c_status`)
VALUES
	(26,'PR201809300001','100001','南昌县房建改造项目',12000000,0,'1234567891011123',1207,1,100000,1430,50000,'2018-09-30 23:47:08.000000',1,'2018-09-30 23:47:08.000000',2,1,'2018-09-30 08:00:00.000000','',0),
	(27,'PR201809300002','1180','江西中舜建筑公司',10000000,NULL,'1010000001111',1289,1,0,1430,0,'2018-12-10 03:27:48.000000',2,'2018-12-10 03:27:48.000000',2,1,'2018-12-21 00:00:00.000000','',0),
	(28,'PR201809300003','1180','江西中舜建筑公司',5000000,NULL,'10000001112222',1289,1,0,1430,0,'2018-12-10 08:01:13.000000',2,'2018-12-10 08:01:13.000000',2,1,'2018-12-10 00:00:00.000000','test',0);

/*!40000 ALTER TABLE `t_order_apply` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_order_apply_rec
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_order_apply_rec`;

CREATE TABLE `t_order_apply_rec` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_order_apply` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_qty` decimal(8,3) NOT NULL,
  `c_use` varchar(255) NOT NULL,
  `c_supplier` int(10) NOT NULL,
  `c_time_arrive` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_close` bit(1) NOT NULL,
  `c_qty_to` decimal(8,3) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_ORDER_APPLY_REC` (`c_id`),
  KEY `idx_order_apply_rec_master` (`c_order_apply`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_order_apply_rec` WRITE;
/*!40000 ALTER TABLE `t_order_apply_rec` DISABLE KEYS */;

INSERT INTO `t_order_apply_rec` (`c_id`, `c_order_apply`, `c_goods`, `c_qty`, `c_use`, `c_supplier`, `c_time_arrive`, `c_close`, `c_qty_to`, `c_memo`)
VALUES
	(1,24,4,1.000,'',0,'2017-12-05 10:30:13.000000',b'0',0.000,''),
	(3,24,4,5.000,'',0,'2017-12-05 16:00:00.000000',b'1',5.000,''),
	(5,24,6,1.000,'',0,'2017-12-06 02:44:16.000000',b'1',1.000,''),
	(6,24,5,1.000,'',0,'2017-12-06 02:47:51.000000',b'1',1.000,''),
	(7,26,4,1.000,'',0,'2018-10-28 04:33:45.000000',b'1',1.000,''),
	(8,26,6,1.000,'',0,'2018-10-28 04:33:47.000000',b'0',0.000,''),
	(9,26,5,1.000,'',0,'2018-10-28 04:33:47.000000',b'0',0.000,''),
	(10,5,7,1.000,'',0,'2018-10-28 16:48:11.000000',b'0',0.000,''),
	(11,27,4,0.000,'0',0,'2018-12-10 03:58:41.000000',b'0',0.000,''),
	(12,28,9,0.000,'',0,'2018-12-10 08:03:41.000000',b'0',0.000,''),
	(13,28,8,0.000,'',0,'2018-12-10 08:03:45.000000',b'0',0.000,'');

/*!40000 ALTER TABLE `t_order_apply_rec` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_order_rec
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_order_rec`;

CREATE TABLE `t_order_rec` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_order` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_unit` int(10) NOT NULL,
  `c_qty` decimal(8,3) NOT NULL,
  `c_price` decimal(12,6) NOT NULL,
  `c_price_tax` decimal(12,6) NOT NULL,
  `c_discount` decimal(5,2) DEFAULT NULL,
  `c_tax` decimal(5,2) NOT NULL,
  `c_date_delivery` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_memo` varchar(255) NOT NULL,
  `c_qty_from` decimal(8,3) NOT NULL,
  `c_qty_to` decimal(8,3) NOT NULL,
  `c_rec_from` int(10) NOT NULL,
  `c_no` varchar(20) NOT NULL DEFAULT '',
  `c_qty_kp` decimal(8,3) NOT NULL,
  `c_close` bit(1) NOT NULL,
  `c_qty_stock` decimal(8,3) NOT NULL,
  `c_is_pay` bit(1) NOT NULL,
  `c_amt` decimal(12,2) NOT NULL,
  `c_amt_tax` decimal(12,2) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_ORDER_REC` (`c_id`),
  KEY `idx_order_rec_master` (`c_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_order_rec` WRITE;
/*!40000 ALTER TABLE `t_order_rec` DISABLE KEYS */;

INSERT INTO `t_order_rec` (`c_id`, `c_order`, `c_goods`, `c_unit`, `c_qty`, `c_price`, `c_price_tax`, `c_discount`, `c_tax`, `c_date_delivery`, `c_memo`, `c_qty_from`, `c_qty_to`, `c_rec_from`, `c_no`, `c_qty_kp`, `c_close`, `c_qty_stock`, `c_is_pay`, `c_amt`, `c_amt_tax`)
VALUES
	(2,1,5,1224,1.000,0.000000,0.000000,NULL,17.00,'2017-12-06 08:06:30.000000','',1.000,1.000,6,'PR201712050018',0.000,b'1',0.000,b'0',0.00,0.00),
	(3,1,4,1224,5.000,0.000000,0.000000,NULL,17.00,'2017-12-06 08:06:32.000000','',5.000,5.000,3,'PR201712050018',0.000,b'1',0.000,b'0',0.00,0.00),
	(4,2,6,688,1.000,0.000000,0.000000,NULL,17.00,'2017-12-06 08:33:28.000000','',1.000,1.000,5,'PR201712050018',0.000,b'1',0.000,b'0',0.00,0.00),
	(5,5,4,1224,1.000,0.000000,0.000000,NULL,17.00,'2018-10-28 17:08:55.000000','',1.000,1.000,7,'PR201809300001',0.000,b'1',0.000,b'0',0.00,0.00),
	(6,27,6,695,1.000,0.000000,0.000000,NULL,17.00,'2018-12-10 03:36:06.000000','',1.000,0.000,8,'PR201809300001',0.000,b'0',0.000,b'0',0.00,0.00),
	(7,4,6,695,1.000,0.000000,0.000000,NULL,17.00,'2018-12-10 03:43:39.000000','',1.000,0.000,8,'PR201809300001',0.000,b'0',0.000,b'0',0.00,0.00),
	(8,27,4,694,0.000,0.000000,0.000000,NULL,17.00,'2018-12-10 03:50:43.000000','',0.000,0.000,4,'27',0.000,b'0',0.000,b'0',0.00,0.00);

/*!40000 ALTER TABLE `t_order_rec` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_pay
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_pay`;

CREATE TABLE `t_pay` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_no` varchar(20) NOT NULL,
  `c_type` int(10) NOT NULL,
  `c_pay_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_supplier` int(10) NOT NULL,
  `c_amt_should` decimal(12,2) NOT NULL,
  `c_amt_actual` decimal(12,2) NOT NULL,
  `c_way` int(10) NOT NULL,
  `c_pay_type` int(10) NOT NULL,
  `c_manager` int(10) NOT NULL,
  `c_salesman` int(10) NOT NULL,
  `c_jizhang` int(10) NOT NULL,
  `c_dept` int(10) NOT NULL,
  `c_status` int(10) NOT NULL,
  `c_appr_people` int(10) NOT NULL,
  `c_appr_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_no_order` varchar(255) NOT NULL,
  `c_no_order2` varchar(255) NOT NULL,
  `c_user` int(10) NOT NULL,
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_memo` varchar(255) NOT NULL,
  `c_group` int(10) NOT NULL,
  `c_act` int(10) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_PAY` (`c_id`),
  KEY `idx_pay_supplier` (`c_supplier`),
  KEY `idx_pay_time` (`c_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table t_pay_rec
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_pay_rec`;

CREATE TABLE `t_pay_rec` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_pay` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_id_order` varchar(20) NOT NULL,
  `c_id_bill` decimal(8,3) NOT NULL,
  `c_no_bill` varchar(20) NOT NULL,
  `c_amt_should` decimal(12,2) NOT NULL,
  `c_amt_actual` decimal(12,2) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_PAY_REC` (`c_id`),
  KEY `idx_pay_rec_master` (`c_pay`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table t_period
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_period`;

CREATE TABLE `t_period` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_stock` int(10) NOT NULL,
  `c_time_begin` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_time_end` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_begin` decimal(12,2) NOT NULL,
  `c_in` decimal(12,2) NOT NULL,
  `c_out` decimal(12,2) NOT NULL,
  `c_end` decimal(12,2) NOT NULL,
  `c_status` int(10) NOT NULL,
  `c_user` int(10) NOT NULL,
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_memo` varchar(255) NOT NULL,
  `c_group` int(10) NOT NULL,
  `c_period_ucode` int(10) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_PERIOD` (`c_id`),
  KEY `idx_period_stock` (`c_stock`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_period` WRITE;
/*!40000 ALTER TABLE `t_period` DISABLE KEYS */;

INSERT INTO `t_period` (`c_id`, `c_stock`, `c_time_begin`, `c_time_end`, `c_begin`, `c_in`, `c_out`, `c_end`, `c_status`, `c_user`, `c_time`, `c_memo`, `c_group`, `c_period_ucode`)
VALUES
	(2,664,'2017-12-16 16:00:00.000000','2017-12-16 16:00:00.000000',0.00,0.00,0.00,0.00,0,1,'2017-12-17 05:59:07.000000','',2,1278);

/*!40000 ALTER TABLE `t_period` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_period_goods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_period_goods`;

CREATE TABLE `t_period_goods` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_period` int(10) NOT NULL,
  `c_stock` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_begin` decimal(18,2) NOT NULL,
  `c_begin_qty` decimal(8,3) NOT NULL,
  `c_begin_price` decimal(12,6) NOT NULL,
  `c_in_qty` decimal(8,3) NOT NULL,
  `c_in_price` decimal(12,6) NOT NULL,
  `c_in` decimal(18,2) NOT NULL,
  `c_out_qty` decimal(8,3) NOT NULL,
  `c_out_price` decimal(12,6) NOT NULL,
  `c_out` decimal(18,2) NOT NULL,
  `c_end_qty` decimal(8,3) NOT NULL,
  `c_end_price` decimal(12,6) NOT NULL,
  `c_end_qty_calc` decimal(8,3) NOT NULL,
  `c_end` decimal(18,2) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `idx_period_goods_stock` (`c_period`,`c_stock`,`c_goods`),
  UNIQUE KEY `PK_T_PERIOD_GOODS` (`c_id`),
  KEY `idx_period_goods_period` (`c_period`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table t_price_supplier
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_price_supplier`;

CREATE TABLE `t_price_supplier` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_supplier` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_price` decimal(12,6) NOT NULL,
  `c_tax` decimal(5,2) NOT NULL,
  `c_price_tax` decimal(12,6) NOT NULL,
  `c_price_avg` decimal(12,6) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  `c_group` int(10) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_PRICE_SUPPLIER` (`c_id`),
  KEY `idx_price_supplier_goods` (`c_goods`),
  KEY `idx_price_supplier_supplier` (`c_supplier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table t_stock_goods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_stock_goods`;

CREATE TABLE `t_stock_goods` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_stock` int(10) NOT NULL,
  `c_goods` int(10) NOT NULL,
  `c_qty` decimal(8,3) NOT NULL,
  `c_qty_min` decimal(8,3) NOT NULL,
  `c_qty_max` decimal(8,3) NOT NULL,
  `c_price` decimal(12,6) NOT NULL,
  `c_user` int(10) NOT NULL,
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_memo` varchar(255) NOT NULL,
  `c_group` int(10) NOT NULL,
  `c_goods_status` int(10) DEFAULT NULL,
  `c_qty_way` decimal(8,3) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `idx_stock_goods` (`c_stock`,`c_goods`),
  UNIQUE KEY `PK_T_STOCK_GOODS` (`c_id`),
  KEY `idx_stock_goods_group` (`c_group`),
  KEY `idx_stock_goods_stock` (`c_stock`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_stock_goods` WRITE;
/*!40000 ALTER TABLE `t_stock_goods` DISABLE KEYS */;

INSERT INTO `t_stock_goods` (`c_id`, `c_stock`, `c_goods`, `c_qty`, `c_qty_min`, `c_qty_max`, `c_price`, `c_user`, `c_time`, `c_memo`, `c_group`, `c_goods_status`, `c_qty_way`)
VALUES
	(3,671,4,0.000,0.000,0.000,0.000000,1,'2017-12-14 09:18:03.677000','',2,1,0.000),
	(4,671,5,0.000,0.000,0.000,0.000000,1,'2017-12-14 09:18:03.693000','',2,1,0.000);

/*!40000 ALTER TABLE `t_stock_goods` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table t_supplier
# ------------------------------------------------------------

DROP TABLE IF EXISTS `t_supplier`;

CREATE TABLE `t_supplier` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_no` varchar(20) NOT NULL,
  `c_name` varchar(255) NOT NULL,
  `c_address` varchar(255) NOT NULL,
  `c_status` int(10) NOT NULL,
  `c_industry` int(10) NOT NULL,
  `c_linkman` varchar(50) NOT NULL,
  `c_phone` varchar(20) NOT NULL,
  `c_mobile` varchar(20) NOT NULL,
  `c_fax` varchar(20) NOT NULL,
  `c_zip` varchar(20) NOT NULL,
  `c_email` varchar(50) NOT NULL,
  `c_bank_account` varchar(100) NOT NULL,
  `c_bank_code` varchar(20) NOT NULL,
  `c_registration_taxnum` varchar(20) NOT NULL,
  `c_vat` varchar(20) NOT NULL,
  `c_province` varchar(10) NOT NULL,
  `c_city` varchar(10) NOT NULL,
  `c_country` varchar(10) NOT NULL,
  `c_legal_person` varchar(20) NOT NULL,
  `c_discount` decimal(2,1) NOT NULL,
  `c_class` int(10) NOT NULL,
  `c_registered_trademark` varchar(50) NOT NULL,
  `c_business_licence` varchar(50) NOT NULL,
  `c_user` int(10) NOT NULL,
  `c_time` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `c_group` int(10) NOT NULL,
  `c_memo` varchar(255) NOT NULL,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `PK_T_SUPPLIER` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `t_supplier` WRITE;
/*!40000 ALTER TABLE `t_supplier` DISABLE KEYS */;

INSERT INTO `t_supplier` (`c_id`, `c_no`, `c_name`, `c_address`, `c_status`, `c_industry`, `c_linkman`, `c_phone`, `c_mobile`, `c_fax`, `c_zip`, `c_email`, `c_bank_account`, `c_bank_code`, `c_registration_taxnum`, `c_vat`, `c_province`, `c_city`, `c_country`, `c_legal_person`, `c_discount`, `c_class`, `c_registered_trademark`, `c_business_licence`, `c_user`, `c_time`, `c_group`, `c_memo`)
VALUES
	(1,'0101','建筑砂石供应商一','',0,786,'','','','','','','','','','','-1','-1','-1','',0.0,769,'','',1,'2017-12-06 22:55:51.000000',2,''),
	(2,'0102','建筑材料供应商','',0,786,'','','','','','','','','','','150000','150400','150421','',0.0,769,'','',1,'2017-12-06 15:23:26.000000',2,'');

/*!40000 ALTER TABLE `t_supplier` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table vw_docu_list
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_docu_list`;

CREATE TABLE `vw_docu_list` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_no` VARCHAR(20) NOT NULL,
   `c_type` INT(10) NOT NULL,
   `c_way` INT(10) NOT NULL,
   `c_customer` INT(10) NOT NULL,
   `c_supplier` INT(10) NOT NULL,
   `c_stock` INT(10) NOT NULL,
   `c_type_from` INT(10) NOT NULL,
   `c_manager` INT(10) NOT NULL,
   `c_salesman` INT(10) NOT NULL,
   `c_jizhang` INT(10) NOT NULL,
   `c_baoguan` INT(10) NOT NULL,
   `c_user` INT(10) NOT NULL,
   `c_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_dept` INT(10) NOT NULL,
   `c_status` INT(10) NOT NULL,
   `c_memo` VARCHAR(255) NOT NULL,
   `c_is_back` BIT(1) NOT NULL,
   `c_group` INT(10) NOT NULL,
   `c_appr_people` INT(10) NOT NULL,
   `c_appr_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_no_from` VARCHAR(20) NULL DEFAULT NULL,
   `c_kp_type` INT(10) NOT NULL,
   `c_act` INT(10) NOT NULL,
   `c_goods` INT(10) NULL DEFAULT NULL,
   `c_ucode` VARCHAR(50) NULL DEFAULT NULL,
   `c_name` VARCHAR(255) NULL DEFAULT NULL,
   `c_desc` VARCHAR(255) NULL DEFAULT NULL,
   `c_unit` INT(10) NULL DEFAULT NULL,
   `c_class` INT(10) NULL DEFAULT NULL,
   `c_pic` VARCHAR(255) NULL DEFAULT NULL,
   `c_qty` DECIMAL(8) NULL DEFAULT NULL,
   `c_tax` DECIMAL(5) NULL DEFAULT NULL,
   `c_price` DECIMAL(12) NULL DEFAULT NULL,
   `c_price_tax` DECIMAL(12) NULL DEFAULT NULL,
   `c_amt` DECIMAL(18) NULL DEFAULT NULL,
   `c_amt_tax` DECIMAL(18) NULL DEFAULT NULL,
   `c_price_out` DECIMAL(12) NULL DEFAULT NULL,
   `c_price_out_tax` DECIMAL(12) NULL DEFAULT NULL,
   `c_amt_out` DECIMAL(18) NULL DEFAULT NULL,
   `c_amt_out_tax` DECIMAL(18) NULL DEFAULT NULL,
   `c_close` BIT(1) NULL DEFAULT NULL,
   `c_qty_kp` DECIMAL(8) NULL DEFAULT NULL,
   `c_rec_from` INT(10) NULL DEFAULT NULL,
   `c_no_order` VARCHAR(20) NULL DEFAULT NULL,
   `c_pay_type` INT(10) NOT NULL,
   `c_stock_to` INT(10) NOT NULL,
   `bill_no` VARCHAR(20) NOT NULL,
   `rec_id` INT(10) NULL DEFAULT '0',
   `c_period` INT(10) NOT NULL,
   `c_qty_stock` DECIMAL(8) NULL DEFAULT NULL,
   `c_qty_from` DECIMAL(8) NULL DEFAULT NULL,
   `c_qty_to` DECIMAL(8) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table vw_docu_rec
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_docu_rec`;

CREATE TABLE `vw_docu_rec` (
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_pic` VARCHAR(255) NOT NULL,
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_docu` INT(10) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_qty` DECIMAL(8) NOT NULL,
   `c_price` DECIMAL(12) NOT NULL,
   `c_price_tax` DECIMAL(12) NOT NULL,
   `c_tax` DECIMAL(5) NOT NULL,
   `c_amt` DECIMAL(18) NOT NULL,
   `c_amt_tax` DECIMAL(18) NOT NULL,
   `c_memo` VARCHAR(255) NOT NULL,
   `c_price_out` DECIMAL(12) NOT NULL,
   `c_price_out_tax` DECIMAL(12) NOT NULL,
   `c_amt_out` DECIMAL(18) NOT NULL,
   `c_amt_out_tax` DECIMAL(18) NOT NULL,
   `c_qty_from` DECIMAL(8) NOT NULL,
   `c_qty_to` DECIMAL(8) NOT NULL,
   `c_qty_stock` DECIMAL(8) NOT NULL,
   `c_rec_from` INT(10) NOT NULL,
   `c_no_from` VARCHAR(20) NOT NULL,
   `c_no_order` VARCHAR(20) NOT NULL,
   `c_qty_kp` DECIMAL(8) NOT NULL,
   `c_close` BIT(1) NOT NULL,
   `c_supplier` INT(10) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_order_apply_list
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_order_apply_list`;

CREATE TABLE `vw_order_apply_list` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_no` VARCHAR(20) NOT NULL,
   `c_dept` INT(10) NOT NULL,
   `c_way` INT(10) NOT NULL,
   `c_appr_money` FLOAT NULL DEFAULT NULL,
   `c_appr_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_applicant` INT(10) NOT NULL,
   `c_applicat_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_group` INT(10) NOT NULL,
   `c_user` INT(10) NOT NULL DEFAULT '1',
   `c_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_memo` VARCHAR(255) NOT NULL,
   `rec_id` INT(10) NOT NULL DEFAULT '0',
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_pic` VARCHAR(255) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_qty` DECIMAL(8) NOT NULL,
   `c_qty_to` DECIMAL(8) NOT NULL,
   `c_close` BIT(1) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_order_apply_rec
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_order_apply_rec`;

CREATE TABLE `vw_order_apply_rec` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_order_apply` INT(10) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_qty` DECIMAL(8) NOT NULL,
   `c_use` VARCHAR(255) NOT NULL,
   `c_supplier` INT(10) NOT NULL,
   `c_time_arrive` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_close` BIT(1) NOT NULL,
   `c_qty_to` DECIMAL(8) NOT NULL,
   `c_memo` VARCHAR(255) NOT NULL,
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_pic` VARCHAR(255) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_order_list
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_order_list`;

CREATE TABLE `vw_order_list` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_no` VARCHAR(20) NOT NULL,
   `c_type` INT(10) NULL DEFAULT NULL,
   `c_way` INT(10) NULL DEFAULT NULL,
   `c_supplier` INT(10) NOT NULL,
   `c_type_from` INT(10) NULL DEFAULT NULL,
   `c_addr_delivery` INT(10) NOT NULL,
   `c_consignee` VARCHAR(50) NOT NULL,
   `c_cash_type` INT(10) NOT NULL,
   `c_currency` INT(10) NULL DEFAULT NULL,
   `c_exchange_rate` DECIMAL(5) NULL DEFAULT NULL,
   `c_manager` INT(10) NULL DEFAULT NULL,
   `c_salesman` INT(10) NULL DEFAULT NULL,
   `c_user` INT(10) NOT NULL,
   `c_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_dept` INT(10) NOT NULL,
   `c_memo` VARCHAR(255) NULL DEFAULT NULL,
   `c_is_back` BIT(1) NULL DEFAULT NULL,
   `c_group` INT(10) NULL DEFAULT NULL,
   `c_appr_people` INT(10) NULL DEFAULT NULL,
   `c_appr_time` TIMESTAMP(6) NULL DEFAULT NULL,
   `c_no_from` VARCHAR(20) NULL DEFAULT NULL,
   `c_no_order` VARCHAR(20) NULL DEFAULT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_pic` VARCHAR(255) NOT NULL,
   `c_qty` DECIMAL(8) NOT NULL,
   `c_amt` DECIMAL(12) NOT NULL,
   `c_amt_tax` DECIMAL(12) NOT NULL,
   `c_qty_stock` DECIMAL(8) NOT NULL,
   `c_date_delivery` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_price_tax` DECIMAL(12) NOT NULL,
   `c_close` BIT(1) NOT NULL,
   `c_qty_kp` DECIMAL(8) NOT NULL,
   `rec_id` INT(10) NOT NULL DEFAULT '0',
   `c_rec_from` INT(10) NOT NULL,
   `c_qty_to` DECIMAL(8) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_order_rec
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_order_rec`;

CREATE TABLE `vw_order_rec` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_order` INT(10) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_qty` DECIMAL(8) NOT NULL,
   `c_price` DECIMAL(12) NOT NULL,
   `c_price_tax` DECIMAL(12) NOT NULL,
   `c_discount` DECIMAL(5) NULL DEFAULT NULL,
   `c_tax` DECIMAL(5) NOT NULL,
   `c_date_delivery` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_memo` VARCHAR(255) NOT NULL,
   `c_qty_from` DECIMAL(8) NOT NULL,
   `c_qty_to` DECIMAL(8) NOT NULL,
   `c_rec_from` INT(10) NOT NULL,
   `c_no` VARCHAR(20) NOT NULL DEFAULT '',
   `c_qty_kp` DECIMAL(8) NOT NULL,
   `c_close` BIT(1) NOT NULL,
   `c_qty_stock` DECIMAL(8) NOT NULL,
   `c_is_pay` BIT(1) NOT NULL,
   `c_amt` DECIMAL(12) NOT NULL,
   `c_amt_tax` DECIMAL(12) NOT NULL,
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_pic` VARCHAR(255) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_pay_list
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_pay_list`;

CREATE TABLE `vw_pay_list` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_no` VARCHAR(20) NOT NULL,
   `c_type` INT(10) NOT NULL,
   `c_pay_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_supplier` INT(10) NOT NULL,
   `c_amt_should` DECIMAL(12) NOT NULL,
   `c_amt_actual` DECIMAL(12) NOT NULL,
   `c_way` INT(10) NOT NULL,
   `c_pay_type` INT(10) NOT NULL,
   `c_manager` INT(10) NOT NULL,
   `c_salesman` INT(10) NOT NULL,
   `c_jizhang` INT(10) NOT NULL,
   `c_dept` INT(10) NOT NULL,
   `c_status` INT(10) NOT NULL,
   `c_appr_people` INT(10) NOT NULL,
   `c_appr_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_no_order` VARCHAR(255) NOT NULL,
   `c_no_order2` VARCHAR(255) NOT NULL,
   `c_user` INT(10) NOT NULL,
   `c_time` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_memo` VARCHAR(255) NOT NULL,
   `c_group` INT(10) NOT NULL,
   `c_act` INT(10) NULL DEFAULT NULL,
   `rec_id` INT(10) NOT NULL DEFAULT '0',
   `c_goods` INT(10) NOT NULL,
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_id_order` VARCHAR(20) NOT NULL,
   `c_id_bill` DECIMAL(8) NOT NULL,
   `c_no_bill` VARCHAR(20) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_pay_rec
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_pay_rec`;

CREATE TABLE `vw_pay_rec` (
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_pay` INT(10) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_id_order` VARCHAR(20) NOT NULL,
   `c_id_bill` DECIMAL(8) NOT NULL,
   `c_no_bill` VARCHAR(20) NOT NULL,
   `c_amt_should` DECIMAL(12) NOT NULL,
   `c_amt_actual` DECIMAL(12) NOT NULL,
   `c_memo` VARCHAR(255) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_period_class
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_period_class`;

CREATE TABLE `vw_period_class` (
   `c_id` DECIMAL(40) NULL DEFAULT NULL,
   `c_end` DECIMAL(40) NULL DEFAULT NULL,
   `c_in` DECIMAL(40) NULL DEFAULT NULL,
   `c_out` DECIMAL(40) NULL DEFAULT NULL,
   `c_period_ucode` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_period_class_goods
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_period_class_goods`;

CREATE TABLE `vw_period_class_goods` (
   `c_id` INT(10) NOT NULL,
   `c_period_ucode` INT(10) NOT NULL,
   `c_stock` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_begin_qty` DECIMAL(30) NULL DEFAULT NULL,
   `c_begin` DECIMAL(40) NULL DEFAULT NULL,
   `c_in_qty` DECIMAL(30) NULL DEFAULT NULL,
   `c_in` DECIMAL(40) NULL DEFAULT NULL,
   `c_out_qty` DECIMAL(30) NULL DEFAULT NULL,
   `c_out` DECIMAL(40) NULL DEFAULT NULL,
   `c_end_qty` DECIMAL(30) NULL DEFAULT NULL,
   `c_end` DECIMAL(40) NULL DEFAULT NULL
) ENGINE=MyISAM;



# Dump of table vw_period_goods
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_period_goods`;

CREATE TABLE `vw_period_goods` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_period` INT(10) NOT NULL,
   `c_stock` INT(10) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_begin` DECIMAL(18) NOT NULL,
   `c_begin_qty` DECIMAL(8) NOT NULL,
   `c_begin_price` DECIMAL(12) NOT NULL,
   `c_in_qty` DECIMAL(8) NOT NULL,
   `c_in_price` DECIMAL(12) NOT NULL,
   `c_in` DECIMAL(18) NOT NULL,
   `c_out_qty` DECIMAL(8) NOT NULL,
   `c_out_price` DECIMAL(12) NOT NULL,
   `c_out` DECIMAL(18) NOT NULL,
   `c_end_qty` DECIMAL(8) NOT NULL,
   `c_end_price` DECIMAL(12) NOT NULL,
   `c_end_qty_calc` DECIMAL(8) NOT NULL,
   `c_end` DECIMAL(18) NOT NULL,
   `c_memo` VARCHAR(255) NOT NULL,
   `c_period_ucode` INT(10) NOT NULL,
   `c_time_begin` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_time_end` TIMESTAMP(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_group` INT(10) NOT NULL,
   `c_status` INT(10) NOT NULL
) ENGINE=MyISAM;



# Dump of table vw_stock_goods
# ------------------------------------------------------------

DROP VIEW IF EXISTS `vw_stock_goods`;

CREATE TABLE `vw_stock_goods` (
   `c_id` INT(10) NOT NULL DEFAULT '0',
   `c_stock` INT(10) NOT NULL,
   `c_goods` INT(10) NOT NULL,
   `c_qty` DECIMAL(8) NOT NULL,
   `c_qty_way` DECIMAL(8) NULL DEFAULT NULL,
   `c_qty_min` DECIMAL(8) NOT NULL,
   `c_qty_max` DECIMAL(8) NOT NULL,
   `c_memo` VARCHAR(255) NOT NULL,
   `c_group` INT(10) NOT NULL,
   `c_ucode` VARCHAR(50) NOT NULL,
   `c_name` VARCHAR(255) NOT NULL,
   `c_desc` VARCHAR(255) NOT NULL,
   `c_unit` INT(10) NOT NULL,
   `c_class` INT(10) NOT NULL,
   `c_price` DECIMAL(12) NOT NULL,
   `c_goods_status` INT(10) NULL DEFAULT NULL
) ENGINE=MyISAM;





# Replace placeholder table for vw_order_apply_rec with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_order_apply_rec`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_order_apply_rec`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_order_apply` AS `c_order_apply`,
   `a`.`c_goods` AS `c_goods`,
   `a`.`c_qty` AS `c_qty`,
   `a`.`c_use` AS `c_use`,
   `a`.`c_supplier` AS `c_supplier`,
   `a`.`c_time_arrive` AS `c_time_arrive`,
   `a`.`c_close` AS `c_close`,
   `a`.`c_qty_to` AS `c_qty_to`,
   `a`.`c_memo` AS `c_memo`,
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_pic` AS `c_pic`,
   `b`.`c_unit` AS `c_unit`,
   `b`.`c_class` AS `c_class`
FROM (`t_order_apply_rec` `a` join `t_goods` `b`) where (`a`.`c_goods` = `b`.`c_id`);


# Replace placeholder table for vw_period_class_goods with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_period_class_goods`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_period_class_goods`
AS SELECT
   `vw_period_goods`.`c_period` AS `c_id`,
   `vw_period_goods`.`c_period_ucode` AS `c_period_ucode`,
   `vw_period_goods`.`c_stock` AS `c_stock`,
   `vw_period_goods`.`c_class` AS `c_class`,sum(`vw_period_goods`.`c_begin_qty`) AS `c_begin_qty`,sum(`vw_period_goods`.`c_begin`) AS `c_begin`,sum(`vw_period_goods`.`c_in_qty`) AS `c_in_qty`,sum(`vw_period_goods`.`c_in`) AS `c_in`,sum(`vw_period_goods`.`c_out_qty`) AS `c_out_qty`,sum(`vw_period_goods`.`c_out`) AS `c_out`,sum(`vw_period_goods`.`c_end_qty`) AS `c_end_qty`,sum(`vw_period_goods`.`c_end`) AS `c_end`
FROM `vw_period_goods` group by `vw_period_goods`.`c_class`,`vw_period_goods`.`c_period_ucode`,`vw_period_goods`.`c_stock`,`vw_period_goods`.`c_period`;


# Replace placeholder table for vw_order_rec with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_order_rec`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_order_rec`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_order` AS `c_order`,
   `a`.`c_goods` AS `c_goods`,
   `a`.`c_unit` AS `c_unit`,
   `a`.`c_qty` AS `c_qty`,
   `a`.`c_price` AS `c_price`,
   `a`.`c_price_tax` AS `c_price_tax`,
   `a`.`c_discount` AS `c_discount`,
   `a`.`c_tax` AS `c_tax`,
   `a`.`c_date_delivery` AS `c_date_delivery`,
   `a`.`c_memo` AS `c_memo`,
   `a`.`c_qty_from` AS `c_qty_from`,
   `a`.`c_qty_to` AS `c_qty_to`,
   `a`.`c_rec_from` AS `c_rec_from`,
   `a`.`c_no` AS `c_no`,
   `a`.`c_qty_kp` AS `c_qty_kp`,
   `a`.`c_close` AS `c_close`,
   `a`.`c_qty_stock` AS `c_qty_stock`,
   `a`.`c_is_pay` AS `c_is_pay`,
   `a`.`c_amt` AS `c_amt`,
   `a`.`c_amt_tax` AS `c_amt_tax`,
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_pic` AS `c_pic`
FROM (`t_order_rec` `a` join `t_goods` `b`) where (`a`.`c_goods` = `b`.`c_id`);


# Replace placeholder table for vw_pay_rec with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_pay_rec`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_pay_rec`
AS SELECT
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_unit` AS `c_unit`,
   `a`.`c_id` AS `c_id`,
   `a`.`c_pay` AS `c_pay`,
   `a`.`c_goods` AS `c_goods`,
   `a`.`c_id_order` AS `c_id_order`,
   `a`.`c_id_bill` AS `c_id_bill`,
   `a`.`c_no_bill` AS `c_no_bill`,
   `a`.`c_amt_should` AS `c_amt_should`,
   `a`.`c_amt_actual` AS `c_amt_actual`,
   `a`.`c_memo` AS `c_memo`
FROM (`t_pay_rec` `a` join `t_goods` `b` on((`a`.`c_goods` = `b`.`c_id`)));


# Replace placeholder table for vw_stock_goods with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_stock_goods`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_stock_goods`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_stock` AS `c_stock`,
   `a`.`c_goods` AS `c_goods`,
   `a`.`c_qty` AS `c_qty`,
   `a`.`c_qty_way` AS `c_qty_way`,
   `a`.`c_qty_min` AS `c_qty_min`,
   `a`.`c_qty_max` AS `c_qty_max`,
   `a`.`c_memo` AS `c_memo`,
   `a`.`c_group` AS `c_group`,
   `c`.`c_ucode` AS `c_ucode`,
   `c`.`c_name` AS `c_name`,
   `c`.`c_desc` AS `c_desc`,
   `c`.`c_unit` AS `c_unit`,
   `c`.`c_class` AS `c_class`,
   `a`.`c_price` AS `c_price`,
   `a`.`c_goods_status` AS `c_goods_status`
FROM (`t_stock_goods` `a` join `t_goods` `c` on((`a`.`c_goods` = `c`.`c_id`))) where (`c`.`c_type` = 0);


# Replace placeholder table for vw_period_class with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_period_class`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_period_class`
AS SELECT
   sum(`vw_period_goods`.`c_begin`) AS `c_id`,sum(`vw_period_goods`.`c_end`) AS `c_end`,sum(`vw_period_goods`.`c_in`) AS `c_in`,sum(`vw_period_goods`.`c_out`) AS `c_out`,
   `vw_period_goods`.`c_period_ucode` AS `c_period_ucode`,
   `vw_period_goods`.`c_class` AS `c_class`
FROM `vw_period_goods` group by `vw_period_goods`.`c_period_ucode`,`vw_period_goods`.`c_class`;


# Replace placeholder table for vw_pay_list with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_pay_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_pay_list`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_no` AS `c_no`,
   `a`.`c_type` AS `c_type`,
   `a`.`c_pay_time` AS `c_pay_time`,
   `a`.`c_supplier` AS `c_supplier`,
   `a`.`c_amt_should` AS `c_amt_should`,
   `a`.`c_amt_actual` AS `c_amt_actual`,
   `a`.`c_way` AS `c_way`,
   `a`.`c_pay_type` AS `c_pay_type`,
   `a`.`c_manager` AS `c_manager`,
   `a`.`c_salesman` AS `c_salesman`,
   `a`.`c_jizhang` AS `c_jizhang`,
   `a`.`c_dept` AS `c_dept`,
   `a`.`c_status` AS `c_status`,
   `a`.`c_appr_people` AS `c_appr_people`,
   `a`.`c_appr_time` AS `c_appr_time`,
   `a`.`c_no_order` AS `c_no_order`,
   `a`.`c_no_order2` AS `c_no_order2`,
   `a`.`c_user` AS `c_user`,
   `a`.`c_time` AS `c_time`,
   `a`.`c_memo` AS `c_memo`,
   `a`.`c_group` AS `c_group`,
   `a`.`c_act` AS `c_act`,
   `b`.`c_id` AS `rec_id`,
   `b`.`c_goods` AS `c_goods`,
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_unit` AS `c_unit`,
   `b`.`c_id_order` AS `c_id_order`,
   `b`.`c_id_bill` AS `c_id_bill`,
   `b`.`c_no_bill` AS `c_no_bill`
FROM (`t_pay` `a` join `vw_pay_rec` `b` on((`a`.`c_id` = `b`.`c_pay`)));


# Replace placeholder table for vw_order_list with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_order_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_order_list`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_no` AS `c_no`,
   `a`.`c_type` AS `c_type`,
   `a`.`c_way` AS `c_way`,
   `a`.`c_supplier` AS `c_supplier`,
   `a`.`c_type_from` AS `c_type_from`,
   `a`.`c_addr_delivery` AS `c_addr_delivery`,
   `a`.`c_consignee` AS `c_consignee`,
   `a`.`c_cash_type` AS `c_cash_type`,
   `a`.`c_currency` AS `c_currency`,
   `a`.`c_exchange_rate` AS `c_exchange_rate`,
   `a`.`c_manager` AS `c_manager`,
   `a`.`c_salesman` AS `c_salesman`,
   `a`.`c_user` AS `c_user`,
   `a`.`c_time` AS `c_time`,
   `a`.`c_dept` AS `c_dept`,
   `a`.`c_memo` AS `c_memo`,
   `a`.`c_is_back` AS `c_is_back`,
   `a`.`c_group` AS `c_group`,
   `a`.`c_appr_people` AS `c_appr_people`,
   `a`.`c_appr_time` AS `c_appr_time`,
   `a`.`c_no_from` AS `c_no_from`,
   `a`.`c_no_order` AS `c_no_order`,
   `b`.`c_goods` AS `c_goods`,
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_unit` AS `c_unit`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_pic` AS `c_pic`,
   `b`.`c_qty` AS `c_qty`,
   `b`.`c_amt` AS `c_amt`,
   `b`.`c_amt_tax` AS `c_amt_tax`,
   `b`.`c_qty_stock` AS `c_qty_stock`,
   `b`.`c_date_delivery` AS `c_date_delivery`,
   `b`.`c_price_tax` AS `c_price_tax`,
   `b`.`c_close` AS `c_close`,
   `b`.`c_qty_kp` AS `c_qty_kp`,
   `b`.`c_id` AS `rec_id`,
   `b`.`c_rec_from` AS `c_rec_from`,
   `b`.`c_qty_to` AS `c_qty_to`
FROM (`t_order` `a` join `vw_order_rec` `b` on((`a`.`c_id` = `b`.`c_order`)));


# Replace placeholder table for vw_docu_list with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_docu_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_docu_list`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_no` AS `c_no`,
   `a`.`c_type` AS `c_type`,
   `a`.`c_way` AS `c_way`,
   `a`.`c_supplier` AS `c_customer`,
   `a`.`c_supplier` AS `c_supplier`,
   `a`.`c_stock` AS `c_stock`,
   `a`.`c_type_from` AS `c_type_from`,
   `a`.`c_manager` AS `c_manager`,
   `a`.`c_salesman` AS `c_salesman`,
   `a`.`c_jizhang` AS `c_jizhang`,
   `a`.`c_baoguan` AS `c_baoguan`,
   `a`.`c_user` AS `c_user`,
   `a`.`c_time` AS `c_time`,
   `a`.`c_dept` AS `c_dept`,
   `a`.`c_status` AS `c_status`,
   `a`.`c_memo` AS `c_memo`,
   `a`.`c_is_back` AS `c_is_back`,
   `a`.`c_group` AS `c_group`,
   `a`.`c_appr_people` AS `c_appr_people`,
   `a`.`c_appr_time` AS `c_appr_time`,
   `b`.`c_no_from` AS `c_no_from`,
   `a`.`c_kp_type` AS `c_kp_type`,
   `a`.`c_act` AS `c_act`,
   `b`.`c_goods` AS `c_goods`,
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_unit` AS `c_unit`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_pic` AS `c_pic`,
   `b`.`c_qty` AS `c_qty`,
   `b`.`c_tax` AS `c_tax`,
   `b`.`c_price` AS `c_price`,
   `b`.`c_price_tax` AS `c_price_tax`,
   `b`.`c_amt` AS `c_amt`,
   `b`.`c_amt_tax` AS `c_amt_tax`,
   `b`.`c_price_out` AS `c_price_out`,
   `b`.`c_price_out_tax` AS `c_price_out_tax`,
   `b`.`c_amt_out` AS `c_amt_out`,
   `b`.`c_amt_out_tax` AS `c_amt_out_tax`,
   `b`.`c_close` AS `c_close`,
   `b`.`c_qty_kp` AS `c_qty_kp`,
   `b`.`c_rec_from` AS `c_rec_from`,
   `b`.`c_no_order` AS `c_no_order`,
   `a`.`c_pay_type` AS `c_pay_type`,
   `a`.`c_stock_to` AS `c_stock_to`,
   `a`.`c_no_from` AS `bill_no`,
   `b`.`c_id` AS `rec_id`,
   `a`.`c_period` AS `c_period`,
   `b`.`c_qty_stock` AS `c_qty_stock`,
   `b`.`c_qty_from` AS `c_qty_from`,
   `b`.`c_qty_to` AS `c_qty_to`
FROM (`t_docu` `a` left join `vw_docu_rec` `b` on((`a`.`c_id` = `b`.`c_docu`)));


# Replace placeholder table for vw_order_apply_list with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_order_apply_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_order_apply_list`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_no` AS `c_no`,
   `a`.`c_dept` AS `c_dept`,
   `a`.`c_way` AS `c_way`,
   `a`.`c_appr_money` AS `c_appr_money`,
   `a`.`c_appr_time` AS `c_appr_time`,
   `a`.`c_applicant` AS `c_applicant`,
   `a`.`c_applicat_time` AS `c_applicat_time`,
   `a`.`c_group` AS `c_group`,
   `a`.`c_user` AS `c_user`,
   `a`.`c_time` AS `c_time`,
   `a`.`c_memo` AS `c_memo`,
   `b`.`c_id` AS `rec_id`,
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_unit` AS `c_unit`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_pic` AS `c_pic`,
   `b`.`c_goods` AS `c_goods`,
   `b`.`c_qty` AS `c_qty`,
   `b`.`c_qty_to` AS `c_qty_to`,
   `b`.`c_close` AS `c_close`
FROM (`t_order_apply` `a` join `vw_order_apply_rec` `b`) where (`a`.`c_id` = `b`.`c_order_apply`);


# Replace placeholder table for vw_period_goods with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_period_goods`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_period_goods`
AS SELECT
   `a`.`c_id` AS `c_id`,
   `a`.`c_period` AS `c_period`,
   `a`.`c_stock` AS `c_stock`,
   `a`.`c_goods` AS `c_goods`,
   `a`.`c_begin` AS `c_begin`,
   `a`.`c_begin_qty` AS `c_begin_qty`,
   `a`.`c_begin_price` AS `c_begin_price`,
   `a`.`c_in_qty` AS `c_in_qty`,
   `a`.`c_in_price` AS `c_in_price`,
   `a`.`c_in` AS `c_in`,
   `a`.`c_out_qty` AS `c_out_qty`,
   `a`.`c_out_price` AS `c_out_price`,
   `a`.`c_out` AS `c_out`,
   `a`.`c_end_qty` AS `c_end_qty`,
   `a`.`c_end_price` AS `c_end_price`,
   `a`.`c_end_qty_calc` AS `c_end_qty_calc`,
   `a`.`c_end` AS `c_end`,
   `a`.`c_memo` AS `c_memo`,
   `d`.`c_period_ucode` AS `c_period_ucode`,
   `d`.`c_time_begin` AS `c_time_begin`,
   `d`.`c_time_end` AS `c_time_end`,
   `c`.`c_ucode` AS `c_ucode`,
   `c`.`c_name` AS `c_name`,
   `c`.`c_desc` AS `c_desc`,
   `c`.`c_unit` AS `c_unit`,
   `c`.`c_class` AS `c_class`,
   `d`.`c_group` AS `c_group`,
   `d`.`c_status` AS `c_status`
FROM ((`t_period_goods` `a` join `t_goods` `c`) join `t_period` `d`) where ((`a`.`c_goods` = `c`.`c_id`) and (`a`.`c_period` = `d`.`c_id`) and (`c`.`c_type` = 0) and (`d`.`c_status` <> -(1)));


# Replace placeholder table for vw_docu_rec with correct view syntax
# ------------------------------------------------------------

DROP TABLE `vw_docu_rec`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_docu_rec`
AS SELECT
   `b`.`c_ucode` AS `c_ucode`,
   `b`.`c_name` AS `c_name`,
   `b`.`c_desc` AS `c_desc`,
   `b`.`c_class` AS `c_class`,
   `b`.`c_pic` AS `c_pic`,
   `a`.`c_id` AS `c_id`,
   `a`.`c_docu` AS `c_docu`,
   `a`.`c_goods` AS `c_goods`,
   `a`.`c_unit` AS `c_unit`,
   `a`.`c_qty` AS `c_qty`,
   `a`.`c_price` AS `c_price`,
   `a`.`c_price_tax` AS `c_price_tax`,
   `a`.`c_tax` AS `c_tax`,
   `a`.`c_amt` AS `c_amt`,
   `a`.`c_amt_tax` AS `c_amt_tax`,
   `a`.`c_memo` AS `c_memo`,
   `a`.`c_price_out` AS `c_price_out`,
   `a`.`c_price_out_tax` AS `c_price_out_tax`,
   `a`.`c_amt_out` AS `c_amt_out`,
   `a`.`c_amt_out_tax` AS `c_amt_out_tax`,
   `a`.`c_qty_from` AS `c_qty_from`,
   `a`.`c_qty_to` AS `c_qty_to`,
   `a`.`c_qty_stock` AS `c_qty_stock`,
   `a`.`c_rec_from` AS `c_rec_from`,
   `a`.`c_no_from` AS `c_no_from`,
   `a`.`c_no_order` AS `c_no_order`,
   `a`.`c_qty_kp` AS `c_qty_kp`,
   `a`.`c_close` AS `c_close`,
   `a`.`c_supplier` AS `c_supplier`
FROM (`t_docu_rec` `a` join `t_goods` `b` on((`a`.`c_goods` = `b`.`c_id`)));

--
-- Dumping routines (PROCEDURE) for database 'nanchang_docu'
--
DELIMITER ;;

# Dump of PROCEDURE p_docu_rec_qty_from_calc
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `p_docu_rec_qty_from_calc` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `p_docu_rec_qty_from_calc`(IN modulename varchar(20), in id int, in isDel int)
BEGIN
    #重新计算来源数量，设置是否关闭的标记
	declare sum_qty decimal(8,3) default 0;
	declare id_from	int;
	declare id_from_order int;
	declare docu_type	int;
	select id_from=c_rec_from,docu_type=c_type from vw_docu_list where rec_id=id;
	delete from t_docu_rec where c_id=id and isDel=1;
		
	select sum(c_qty) into sum_qty from vw_docu_list 
		where c_rec_from= id_from and c_type= docu_type and c_status >0;
	#原DocuArrive,现在跳过了收料单，直接从订单到外购入库单
	if modulename='DocuCheck' then
		update t_order_rec set c_close=(case when @sum_qty>=c_qty then 1 else 0 end),c_qty_to= sum_qty where c_id =id_from;
	elseif modulename='DocuBill' then
		update t_docu_rec set c_qty_kp= sum_qty where c_id =id_from;
		select c_rec_from into id_from_order from t_docu_rec where c_id=id_from;
		select sum(c_qty_kp) into sum_qty from vw_docu_list 
			where c_rec_from=id_from_order and c_type=807 and c_status >0;
		update t_order_rec set c_qty_kp=sum_qty where c_id=id_from_order;
	else
		update t_docu_rec set c_close=(case when sum_qty>=c_qty then 1 else 0 end),c_qty_to=sum_qty where c_id =id_from;
	end if;

END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE p_order_rec_qty_from_calc
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `p_order_rec_qty_from_calc` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `p_order_rec_qty_from_calc`(in id int, in is_del int, in is_back int)
BEGIN
    #重新计算来源数量，设置是否关闭的标记
	declare id_from int;
	declare sum_qty decimal(8,3) default 0;
	select  c_rec_from into id_from from t_order_rec where c_id= id;
	delete from t_order_rec where c_id= id and  is_del=1;

	select  sum(c_qty) into sum_qty from t_order_rec A,t_order B 
		where A.c_order=B.c_id and A.c_rec_from= id_from and B.c_status >0
			and ifnull(B.c_is_back,0)= is_back;
			
	if is_back=1 then
		update t_docu_rec set c_close=0,c_qty_to= sum_qty where c_id = id_from;
	else
		update t_order_apply_rec set c_close=0,c_qty_to= sum_qty where c_id = id_from;
	end if;

END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE p_period_amt_calc
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `p_period_amt_calc` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `p_period_amt_calc`(in period_id int)
BEGIN
    #计算某个期次的合计数金额
	select @sum_begin:=sum(c_begin), @sum_in :=sum(c_in), @sum_out :=sum(c_out), @sum_end :=sum(c_end) 
		from t_period_goods where c_period = period_id;
	update t_period set c_begin = @sum_begin,c_in = @sum_in,c_out = @sum_out,c_end = @sum_end
		where c_id = period_id;

END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE p_period_goods_calc
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `p_period_goods_calc` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `p_period_goods_calc`(IN period_id int, in stock_id int)
BEGIN
    #按期次仓库的库存结转
	declare last_period_id	int;
	declare time_begin	timestamp;
	declare time_end	timestamp;	
	select max(c_id) into last_period_id  from t_period where c_stock=@stock_id and c_status=1;
	select c_time_begin,c_time_end into time_begin,time_end from t_period where c_id = period_id;
	#删除当前期次的结转数据
	delete from t_period_goods where c_period= period_id;
	#加入当前所有物料
	insert t_period_goods(c_period,c_stock,c_goods, c_begin,c_begin_qty,c_begin_price,c_end,c_end_qty,c_end_price,c_in,c_in_qty,c_in_price,c_out,c_out_qty,c_out_price,c_memo)
		select period_id,stock_id, c_id, 0,0,0, 0,0,0, 0,0,0, 0,0,0, ''
		from t_goods where c_type=0 and c_status =0;
	
	#取上次该仓库的期次结转数据
	update t_period_goods inner join t_period_goods B
		on t_period_goods.c_stock=B.c_stock 
			and t_period_goods.c_goods=B.c_goods
		set c_begin =B.c_end, c_begin_price=ifnull(B.c_end_price,0), c_begin_qty = ifnull(B.c_end_qty,0)
        where t_period_goods.c_period= period_id;

	
	#统计物料的出入库数量
    CREATE TEMPORARY TABLE tmp_goods
	select c_goods, sum(case when (A.c_type in(807,808) and A.c_stock=stock_id ) or (A.c_type=1519 and A.c_stock_to=stock_id) then c_qty else 0 end) as qtyIn,
			sum(case when (A.c_type in(809,810,1519,1862) and A.c_stock=stock_id)  then c_qty else 0 end) as qtyOut
		from  t_docu A, t_docu_rec B 
		where A.c_id=B.c_docu and (c_stock=stock_id or c_stock_to=stock_id)  and c_status=836
			and A.c_time > time_begin and A.c_time <time_end
		group by c_goods;
	update t_period_goods inner join tmp_goods B
    on t_period_goods.c_goods=B.c_goods
        set c_in_qty=B.qtyIn,c_out_qty=B.qtyOut
		where c_period= period_id;
	update t_period_goods set c_begin_price=0 where c_begin_price is null and c_period= period_id;
	update t_period_goods set c_end_qty= c_begin_qty +c_in_qty -c_out_qty,c_end_price=c_begin_price,c_end= (c_begin_qty +c_in_qty -c_out_qty)*c_begin_price,
			c_end_qty_calc= c_begin_qty +c_in_qty -c_out_qty
		where c_period= period_id;
	#删除数量全为0的记录
	delete from t_period_goods where c_period= period_id and c_end_qty=0 and c_in_qty=0 and c_out_qty=0 and c_begin_qty=0
		and c_end=0 and c_in=0 and c_out=0 and c_begin=0;	
	
	#取物料的最新价格
	update t_period_goods inner join t_price_stock B
    on t_period_goods.c_goods=B.c_goods 
        set c_price=B.c_price
		where  B.c_stock= stock_id and t_period_goods.c_period= period_id;

	drop table tmp_goods;
	select period_id as period_id;

	#需要重新计算进价，加权平均法


END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE p_period_stock_goods_qty_calc
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `p_period_stock_goods_qty_calc` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `p_period_stock_goods_qty_calc`(IN period_id int)
BEGIN
    #根据某个期次重新计算当前库存
	#OrderApply: 1: '采购申请单',
	#Order: 2: '采购订单',
	#DocuArrive: 3: '到货通知单',
	#DocuCheck: 4: '外购入库单',
	#DocuSale: 5: '销售出库单',
	#DocuPick: 6: '领料出库单',
	#DocuStock: 7: '盘点单',
	#DocuTransfer: 8: '调拨单'
	declare begin_time timestamp;
	declare stock_id	int;
	declare group_id	int;
	select  c_time_end,c_stock into begin_time,stock_id from t_period where c_id=period_id;
	select c_group into group_id  from vw_stock where c_id=stock_id;
    create temporary table tmp_end
		select c_goods,c_end_qty 
			from t_period_goods 
			where c_period =period_id;
	create temporary table tmp_inout
		select c_goods, sum(c_qty *(case when (c_type in(4,7,8) and c_stock=stock_id ) then 1 
			when (c_type in(5,6) or (c_type=8 and c_stock_to=stock_id)) then -1 else 0 end )) as sumQty
			from vw_docu_list where c_time >begin_time and c_stock=stock_id 
				and c_status=1213 and ((c_type in(4,5,6,7,8) and c_stock=stock_id)or (c_type=8 and c_stock_to=stock_id))
			group by c_goods;
            
	#加上调入的库存	
    update tmp_end inner join tmp_inout
    on tmp_end.c_goods = tmp_inout.c_goods
    set c_end_qty = tmp_end.c_end_qty + tmp_inout.sumQty;

	insert tmp_end(c_goods,c_end_qty)
		select c_goods,sumQty
			from tmp_inout 
			where c_goods not in(select c_goods from tmp_end);
	
	#更新库存数量
	update t_stock_goods set c_qty=0 where c_stock=stock_id ;
	update t_stock_goods inner join tmp_end B
    on t_stock_goods.c_goods=B.c_goods and t_stock_goods.c_stock=stock_id
		set c_qty= c_end_qty;
	insert t_stock_goods(c_stock,c_goods,c_qty,c_qty_min,c_qty_max,c_memo,c_group)
		select stock_id,c_goods,c_end_qty, 0,0,'',group_id
		from tmp_end
		where c_goods not in(select c_goods from t_stock_goods where c_stock=stock_id);

END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
# Dump of PROCEDURE p_stock_goods_qty_calc
# ------------------------------------------------------------

/*!50003 DROP PROCEDURE IF EXISTS `p_stock_goods_qty_calc` */;;
/*!50003 SET SESSION SQL_MODE=""*/;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `p_stock_goods_qty_calc`(IN goods_id int, in stock_id int, in group_id int)
BEGIN
    #计算某个物料的当前库存，以最近的一个期次库存加上收发数量
    #OrderApply: 1: '采购申请单',
	#Order: 2: '采购订单',
	#DocuArrive: 3: '到货通知单',
	#DocuCheck: 4: '外购入库单',
	#DocuSale: 5: '销售出库单',
	#DocuPick: 6: '领料出库单',
	#DocuStock: 7: '盘点单',
	#DocuTransfer: 8: '调拨单'
	declare begin_time timestamp;
	declare begin_qty	decimal(12,3);
	declare sum_qty	decimal(12,3);
	select  c_end_qty,c_time_end into begin_qty,begin_time from vw_period_goods where c_goods=goods_id 
		and c_stock= stock_id and c_status=1 order by c_time_end desc limit 0,1;

	select sum(c_qty *(case when ((c_type =4 and c_stock=stock_id ) or (c_type=8 and c_stock_to=stock_id)) then 1 
										when (c_type in(5,6,8) and c_stock= stock_id) then -1 else 0 end ))
			into sum_qty
		from vw_docu_list where c_time >ifnull(begin_time,'2016-1-1') 
			and c_status =1213 and ((c_type in(4,5,6,8) and c_stock= stock_id) or (c_type = 8 and c_stock_to= stock_id)) 
			and c_goods= goods_id;
	#更新库存数量
	if exists(select * from t_stock_goods where c_stock= stock_id and c_goods= goods_id) then
		update t_stock_goods set c_qty=ifnull(begin_qty,0) +ifnull(sum_qty,0)
			where c_goods=goods_id and c_stock=stock_id;			
	else
		insert t_stock_goods(c_stock,c_goods,c_qty,c_group, c_qty_min,c_qty_max,c_price,c_user,c_time,c_memo)
			values( stock_id,goods_id,ifnull(begin_qty,0) +ifnull(sum_qty,0),group_id,  0,0,0,1,now(),'');
	end if;

	select begin_qty,sum_qty;

END */;;

/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
