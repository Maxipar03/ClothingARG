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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.images: ~6 rows (aproximadamente)
INSERT INTO `images` (`id`, `url`, `product_id`) VALUES
	(1, 'https://sneakerbardetroit.com/wp-content/uploads/2022/02/Air-Jordan-1-Brotherhood-555088-706-Release-Date-1.jpeg', 1),
	(2, 'https://sneakerbardetroit.com/wp-content/uploads/2022/02/Air-Jordan-3-Cardinal-Red-CT8532-126-Release-Date-Price-4.jpeg', 2),
	(3, 'https://sneakerbardetroit.com/wp-content/uploads/2022/08/Air-Jordan-4-Thunder-2023.jpeg', 3),
	(4, 'https://sneakerbardetroit.com/wp-content/uploads/2022/08/Air-Jordan-4-Thunder-2023.jpeg', 5),
	(5, 'https://footwearnews.com/wp-content/uploads/2022/09/JORDAN-MELO-M12-DX1419_300_E_PREM-e1662997604522.jpg', 4),
	(23, 'https://media.revistagq.com/photos/5e7a22db9da1570008d604c5/master/w_1600%2Cc_limit/aj5front.jpg', 17);

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

-- Volcando estructura para tabla mydb.permission
CREATE TABLE IF NOT EXISTS `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.permission: ~0 rows (aproximadamente)

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.products: ~6 rows (aproximadamente)
INSERT INTO `products` (`id`, `name`, `price`, `description`, `brand_id`, `material_id`, `color_id`) VALUES
	(1, 'Air Jordan 1 High OG “Brotherhood”', 170, 'The Air Jordan 1 High OG “Brotherhood” pays homage to Michael Jordan’s fraternity, Omega Psi Phi, that he joined during his days at the University of North Carolina.', 1, 1, 1),
	(2, 'Air Jordan 3 "Cardinal Red”', 217, 'Dressed in a White, Light Curry, Cardinal Red, and Cement Grey color scheme. This Air Jordan 3 resembles the Air Jordan 7 “Cardinal” last seen in 2011. The shoe features a White leather upper with signature elephant print overlays highlighted with Cardinal Red accents on the eyelets, liner, and portion of the midsole. Other details includes a Bronze hue on the Jumpman tongue and bottom eyelets.', 1, 1, 1),
	(3, 'Air Jordan 4 “Thunder”', 493, 'Dressed in a Black and Tour Yellow color scheme. This offering of the Air Jordan 4 will be arriving in its OG shape featuring a Black nubuck upper paired with Yellow contrasting accents throughout.', 1, 2, 2),
	(4, 'Nike Air Force 1 Low', 370, 'This offering of the Nike Air Force 1 Low features a White tumbled leather base with Grey nubuck overlays detailed with its double-layered Blue Swooshes', 2, 4, 4),
	(5, 'Maxidaa', 1231312, 'pleawdadawdadawdadwadwdawdadawdadaadadadawdadqdadad', 1, 1, 1),
	(17, 'Air Jordan 5', 1234, 'The Air Jordan 5 was designed by Tinker Hatfield and made its debut in 1990. Inspired by a World War II fighter plane', 1, 1, 3);

-- Volcando estructura para tabla mydb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `confirm_password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla mydb.users: ~7 rows (aproximadamente)
INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `confirm_password`) VALUES
	(1, 'Maximiliano', 'Pardo', 'Nigh', 'maxipar2003@gmail.com', '', ''),
	(2, 'Maximiliano', 'Pardo', 'NightFaden', 'maxipar2003@gmail.com', '123456', '123456'),
	(3, 'Maximiliano', 'Pardo', 'NightFaden', 'maxipar2003@gmail.com', '123456', '123456'),
	(4, 'Maximiliano', 'Pardo', 'NightFaden', 'maxipar2003@gmail.com', '123456', '123456'),
	(5, 'Maximiliano', 'Pardo', 'NightFiuden', 'maxipar007@gmail.com', '$2a$10$v0upLXkrzCawTUZOfIEtSemZMq626Jwx.N7owyfUuxa', '$2a$10$JSK0LnvtjYqi1/OUk0GCXu/xPszbztWDA72IqxUq6jj'),
	(6, 'zaraza', 'zaraza', 'zaraza1234', 'xaxas33788@adroh.com', '$2a$10$OI5dsDxqZ7iORm5zj.y9MeqsfMijLwRevsM07XFJmTR', '$2a$10$g73H2JVVbxGs5sL385fibuNHEaF8lG2tLiEgzrnI1yu'),
	(7, 'MiliTres', 'Milagros', 'Milidostres', 'Milidostres@gmail.com', '$2a$10$4dwmUbMQWZA9K52a1jkFtO/dOuYt97uBCc2keUdX5SS', '$2a$10$0wmcyWVMgu4oqMQrHi6qnes1EHScPopaeMno6GoMMmm');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
