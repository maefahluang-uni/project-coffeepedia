-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 10, 2024 at 08:44 PM
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
(1, 'The difference between Arabica and Robusta coffee', '2024-05-02 09:54:19', 107, 1, '1', '<p>Arabica and Robusta are the two kinds of coffee beans used in commercial coffee production. \n          The main differences between them are their taste and where they are grown. When it comes to their difference in caffeine level, \n          Robusta beans contain twice the level of caffeine than Arabica beans. Arabica beans have a milder, more aromatic taste while Robusta beans hold a stronger, more acquired flavor. \n          Arabica beans are flat and oval in shape while Robusta beans have a more obvious round shape. \n          When they are still on their plant, the beans can easily be told apart by their difference in colour as Arabica beans are a darker shade of green then Robusta beans.</p>\n          \n          <p>Arabica beans are cultivated in Central and South America due to the subtropical climates as they can only be grown in places with higher climates. Robusta beans on the other hand, \n          are cultivated in Central and West Africa and South East Asia, as they require places with little rainfall and lower altitudes to grow. Over 70% of the coffee grown around the world is \n          Arabica and is generally known as the higher quality bean. Robusta coffee is characterised by its woody and earthy flavours. You most likely won\'t see a 100% Robusta blend on the market, \n          as Robusta is naturally higher in caffeine and is to strong to drink. However, there are many high quality blends of Robusta available on the market, which provide great flavours once \n          mixed with Arabica beans.</p>\n          \n            <h2>Arabica Beans</h2>\n              <li>Grown at high altitude above 800m</li>\n              <li>Grown in places with higher climates</li>\n              <li>Mild, well balanced in flavour</li>\n              <li>More expensive coffee bean</li>\n              <li>Naturally lower in caffeine</li>\n               <h2>Robusta Beans</h2>\n              <li>Commonly used in instant coffee</li>\n              <li>Grown at lower altitudes between 200m-800m</li>\n              <li>Grown in places with lower climates</li>\n              <li>More astringent and bitter in flavour</li>\n              <li> Has twice the amount of caffeine than Arabica beans<br></li>', NULL, 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg'),
(2, 'The most popular types of coffee beans that people drink', '2023-11-09 00:00:00', 89, 0, '1', 'The most popular types of coffee beans that people drink. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', NULL, NULL),
(3, '5 coffee farms that are most worth visiting in the northern region', '2023-07-15 00:00:00', 76, 0, '1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, NULL),
(6, 'asdasdas', '2024-10-10 16:55:24', 0, 0, '1', 'teccc', NULL, 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg');

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
(30, 1, 'This is very good', '2024-10-10 23:31:33');

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
(8, 2, 10, 180);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `href` varchar(255) NOT NULL,
  `newsImageUrl` varchar(255) NOT NULL,
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
(5, '‘กาแฟ’ ดื่มอย่างไรไม่ให้ เกิดภาวะขาดน้ำ ฮีตสโตรก ยิ่งอากาศร้อนแบบนี้ควรระวัง', '2024-05-02 00:38:59', 'https://www.thairath.co.th/lifestyle/life/2777252', 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5LREGpfxBaaWejfzzNKH2pI7EYD9uCpFE5VGEY2fn27QlWG7lCL.webp', '1');

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
-- Table structure for table `site_visits`
--

CREATE TABLE `site_visits` (
  `id` int(11) NOT NULL,
  `visit_date` date NOT NULL,
  `visit_count` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `site_visits`
--

INSERT INTO `site_visits` (`id`, `visit_date`, `visit_count`) VALUES
(5, '2024-10-11', 1);

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
(1, 1, 1, 'Cinnamon Roast, Half City', '123-432', 3, 'Light-bodied and somewhat sour, grassy, and snappy', 'Suitable for brewing Filter', '1', 'image/roasted_coffee/dry_light_front_1.png'),
(2, 2, 1, 'Full City, Regular', '215-218', 2, 'A bit sweeter than light roast, full body balanced by acid snap, aroma, and complexity.', 'Suitable for brewing Filter and Espresso.', '1', 'image/roasted_coffee/dry_medium_front_1.png'),
(3, 3, 1, 'Italian Espresso, Viennese', '123-432', 3, 'Somewhat spicy; complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness', 'Slightly shiny. Suitable for brewing with Espresso machines and making coffee with milk', '1', 'image/roasted_coffee/drydark14.png');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_comment`
--
ALTER TABLE `blog_comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `roast_level`
--
ALTER TABLE `roast_level`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `site_visits`
--
ALTER TABLE `site_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `type_coffee`
--
ALTER TABLE `type_coffee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
