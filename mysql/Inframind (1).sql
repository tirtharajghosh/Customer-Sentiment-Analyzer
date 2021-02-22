-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 22, 2021 at 01:09 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Inframind`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `cid` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `csat` float NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `country` varchar(80) NOT NULL,
  `pin` int NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(80) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`cid`, `name`, `csat`, `address1`, `address2`, `city`, `state`, `country`, `pin`, `phone`, `email`, `image`, `created_at`, `modified_at`) VALUES
(1, 'Tirtharaj Ghosh', 0.3726, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'tirtharajghosh.ju@gmail.com', 'http://localhost:3000/images/rsz_self_picture.jpg', '2021-01-10 14:53:15', '2021-01-10 14:53:15'),
(9, 'Suvendu Mahapatra', 0.7474, '146/B, Kulia, Beleghata Main Road', 'Beleghata', 'Delhi', 'West Bengal', 'India', 700010, '9564641639', 'suvendumahapatra3@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-26 19:33:44', '2021-01-26 19:33:44'),
(10, 'Anindita Dutta', -0.9, '146/B, Beleghata Main Road', 'Beleghata', 'Mumbai', 'West Bengal', 'India', 700010, '9564641639', 'aninditadutta941997@gmail.com ', 'http://localhost:3000/images/female.png', '2021-01-10 14:53:15', '2021-01-10 14:53:15'),
(11, 'Ankur Sarkar', -0.42, '146/B, Beleghata Main Road', 'Beleghata', 'Bangalore', 'West Bengal', 'India', 700010, '9564641639', 'anks095@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 20:11:49', '2021-01-22 20:11:49'),
(12, 'Masuma Khatun ', 0.45, '146/B, Beleghata Main Road', 'Beleghata', 'Hyderabad', 'West Bengal', 'India', 700010, '9564641639', 'nargishmasuma18@gmail.com ', '	\r\nhttp://localhost:3000/images/female.png', '2021-01-22 21:38:59', '2021-01-22 21:38:59'),
(13, 'Sangramjit Nath', -0.12, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'nathrohit48@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:39:54', '2021-01-22 21:39:54'),
(14, 'Abhishek Pandey', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'abhishekpandey10196@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:41:17', '2021-01-22 21:41:17'),
(15, 'Abhik Biswas', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'abkbsws1996@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-26 19:33:44', '2021-01-26 19:33:44'),
(16, 'Arijit Kumar Roy', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'arijitroy003@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-10 14:53:15', '2021-01-10 14:53:15'),
(17, 'Sudipan Bhattacharjee', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'sudipan030@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 20:11:49', '2021-01-22 20:11:49'),
(18, 'Soumik Modak', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'soumikmodak3@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:38:59', '2021-01-22 21:38:59'),
(19, 'Sutirtha Dey', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'deysutirtha31@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:39:54', '2021-01-22 21:39:54'),
(20, 'Arkojyoti Paul', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'arkoofficial750@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:41:17', '2021-01-22 21:41:17'),
(21, 'Sukanta Das', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'sukantadas261997@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-26 19:33:44', '2021-01-26 19:33:44'),
(22, 'Rahul Chakraborty', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'rchakraborty90@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-10 14:53:15', '2021-01-10 14:53:15'),
(23, 'Shibam Chandra', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'shibamchandra51@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 20:11:49', '2021-01-22 20:11:49'),
(24, 'Madhu Sudhan', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'madhusudhanmyank@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:38:59', '2021-01-22 21:38:59'),
(25, 'Amrita Singh', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'singhamrita1734@gmail.com', '	\r\nhttp://localhost:3000/images/female.png', '2021-01-22 21:39:54', '2021-01-22 21:39:54'),
(26, 'Sourav Dalapati', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'sourav.game17@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:41:17', '2021-01-22 21:41:17'),
(27, 'Varsha Saraf', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'varshasaraff559@gmail.com', '	\r\nhttp://localhost:3000/images/female.png', '2021-01-26 19:33:44', '2021-01-26 19:33:44'),
(28, 'Sudip Paul', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'sudip.paul1997@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-10 14:53:15', '2021-01-10 14:53:15'),
(29, 'Akash Kumar Dutta', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'akashdutta13895@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 20:11:49', '2021-01-22 20:11:49'),
(30, 'Prasita Roy Chowdhury', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'prasitac08@gmail.com', '	\r\nhttp://localhost:3000/images/female.png', '2021-01-22 21:38:59', '2021-01-22 21:38:59'),
(31, 'Sharukh Hasan', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'iamhasan097@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:39:54', '2021-01-22 21:39:54'),
(32, 'Sukdip Kar', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'sukdip2015@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 21:41:17', '2021-01-22 21:41:17'),
(33, 'Ankit Saha', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'baptuankit15@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-26 19:33:44', '2021-01-26 19:33:44'),
(34, 'Dipnarayan Jana', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'dipjana13579@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-10 14:53:15', '2021-01-10 14:53:15'),
(35, 'Kousik Dutta', 0, '146/B, Beleghata Main Road', 'Beleghata', 'Kolkata', 'West Bengal', 'India', 700010, '9564641639', 'kousik418@gmail.com', 'http://localhost:3000/images/male.png', '2021-01-22 20:11:49', '2021-01-22 20:11:49');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `fid` int NOT NULL,
  `cid` int NOT NULL,
  `pid` int NOT NULL,
  `csat` float DEFAULT NULL,
  `comment` text NOT NULL,
  `comment_csat` float DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `image_csat` float DEFAULT NULL,
  `audio` varchar(255) NOT NULL,
  `audio_csat` float DEFAULT NULL,
  `video` varchar(255) NOT NULL,
  `video_csat` float DEFAULT NULL,
  `chat_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `chat_csat` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`fid`, `cid`, `pid`, `csat`, `comment`, `comment_csat`, `image`, `image_csat`, `audio`, `audio_csat`, `video`, `video_csat`, `chat_text`, `chat_csat`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 0.2, 'good product', NULL, '', NULL, '', 0, '', 0, '', 0, '2021-01-12 14:43:00', '2021-01-12 14:43:00'),
