-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 10, 2024 at 01:33 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcoffee_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `PassWord` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `UserName`, `PassWord`, `Email`, `Name`, `LastName`) VALUES
(1, 'admin_dev', 'dev1234', 'admin@email.com', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `ID` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `viewCount` int(11) NOT NULL DEFAULT '0',
  `commentCount` int(11) NOT NULL DEFAULT '0',
  `IsActivate` varchar(1) NOT NULL DEFAULT '1',
  `content` mediumtext NOT NULL,
  `imageFile` mediumblob,
  `imageURL` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`ID`, `title`, `date`, `viewCount`, `commentCount`, `IsActivate`, `content`, `imageFile`, `imageURL`) VALUES
(1, 'The difference between Arabica and Robusta coffee', '2024-10-15 05:29:00', 117, 2, '1', '<p>Arabica and Robusta are the two kinds of coffee beans used in commercial coffee production. \n          The main differences between them are their taste and where they are grown. When it comes to their difference in caffeine level, \n          Robusta beans contain twice the level of caffeine than Arabica beans. Arabica beans have a milder, more aromatic taste while Robusta beans hold a stronger, more acquired flavor. \n          Arabica beans are flat and oval in shape while Robusta beans have a more obvious round shape. \n          When they are still on their plant, the beans can easily be told apart by their difference in colour as Arabica beans are a darker shade of green then Robusta beans.</p>\n          \n          <p>Arabica beans are cultivated in Central and South America due to the subtropical climates as they can only be grown in places with higher climates. Robusta beans on the other hand, \n          are cultivated in Central and West Africa and South East Asia, as they require places with little rainfall and lower altitudes to grow. Over 70% of the coffee grown around the world is \n          Arabica and is generally known as the higher quality bean. Robusta coffee is characterised by its woody and earthy flavours. You most likely won\'t see a 100% Robusta blend on the market, \n          as Robusta is naturally higher in caffeine and is to strong to drink. However, there are many high quality blends of Robusta available on the market, which provide great flavours once \n          mixed with Arabica beans.</p>\n          \n            <h2>Arabica Beans</h2>\n              <li>Grown at high altitude above 800m</li>\n              <li>Grown in places with higher climates</li>\n              <li>Mild, well balanced in flavour</li>\n              <li>More expensive coffee bean</li>\n              <li>Naturally lower in caffeine</li>\n               <h2>Robusta Beans</h2>\n              <li>Commonly used in instant coffee</li>\n              <li>Grown at lower altitudes between 200m-800m</li>\n              <li>Grown in places with lower climates</li>\n              <li>More astringent and bitter in flavour</li>\n              <li> Has twice the amount of caffeine than Arabica beans<br></li>', NULL, 'https://suzuki-coffee.com/wp-content/uploads/2016/09/arabica-robusta-beans.jpg'),
(2, 'The most popular types of coffee beans that people drink', '2024-10-11 05:30:55', 89, 1, '1', 'The most popular types of coffee beans that people drink. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', NULL, 'https://cafely.com/cdn/shop/articles/Coffea_Arabica.jpg?v=1718340298'),
(3, '5 coffee farms that are most worth visiting in the northern region', '2024-10-11 05:34:44', 92, 0, '1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, 'https://cdn.prod.website-files.com/6063345cc13db992ffe13a50/6707a26b4b367f17ddddcd37_61bb010ff578b443a31da26e_2.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `blog_comment`
--

CREATE TABLE `blog_comment` (
  `ID` int(11) NOT NULL,
  `blogID` int(11) NOT NULL,
  `comment` text NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog_comment`
--

INSERT INTO `blog_comment` (`ID`, `blogID`, `comment`, `datetime`) VALUES
(30, 1, 'This is very good', '2024-10-17 23:31:33'),
(31, 2, 'Wow', '2024-10-11 04:06:33'),
(32, 1, 'Hello', '2024-10-29 20:07:17');

-- --------------------------------------------------------

--
-- Table structure for table `coffee_process`
--

CREATE TABLE `coffee_process` (
  `ID` int(11) NOT NULL,
  `ProcessName` varchar(50) NOT NULL,
  `IsActivate` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `coffee_process`
--

INSERT INTO `coffee_process` (`ID`, `ProcessName`, `IsActivate`) VALUES
(1, 'dry', '1'),
(2, 'honey', '1'),
(3, 'wet', '1');

-- --------------------------------------------------------

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `ID` int(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact_info`
--

INSERT INTO `contact_info` (`ID`, `Address`, `Phone`, `Email`) VALUES
(1, '333 Moo1, Thasud, Muang Chiang Rai, Chiang Rai, 57100', '+66 5391 6741-2', 'sujitra.arw@mfu.ac.th');

-- --------------------------------------------------------

--
-- Table structure for table `drink_suggest`
--

CREATE TABLE `drink_suggest` (
  `ID` int(11) NOT NULL,
  `TypeID` int(11) NOT NULL,
  `DrinkName` varchar(40) NOT NULL,
  `icon` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `drink_suggest`
--

INSERT INTO `drink_suggest` (`ID`, `TypeID`, `DrinkName`, `icon`) VALUES
(5, 1, 'Esspresso', 'coffee-maker'),
(6, 1, 'Amaricano', 'coffee'),
(7, 1, 'Drip', 'kettle-pour-over'),
(8, 2, 'Drink 1', 'coffee'),
(9, 3, 'Dark drink', 'cup');

-- --------------------------------------------------------

--
-- Table structure for table `gas_state`
--

CREATE TABLE `gas_state` (
  `ID` int(11) NOT NULL,
  `TypeID` int(11) NOT NULL,
  `Gas` int(11) NOT NULL,
  `WhenTempurature` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gas_state`
--

INSERT INTO `gas_state` (`ID`, `TypeID`, `Gas`, `WhenTempurature`) VALUES
(3, 1, 10, 185),
(5, 1, 5, 195),
(9, 2, 10, 180),
(10, 2, 5, 200);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `farmName` text NOT NULL,
  `locationName` text NOT NULL,
  `latitude` double NOT NULL,
  `longtitude` double NOT NULL,
  `masl` int(11) DEFAULT '0',
  `province` varchar(150) NOT NULL,
  `district` varchar(150) NOT NULL,
  `subdistrict` varchar(150) NOT NULL,
  `zipcode` varchar(10) DEFAULT '00000',
  `image` text,
  `IsActivate` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `farmName`, `locationName`, `latitude`, `longtitude`, `masl`, `province`, `district`, `subdistrict`, `zipcode`, `image`, `IsActivate`) VALUES
(2, 'ดอยช้างคอฟฟี่', 'ดอยช้าง', 19.800718341431505, 99.55540771349227, NULL, 'Chiang Rai', 'Mae Suai', 'Wawi', '57180', 'image/roasted_coffee/1728620188156_coffee-field-landscape-and-coffee-cherries-at-foreground.jpg', '1'),
(4, 'แม่สายกาแฟ', 'แม่สาย', 20.3431783612086, 99.83842849731447, NULL, 'Chiang Rai', 'Mae Sai', 'Mae Sai', '57220', 'image/roasted_coffee/1730207925336_coffee-field-landscape-and-coffee-cherries-at-foreground.jpg', '1');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `href` text NOT NULL,
  `newsImageUrl` text NOT NULL,
  `IsActivate` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`ID`, `title`, `date`, `href`, `newsImageUrl`, `IsActivate`) VALUES
(1, 'Point out the direction in which the Thai coffee industry can develop and be sustainable', '2023-07-15 00:00:00', 'https://www.thairath.co.th/lifestyle/life/2709619', 'https://static.thairath.co.th/media/B6FtNKtgSqRqbnNsbKFBXFUXBM6DULRK7KmbFUuOa7j2y5DL2jbIzyhiM7JuWC3nIfNAM.webp', '1'),
(2, ' Thai people consume 70,000 tons of coffee per year, pushing the market value to reach 60 billion', '2023-07-11 00:00:00', 'https://www.dailynews.co.th/news/2053626/', 'https://www.dailynews.co.th/wp-content/uploads/2023/03/6E751148-1C5B-4E35-BB0C-78EA92237581.jpeg', '1'),
(3, 'Revealing the reason why Thai people drink expensive \'coffee\'', '2023-01-15 00:00:00', 'https://today.line.me/th/v2/article/kEZqkG1', 'https://obs.line-scdn.net/0hWVlXJOM4CHlRIRqwT8h3Lml3BAhiRxJwc04XSnFzVEt8DRt7bRJbGiRyBFUsEEl7cUVHGiNzBEt5Q0oraA/w1200', '1'),
(4, 'Get to know espresso A menu that is more than just black coffee.', '2024-05-02 03:17:57', 'https://www.thairath.co.th/lifestyle/life/2290026', 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yX2tkhJUhUU50GI7ybNTZLESJ7K0lBIdkJOzHbKdWiCfAngoch.webp', '1'),
(5, '‘กาแฟ’ ดื่มอย่างไรไม่ให้ เกิดภาวะขาดน้ำ ฮีตสโตรก ยิ่งอากาศร้อนแบบนี้ควรระวัง', '2024-05-02 00:38:59', 'https://www.thairath.co.th/lifestyle/life/2777252', 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5LREGpfxBaaWejfzzNKH2pI7EYD9uCpFE5VGEY2fn27QlWG7lCL.webp', '1'),
(7, '9 ประโยชน์สุดเจ๋งของกาแฟ ที่คุณต้องตะลึง', '2024-10-29 16:18:09', 'https://www.nlcoffee.net/content/5959/9-%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%88%E0%B9%8B%E0%B8%87%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B0%E0%B8%A5%E0%B8%B6%E0%B8%87', 'https://image.makewebcdn.com/makeweb/m_1920x0/oX8ERz2hu/Picture/9%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C%E0%B8%81%E0%B8%B2%E0%B9%81%E0%B8%9F.jpg?v=202405291424', '1');

-- --------------------------------------------------------

--
-- Table structure for table `roast_level`
--

CREATE TABLE `roast_level` (
  `ID` int(11) NOT NULL,
  `RoastName` varchar(50) NOT NULL,
  `IsActivate` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roast_level`
--

INSERT INTO `roast_level` (`ID`, `RoastName`, `IsActivate`) VALUES
(1, 'light', '1'),
(2, 'medium', '1'),
(3, 'dark', '1');

-- --------------------------------------------------------

--
-- Table structure for table `score_categories`
--

CREATE TABLE `score_categories` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `IsActivate` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `score_categories`
--

INSERT INTO `score_categories` (`ID`, `name`, `IsActivate`) VALUES
(1, 'Cupping Scores', '1'),
(2, 'Physical and Chemical Properties', '1');

-- --------------------------------------------------------

--
-- Table structure for table `score_lists`
--

CREATE TABLE `score_lists` (
  `ID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `IsActivate` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `score_lists`
--

INSERT INTO `score_lists` (`ID`, `CategoryID`, `name`, `unit`, `IsActivate`) VALUES
(1, 1, 'Fragrance/Aroma', NULL, '1'),
(2, 1, 'Flavor', NULL, '1'),
(3, 1, 'Aftertaste', NULL, '1'),
(4, 1, 'Acidity', NULL, '1'),
(5, 1, 'Body', NULL, '1'),
(6, 1, 'Balance', NULL, '1'),
(7, 1, 'Sweetness', NULL, '1'),
(8, 1, 'Clean Cup', NULL, '1'),
(9, 1, 'Uniformity', NULL, '1'),
(10, 1, 'Overall', NULL, '1'),
(11, 2, 'Total titratable acidity', NULL, '1'),
(12, 2, 'Cafeine', NULL, '1'),
(13, 2, 'Aliphatic acids', NULL, '1'),
(14, 2, 'Protein', '%', '1'),
(15, 2, 'Density', 'g/mL', '1'),
(16, 2, 'Moisture content', '% d.b.', '1'),
(17, 2, 'pH', NULL, '1'),
(18, 2, 'Sucrose', 'mg/g', '1'),
(19, 2, 'L*', NULL, '1'),
(20, 2, 'a*', NULL, '1'),
(21, 2, 'b*', NULL, '1'),
(22, 2, 'Fat', '%', '1'),
(23, 2, 'Trigonelline', 'mg/g', '1'),
(24, 2, 'Caffeine', 'mg/g', '1'),
(25, 2, 'Chlorogenic Acid', 'mg/g', '1'),
(26, 2, 'Chlorogenic acids', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `score_varieties`
--

CREATE TABLE `score_varieties` (
  `ID` int(11) NOT NULL,
  `RoastLevelID` int(11) NOT NULL,
  `CoffeeProcessID` int(11) NOT NULL,
  `cup_score` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `characteristics` text,
  `score_value` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `site_visits`
--

CREATE TABLE `site_visits` (
  `id` int(11) NOT NULL,
  `visit_date` date NOT NULL,
  `visit_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `site_visits`
--

INSERT INTO `site_visits` (`id`, `visit_date`, `visit_count`) VALUES
(5, '2024-10-11', 1),
(6, '2024-10-29', 2),
(7, '2024-11-05', 1),
(8, '2024-11-16', 1),
(9, '2024-11-19', 2),
(10, '2024-12-02', 1),
(11, '2024-12-03', 1),
(12, '2024-12-10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `type_coffee`
--

CREATE TABLE `type_coffee` (
  `ID` int(11) NOT NULL,
  `RoastLevelID` int(11) NOT NULL,
  `CoffeeProcessID` int(11) NOT NULL,
  `CommonName` text NOT NULL,
  `Tempurature` varchar(10) NOT NULL,
  `CrackState` int(1) NOT NULL COMMENT '1 = first crack, 2 = between first - second crack, 3 = second crack',
  `Flavor` text NOT NULL,
  `MoreDetail` text,
  `IsActivate` varchar(1) DEFAULT '1',
  `ImageDataFront` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `type_coffee`
--

INSERT INTO `type_coffee` (`ID`, `RoastLevelID`, `CoffeeProcessID`, `CommonName`, `Tempurature`, `CrackState`, `Flavor`, `MoreDetail`, `IsActivate`, `ImageDataFront`) VALUES
(1, 1, 1, 'Cinnamon Roast, Half City', '123-432', 1, 'Light-bodied and somewhat sour, grassy', 'Suitable for brewing Filter', '1', 'image/roasted_coffee/dry_light_front_1.png'),
(2, 2, 1, 'Full City, Regular', '215-218', 2, 'A bit sweeter than light roast, full body balanced by acid snap, aroma, and complexity.', 'Suitable for brewing Filter and Espresso.', '1', 'image/roasted_coffee/1731752719318_12.png'),
(3, 3, 1, 'Italian Espresso, Viennese', '123-432', 3, 'Somewhat spicy; complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness', 'Slightly shiny. Suitable for brewing with Espresso machines and making coffee with milk', '1', 'image/roasted_coffee/drydark14.png'),
(4, 1, 2, 'Cinnamon Roast, Half City', '123-215', 1, 'Light-bodied and somewhat sour, grassy, and snappy', 'Suitable for brewing Filter', '1', 'image/roasted_coffee/1730148633363_2.png'),
(5, 2, 2, 'Full City, Regular', '215-218', 2, 'A bit sweeter than light roast, full body balanced by acid snap, aroma, and complexity.', 'Suitable for brewing Filter and Espresso.', '1', 'image/roasted_coffee/1730148689962_1.png'),
(6, 3, 2, 'Italian Espresso, Viennese', '218-220', 3, 'Somewhat spicy, complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness', 'Slightly shiny. Suitable for brewing with Espresso machines and making coffee with milk', '1', 'image/roasted_coffee/1730148857813_1.png'),
(7, 1, 3, 'Cinnamon Roast, Half City', '123-215', 1, 'Light-bodied and somewhat sour, grassy, and snappy', 'Suitable for brewing Filter', '1', 'image/roasted_coffee/1730148908415_1.png'),
(8, 2, 3, 'Full City, Regular', '215-218', 2, 'A bit sweeter than light roast, full body balanced by acid snap, aroma, and complexity.', 'Suitable for brewing Filter and Espresso.', '1', 'image/roasted_coffee/1730148942010_1.png'),
(9, 3, 3, 'Italian Espresso, Viennese', '218-220', 3, 'Somewhat spicy, complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness', 'Slightly shiny. Suitable for brewing with Espresso machines and making coffee with milk', '1', 'image/roasted_coffee/1730148996448_3.png');

-- --------------------------------------------------------

--
-- Table structure for table `type_coffee_image`
--

CREATE TABLE `type_coffee_image` (
  `ID` int(11) NOT NULL,
  `TypeID` int(11) NOT NULL,
  `ImageDataFront` text NOT NULL,
  `ImageDataBack` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `type_coffee_image`
--

INSERT INTO `type_coffee_image` (`ID`, `TypeID`, `ImageDataFront`, `ImageDataBack`) VALUES
(11, 1, 'image/roasted_coffee/dry_light_front_1.png', 'image/roasted_coffee/dry_light_back_1.png'),
(12, 1, 'image/roasted_coffee/dry_light_front_2.png', 'image/roasted_coffee/dry_light_back_2.png'),
(13, 2, 'image/roasted_coffee/dry_medium_front_1.png', 'image/roasted_coffee/dry_medium_back_1.png'),
(14, 2, 'image/roasted_coffee/dry_medium_front_2.png', 'image/roasted_coffee/dry_medium_back_2.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `blog_comment`
--
ALTER TABLE `blog_comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_blogID` (`blogID`);

--
-- Indexes for table `coffee_process`
--
ALTER TABLE `coffee_process`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `drink_suggest`
--
ALTER TABLE `drink_suggest`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TypeCoffeeID` (`TypeID`);

--
-- Indexes for table `gas_state`
--
ALTER TABLE `gas_state`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_GasStateTypeCoffeeID` (`TypeID`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roast_level`
--
ALTER TABLE `roast_level`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `score_categories`
--
ALTER TABLE `score_categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `score_lists`
--
ALTER TABLE `score_lists`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_CategoryID` (`CategoryID`);

--
-- Indexes for table `score_varieties`
--
ALTER TABLE `score_varieties`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RoastLevelID_varieties` (`RoastLevelID`) USING BTREE,
  ADD KEY `FK_CoffeeProcessID_varieties` (`CoffeeProcessID`);

--
-- Indexes for table `site_visits`
--
ALTER TABLE `site_visits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `visit_date` (`visit_date`);

--
-- Indexes for table `type_coffee`
--
ALTER TABLE `type_coffee`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_RoastLevelID` (`RoastLevelID`),
  ADD KEY `FK_CoffeeProcessID` (`CoffeeProcessID`);

--
-- Indexes for table `type_coffee_image`
--
ALTER TABLE `type_coffee_image`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ImgTypeCoffeeID` (`TypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_comment`
--
ALTER TABLE `blog_comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `coffee_process`
--
ALTER TABLE `coffee_process`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `drink_suggest`
--
ALTER TABLE `drink_suggest`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gas_state`
--
ALTER TABLE `gas_state`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roast_level`
--
ALTER TABLE `roast_level`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `score_categories`
--
ALTER TABLE `score_categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `score_lists`
--
ALTER TABLE `score_lists`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `score_varieties`
--
ALTER TABLE `score_varieties`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_visits`
--
ALTER TABLE `site_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `type_coffee`
--
ALTER TABLE `type_coffee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `type_coffee_image`
--
ALTER TABLE `type_coffee_image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_comment`
--
ALTER TABLE `blog_comment`
  ADD CONSTRAINT `FK_blogID` FOREIGN KEY (`blogID`) REFERENCES `blog` (`ID`);

--
-- Constraints for table `drink_suggest`
--
ALTER TABLE `drink_suggest`
  ADD CONSTRAINT `FK_TypeCoffeeID` FOREIGN KEY (`TypeID`) REFERENCES `type_coffee` (`ID`);

--
-- Constraints for table `gas_state`
--
ALTER TABLE `gas_state`
  ADD CONSTRAINT `FK_GasStateTypeCoffeeID` FOREIGN KEY (`TypeID`) REFERENCES `type_coffee` (`ID`);

--
-- Constraints for table `score_lists`
--
ALTER TABLE `score_lists`
  ADD CONSTRAINT `FK_CategoryID` FOREIGN KEY (`CategoryID`) REFERENCES `score_categories` (`ID`);

--
-- Constraints for table `score_varieties`
--
ALTER TABLE `score_varieties`
  ADD CONSTRAINT `score_varieties_ibfk_1` FOREIGN KEY (`RoastLevelID`) REFERENCES `roast_level` (`ID`),
  ADD CONSTRAINT `score_varieties_ibfk_2` FOREIGN KEY (`CoffeeProcessID`) REFERENCES `coffee_process` (`ID`);

--
-- Constraints for table `type_coffee`
--
ALTER TABLE `type_coffee`
  ADD CONSTRAINT `FK_CoffeeProcessID` FOREIGN KEY (`CoffeeProcessID`) REFERENCES `coffee_process` (`ID`),
  ADD CONSTRAINT `FK_RoastLevelID` FOREIGN KEY (`RoastLevelID`) REFERENCES `roast_level` (`ID`);

--
-- Constraints for table `type_coffee_image`
--
ALTER TABLE `type_coffee_image`
  ADD CONSTRAINT `FK_ImgTypeCoffeeID` FOREIGN KEY (`TypeID`) REFERENCES `type_coffee` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
