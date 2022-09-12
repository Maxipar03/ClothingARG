-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para mydb
CREATE DATABASE IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;

-- Volcando estructura para tabla mydb.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.brand: ~6 rows (aproximadamente)
INSERT INTO `brand` (`id`, `name`) VALUES
	(1, 'Jordan'),
	(2, 'Nike'),
	(3, 'Adidas'),
	(4, 'Under Armour'),
	(5, 'Reebok'),
	(6, 'Converse');

-- Volcando estructura para tabla mydb.color
CREATE TABLE IF NOT EXISTS `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.color: ~6 rows (aproximadamente)
INSERT INTO `color` (`id`, `name`) VALUES
	(1, 'White'),
	(2, 'Black'),
	(3, 'Red'),
	(4, 'Blue'),
	(5, 'Grey'),
	(6, 'Yellow');

-- Volcando estructura para tabla mydb.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_images_products` (`product_id`),
  CONSTRAINT `FK_images_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.images: ~4 rows (aproximadamente)
INSERT INTO `images` (`id`, `url`, `product_id`) VALUES
	(1, 'https://sneakerbardetroit.com/wp-content/uploads/2022/02/Air-Jordan-1-Brotherhood-555088-706-Release-Date-1.jpeg', 1),
	(2, 'https://sneakerbardetroit.com/wp-content/uploads/2022/02/Air-Jordan-3-Cardinal-Red-CT8532-126-Release-Date-Price-4.jpeg', 2),
	(3, 'https://sneakerbardetroit.com/wp-content/uploads/2022/08/Air-Jordan-4-Thunder-2023.jpeg', 3),
	(4, 'https://sneakerbardetroit.com/wp-content/uploads/2022/09/Nike-Air-Force-1-Low-White-Grey-Blue-FB3360-100-Release-Date-4.jpeg', 4);

-- Volcando estructura para tabla mydb.material
CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.material: ~5 rows (aproximadamente)
INSERT INTO `material` (`id`, `name`) VALUES
	(1, 'Leather'),
	(2, 'Synthetic'),
	(3, 'Textile'),
	(4, 'Canvas'),
	(5, 'Rubber');

-- Volcando estructura para tabla mydb.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_products_brand` (`brand_id`),
  KEY `FK_products_material` (`material_id`),
  KEY `FK_products_color` (`color_id`),
  CONSTRAINT `FK_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_products_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_products_material` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.products: ~4 rows (aproximadamente)
INSERT INTO `products` (`id`, `name`, `price`, `description`, `brand_id`, `material_id`, `color_id`) VALUES
	(1, 'Jordan 1 High OG “Brotherhood”', 170, 'Dressed in a University Gold, Light Bordeaux, and White color scheme. This Air Jordan 1 features White leather side panels, nylon tongues, and midsole paired with Gold and Purple overlays nodding to the colors of the fraternity. A White midsole atop a Yellow rubber outsole completes the design.', 1, 1, 1),
	(2, 'Air Jordan 3 “Cardinal Red”', 217, 'Dressed in a White, Light Curry, Cardinal Red, and Cement Grey color scheme. This Air Jordan 3 resembles the Air Jordan 7 “Cardinal” last seen in 2011. The shoe features a White leather upper with signature elephant print overlays highlighted with Cardinal Red accents on the eyelets, liner, and portion of the midsole. Other details includes a Bronze hue on the Jumpman tongue and bottom eyelets.', 1, 1, 1),
	(3, 'Air Jordan 4 “Thunder”', 493, 'Dressed in a Black and Tour Yellow color scheme. This offering of the Air Jordan 4 will be arriving in its OG shape featuring a Black nubuck upper paired with Yellow contrasting accents throughout.', 1, 2, 2),
	(4, 'Nike Air Force 1 Low', 370, 'This offering of the Nike Air Force 1 Low features a White tumbled leather base with Grey nubuck overlays detailed with its double-layered Blue Swooshes', 2, 4, 4);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
