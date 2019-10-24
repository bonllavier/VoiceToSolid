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

 Date: 23/10/2019 20:20:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_colors
-- ----------------------------
DROP TABLE IF EXISTS `tbl_colors`;
CREATE TABLE `tbl_colors`  (
  `color_id` int(10) NOT NULL AUTO_INCREMENT,
  `color_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `color_hex_code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`color_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_colors
-- ----------------------------
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

-- ----------------------------
-- Table structure for tbl_pieces
-- ----------------------------
DROP TABLE IF EXISTS `tbl_pieces`;
CREATE TABLE `tbl_pieces`  (
  `piece_id` int(10) NOT NULL AUTO_INCREMENT,
  `piece_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `color_id` int(10) NULL DEFAULT NULL,
  `shape_id` int(10) NULL DEFAULT NULL,
  `project_id` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`piece_id`) USING BTREE,
  INDEX `color_id`(`color_id`) USING BTREE,
  INDEX `project_id`(`project_id`) USING BTREE,
  INDEX `shape_id`(`shape_id`) USING BTREE,
  CONSTRAINT `color_id` FOREIGN KEY (`color_id`) REFERENCES `tbl_colors` (`color_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `tbl_projects` (`project_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shape_id` FOREIGN KEY (`shape_id`) REFERENCES `tbl_shapes` (`shape_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_projects
-- ----------------------------
DROP TABLE IF EXISTS `tbl_projects`;
CREATE TABLE `tbl_projects`  (
  `project_id` int(10) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`project_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_shapes
-- ----------------------------
DROP TABLE IF EXISTS `tbl_shapes`;
CREATE TABLE `tbl_shapes`  (
  `shape_id` int(10) NOT NULL AUTO_INCREMENT,
  `shape_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `command_three` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`shape_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_shapes
-- ----------------------------
INSERT INTO `tbl_shapes` VALUES (1, 'triangulo', 'new THREE.CircleGeometry(1, 3)\r\n');
INSERT INTO `tbl_shapes` VALUES (2, 'triangle', 'new THREE.CircleGeometry(1, 3)\r\n');
INSERT INTO `tbl_shapes` VALUES (3, 'cuadrado', 'new THREE.PlaneGeometry(1, 1)');
INSERT INTO `tbl_shapes` VALUES (4, 'square', 'new THREE.PlaneGeometry(1, 1)');
INSERT INTO `tbl_shapes` VALUES (5, 'circulo', 'new THREE.CircleGeometry(1, 32 )');
INSERT INTO `tbl_shapes` VALUES (6, 'circle', 'new THREE.CircleGeometry(1, 32 )');
INSERT INTO `tbl_shapes` VALUES (7, 'rectangulo', 'new THREE.PlaneGeometry(2, 1)');
INSERT INTO `tbl_shapes` VALUES (8, 'rectangle', 'new THREE.PlaneGeometry(2, 1)');
INSERT INTO `tbl_shapes` VALUES (9, 'esfera', 'new THREE.SphereGeometry(1, 32, 32 )');
INSERT INTO `tbl_shapes` VALUES (10, 'sphere', 'new THREE.SphereGeometry(1, 32, 32 )');
INSERT INTO `tbl_shapes` VALUES (11, 'cubo', 'new THREE.CubeGeometry(1, 1, 1)');
INSERT INTO `tbl_shapes` VALUES (12, 'cube', 'new THREE.CubeGeometry(1, 1, 1)');
INSERT INTO `tbl_shapes` VALUES (13, 'cilindro', 'new THREE.CylinderGeometry(1, 1, 1, 32 )');
INSERT INTO `tbl_shapes` VALUES (14, 'cylinder', 'new THREE.CylinderGeometry(1, 1, 1, 32 )');
INSERT INTO `tbl_shapes` VALUES (15, 'piramide', 'new THREE.ConeGeometry(1, 1, 4)');
INSERT INTO `tbl_shapes` VALUES (16, 'pyramid', 'new THREE.ConeGeometry(1, 1, 4)');
INSERT INTO `tbl_shapes` VALUES (17, 'cono', 'new THREE.ConeGeometry( 1, 1, 32 )');
INSERT INTO `tbl_shapes` VALUES (18, 'cone', 'new THREE.ConeGeometry( 1, 1, 32 )');

-- ----------------------------
-- Table structure for tbl_users
-- ----------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users`  (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `profile_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_users
-- ----------------------------
INSERT INTO `tbl_users` VALUES (1, 'javb92', '06cdb04e581fea56b81c7c87dacf1b1a2ad3be37', 'mentor37_@hotmail.com', NULL);
INSERT INTO `tbl_users` VALUES (3, 'xica', '632cdeaebae54ca430639ad137b917ef927c17', 'xica369@gmail.com', NULL);

SET FOREIGN_KEY_CHECKS = 1;