(2, 1, 2, 0.7, 'awesome', 0, '', 0, '', 0, '', 0, '', 0, '2021-01-16 10:30:28', '2021-01-16 10:30:28'),
(3, 1, 3, 0.65, 'best', 0, '', 0, '', 0, '', 0, '', 0, '2020-10-16 10:37:02', '2020-10-16 10:37:02'),
(6, 10, 2, 0.7, 'Awesome phone', 0, '', 0, '', 0, '', 0, '', 0, '2021-01-30 18:51:13', '2021-01-30 18:51:13'),
(7, 10, 3, 0.6369, 'Best Quality', NULL, '', NULL, '', NULL, '', NULL, '', NULL, '2021-02-07 08:14:45', '2021-02-07 08:14:45'),
(8, 10, 2, 0, 'Not as expected. Dont buy', NULL, '', NULL, '', NULL, '', NULL, '', NULL, '2021-02-07 10:05:33', '2021-02-07 10:05:33'),
(9, 1, 1, -0.5423, 'Bad product', NULL, '', NULL, '', NULL, '', NULL, '', NULL, '2021-02-07 10:06:23', '2021-02-07 10:06:23'),
(10, 1, 3, 0.8555, 'Best Product. Love it', NULL, '', NULL, '', NULL, '', NULL, '', NULL, '2021-02-10 19:36:56', '2021-02-10 19:36:56'),
(11, 9, 2, 0.7474, 'Very good phone. Good camera quality.', NULL, '', NULL, '', NULL, '', NULL, '', NULL, '2021-02-19 06:10:32', '2021-02-19 06:10:32');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pid` int NOT NULL,
  `name` varchar(120) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantity` varchar(80) NOT NULL,
  `hashtag` varchar(150) NOT NULL,
  `csat` float NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modfied_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pid`, `name`, `image`, `quantity`, `hashtag`, `csat`, `price`, `created_at`, `modfied_at`) VALUES
(1, 'Sony Bravia 138.8 cm (55 inches) 4K Ultra HD Certified Android LED TV 55X7500H (Black) (2020 Model)', 'https://images-na.ssl-images-amazon.com/images/I/81Nw2ifyBzL._SL1500_.jpg', '1', 'SonyBRAVIA', -0.1711, 60999, '2021-01-12 14:41:46', '2021-01-12 14:41:46'),
(2, 'Samsung Galaxy M21 (Midnight Blue, 4GB RAM, 64GB Storage)', 'https://images-na.ssl-images-amazon.com/images/I/71dujTTJDZL._SY500_.jpg', '1', 'm21', 0.5368, 13999, '2021-01-16 10:29:44', '2021-01-16 10:29:44'),
(3, '\r\nboAt Bassheads 100 in Ear Wired Earphones with Mic(Black)', 'https://images-na.ssl-images-amazon.com/images/I/719elVA3FvL._SL1500_.jpg', '1', 'boat', 2.5, 399, '2021-01-16 10:36:37', '2021-01-16 10:36:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `cid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `fid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
