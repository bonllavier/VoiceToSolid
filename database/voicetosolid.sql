/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : voicetosolid

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 14/10/2019 19:12:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_colors
-- ----------------------------
DROP TABLE IF EXISTS `tbl_colors`;
CREATE TABLE `tbl_colors` (
  `color_id` int(10) NOT NULL AUTO_INCREMENT,
  `color_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `color_hex_code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_colors
-- ----------------------------
BEGIN;
INSERT INTO `tbl_colors` VALUES (1, 'negro', '0x000000');
INSERT INTO `tbl_colors` VALUES (2, 'black', '0x000000');
INSERT INTO `tbl_colors` VALUES (3, 'blanco', '0xffffff');
INSERT INTO `tbl_colors` VALUES (4, 'white', '0xffffff');
INSERT INTO `tbl_colors` VALUES (5, 'amarillo', '0xf9d62e');
INSERT INTO `tbl_colors` VALUES (6, 'yellow', '0xf9d62e');
INSERT INTO `tbl_colors` VALUES (7, 'azul', '0x0000ff');
INSERT INTO `tbl_colors` VALUES (8, 'blue', '0x0000ff');
INSERT INTO `tbl_colors` VALUES (9, 'rojo', '0xff0000');
INSERT INTO `tbl_colors` VALUES (10, 'red', '0xff0000');
INSERT INTO `tbl_colors` VALUES (11, 'rosado', '0xffbdbd');
INSERT INTO `tbl_colors` VALUES (12, 'pink', '0xffbdbd');
INSERT INTO `tbl_colors` VALUES (13, 'naranja', '0xfc913a');
INSERT INTO `tbl_colors` VALUES (14, 'orange', '0xfc913a');
INSERT INTO `tbl_colors` VALUES (15, 'verde', '0x5cb85c');
INSERT INTO `tbl_colors` VALUES (16, 'green', '0x5cb85c');
INSERT INTO `tbl_colors` VALUES (17, 'gris', '0x9b9b9b');
INSERT INTO `tbl_colors` VALUES (18, 'gray', '0x9b9b9b');
COMMIT;

-- ----------------------------
-- Table structure for tbl_pieces
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pieces`;
CREATE TABLE `tbl_pieces` (
  `piece_id` int(10) NOT NULL AUTO_INCREMENT,
  `piece_name` varchar(100) DEFAULT NULL,
  `color_id` int(10) DEFAULT NULL,
  `shape_id` int(10) DEFAULT NULL,
  `project_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`piece_id`),
  KEY `color_id` (`color_id`),
  KEY `project_id` (`project_id`),
  KEY `shape_id` (`shape_id`),
  CONSTRAINT `color_id` FOREIGN KEY (`color_id`) REFERENCES `tbl_colors` (`color_id`) ON UPDATE RESTRICT,
  CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `tbl_projects` (`project_id`) ON UPDATE RESTRICT,
  CONSTRAINT `shape_id` FOREIGN KEY (`shape_id`) REFERENCES `tbl_shapes` (`shape_id`) ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for tbl_projects
-- ----------------------------
DROP TABLE IF EXISTS `tbl_projects`;
CREATE TABLE `tbl_projects` (
  `project_id` int(10) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for tbl_shapes
-- ----------------------------
DROP TABLE IF EXISTS `tbl_shapes`;
CREATE TABLE `tbl_shapes` (
  `shape_id` int(10) NOT NULL AUTO_INCREMENT,
  `shape_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`shape_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tbl_shapes
-- ----------------------------
BEGIN;
INSERT INTO `tbl_shapes` VALUES (1, 'triangulo');
INSERT INTO `tbl_shapes` VALUES (2, 'triangle');
INSERT INTO `tbl_shapes` VALUES (3, 'cuadrado');
INSERT INTO `tbl_shapes` VALUES (4, 'square');
INSERT INTO `tbl_shapes` VALUES (5, 'circulo');
INSERT INTO `tbl_shapes` VALUES (6, 'circle');
INSERT INTO `tbl_shapes` VALUES (7, 'rectangulo');
INSERT INTO `tbl_shapes` VALUES (8, 'rectangle');
INSERT INTO `tbl_shapes` VALUES (9, 'rombo');
INSERT INTO `tbl_shapes` VALUES (10, 'diamond');
INSERT INTO `tbl_shapes` VALUES (11, 'trapecio');
INSERT INTO `tbl_shapes` VALUES (12, 'trapeze');
INSERT INTO `tbl_shapes` VALUES (13, 'esfera');
INSERT INTO `tbl_shapes` VALUES (14, 'sphere');
INSERT INTO `tbl_shapes` VALUES (15, 'cubo');
INSERT INTO `tbl_shapes` VALUES (16, 'cube');
INSERT INTO `tbl_shapes` VALUES (17, 'cilindro');
INSERT INTO `tbl_shapes` VALUES (18, 'cylinder');
INSERT INTO `tbl_shapes` VALUES (19, 'piramide');
INSERT INTO `tbl_shapes` VALUES (20, 'pyramid');
INSERT INTO `tbl_shapes` VALUES (21, 'cono');
INSERT INTO `tbl_shapes` VALUES (22, 'cone');
COMMIT;

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
