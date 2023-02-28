-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 03:10 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tsel_radio_v3.3`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(10) UNSIGNED NOT NULL,
  `deskripsi_activity` varchar(120) NOT NULL,
  `budget` varchar(20) DEFAULT NULL,
  `cost` bigint(20) DEFAULT NULL,
  `program` smallint(6) UNSIGNED DEFAULT NULL,
  `subprogram` smallint(6) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `do_subdepartemen`
--

CREATE TABLE `do_subdepartemen` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history_plan_activity_all`
--

CREATE TABLE `history_plan_activity_all` (
  `activity_id` int(10) UNSIGNED NOT NULL,
  `additional_info` varchar(150) DEFAULT NULL,
  `target_quartal` enum('Q1','Q1-Q2','Q1-Q3','Q1-Q4','Q2','Q2-Q3','Q2-Q4','Q3','Q3-Q4','Q4') NOT NULL,
  `remark` varchar(100) DEFAULT 'NULL',
  `budget` varchar(20) DEFAULT NULL,
  `cost` bigint(20) NOT NULL DEFAULT '0',
  `pic` varchar(50) DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `week_executed` smallint(3) DEFAULT NULL,
  `date_executed` date DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `archived_at` datetime NOT NULL,
  `archived_by` char(36) NOT NULL,
  `history_type` enum('UPDATE','DELETE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history_plan_activity_site`
--

CREATE TABLE `history_plan_activity_site` (
  `activity_id` int(10) UNSIGNED NOT NULL,
  `site_id` varchar(6) NOT NULL,
  `additional_info` varchar(150) DEFAULT NULL,
  `target_quartal` enum('Q1','Q1-Q2','Q1-Q3','Q1-Q4','Q2','Q2-Q3','Q2-Q4','Q3','Q3-Q4','Q4') NOT NULL,
  `remark` varchar(100) DEFAULT 'NULL',
  `budget` varchar(20) DEFAULT NULL,
  `cost` bigint(20) NOT NULL DEFAULT '0',
  `pic` varchar(50) DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `week_executed` smallint(3) DEFAULT NULL,
  `date_executed` date DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `archived_at` datetime NOT NULL,
  `archived_by` char(36) NOT NULL,
  `history_type` enum('UPDATE','DELETE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history_site`
--

CREATE TABLE `history_site` (
  `id` varchar(6) NOT NULL,
  `name` varchar(50) NOT NULL,
  `kabupaten` smallint(6) UNSIGNED DEFAULT NULL,
  `ns_departemen` smallint(6) UNSIGNED DEFAULT NULL,
  `do_subdepartemen` smallint(6) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `archived_at` datetime NOT NULL,
  `archived_by` char(36) NOT NULL,
  `history_type` enum('UPDATE','DELETE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kabupaten`
--

CREATE TABLE `kabupaten` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ns_departemen`
--

CREATE TABLE `ns_departemen` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `plan_activity_all`
--

CREATE TABLE `plan_activity_all` (
  `activity_id` int(10) UNSIGNED NOT NULL,
  `additional_info` varchar(150) DEFAULT NULL,
  `target_quartal` enum('Q1','Q1-Q2','Q1-Q3','Q1-Q4','Q2','Q2-Q3','Q2-Q4','Q3','Q3-Q4','Q4') NOT NULL,
  `remark` varchar(100) DEFAULT 'NULL',
  `budget` varchar(20) DEFAULT NULL,
  `cost` bigint(20) NOT NULL DEFAULT '0',
  `pic` varchar(50) DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `week_executed` smallint(3) DEFAULT NULL,
  `date_executed` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `plan_activity_site`
--

CREATE TABLE `plan_activity_site` (
  `activity_id` int(10) UNSIGNED NOT NULL,
  `site_id` varchar(6) NOT NULL,
  `additional_info` varchar(150) DEFAULT NULL,
  `target_quartal` enum('Q1','Q1-Q2','Q1-Q3','Q1-Q4','Q2','Q2-Q3','Q2-Q4','Q3','Q3-Q4','Q4') NOT NULL,
  `remark` varchar(100) DEFAULT 'NULL',
  `budget` varchar(20) DEFAULT NULL,
  `cost` bigint(20) NOT NULL DEFAULT '0',
  `pic` varchar(50) DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `week_executed` smallint(3) DEFAULT NULL,
  `date_executed` date DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` varchar(6) NOT NULL,
  `name` varchar(50) NOT NULL,
  `kabupaten` smallint(6) UNSIGNED DEFAULT NULL,
  `ns_departemen` smallint(6) UNSIGNED DEFAULT NULL,
  `do_subdepartemen` smallint(6) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subprogram`
--

CREATE TABLE `subprogram` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `nama` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` char(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `ns_departemen` smallint(6) UNSIGNED DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `reset` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_activity_detail`
-- (See below for the actual view)
--
CREATE TABLE `vw_activity_detail` (
`id` int(10) unsigned
,`deskripsi_activity` varchar(120)
,`program` varchar(30)
,`subprogram` varchar(30)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_plan_activity`
-- (See below for the actual view)
--
CREATE TABLE `vw_plan_activity` (
`activity_id` int(11) unsigned
,`site_id` varchar(6)
,`additional_info` varchar(150)
,`target_quartal` varchar(5)
,`remark` varchar(100)
,`budget` varchar(20)
,`cost` bigint(20)
,`pic` varchar(50)
,`done` tinyint(4)
,`week_executed` smallint(6)
,`date_executed` date
,`created_at` datetime
,`updated_at` datetime
,`updated_by` char(36)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_site_detail`
-- (See below for the actual view)
--
CREATE TABLE `vw_site_detail` (
`id` varchar(6)
,`name` varchar(50)
,`kabupaten` varchar(30)
,`ns_departemen` varchar(30)
,`do_subdepartemen` varchar(30)
,`created_at` datetime
);

-- --------------------------------------------------------

--
-- Structure for view `vw_activity_detail`
--
DROP TABLE IF EXISTS `vw_activity_detail`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_activity_detail`  AS  select `activity`.`id` AS `id`,`activity`.`deskripsi_activity` AS `deskripsi_activity`,`program`.`nama` AS `program`,`subprogram`.`nama` AS `subprogram` from ((`activity` left join `program` on((`activity`.`program` = `program`.`id`))) left join `subprogram` on((`activity`.`subprogram` = `subprogram`.`id`))) group by `activity`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_plan_activity`
--
DROP TABLE IF EXISTS `vw_plan_activity`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_plan_activity`  AS  select `plan_activity_site`.`activity_id` AS `activity_id`,`plan_activity_site`.`site_id` AS `site_id`,`plan_activity_site`.`additional_info` AS `additional_info`,`plan_activity_site`.`target_quartal` AS `target_quartal`,`plan_activity_site`.`remark` AS `remark`,`plan_activity_site`.`budget` AS `budget`,`plan_activity_site`.`cost` AS `cost`,`plan_activity_site`.`pic` AS `pic`,`plan_activity_site`.`done` AS `done`,`plan_activity_site`.`week_executed` AS `week_executed`,`plan_activity_site`.`date_executed` AS `date_executed`,`plan_activity_site`.`created_at` AS `created_at`,`plan_activity_site`.`updated_at` AS `updated_at`,`plan_activity_site`.`updated_by` AS `updated_by` from `plan_activity_site` union select `plan_activity_all`.`activity_id` AS `activity_id`,convert('All' using utf8) AS `site_id`,`plan_activity_all`.`additional_info` AS `additional_info`,`plan_activity_all`.`target_quartal` AS `target_quartal`,`plan_activity_all`.`remark` AS `remark`,`plan_activity_all`.`budget` AS `budget`,`plan_activity_all`.`cost` AS `cost`,`plan_activity_all`.`pic` AS `pic`,`plan_activity_all`.`done` AS `done`,`plan_activity_all`.`week_executed` AS `week_executed`,`plan_activity_all`.`date_executed` AS `date_executed`,`plan_activity_all`.`created_at` AS `created_at`,`plan_activity_all`.`updated_at` AS `updated_at`,`plan_activity_all`.`updated_by` AS `updated_by` from `plan_activity_all` ;

-- --------------------------------------------------------

--
-- Structure for view `vw_site_detail`
--
DROP TABLE IF EXISTS `vw_site_detail`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_site_detail`  AS  select convert('All' using utf8) AS `id`,convert('All' using utf8) AS `name`,convert('All' using utf8) AS `kabupaten`,convert('All' using utf8) AS `ns_departemen`,convert('All' using utf8) AS `do_subdepartemen`,now() AS `created_at` union select `site`.`id` AS `id`,`site`.`name` AS `name`,`kabupaten`.`nama` AS `kabupaten`,`ns_departemen`.`nama` AS `ns_departemen`,`do_subdepartemen`.`nama` AS `do_subdepartemen`,`site`.`created_at` AS `created_at` from (((`site` left join `kabupaten` on((`site`.`kabupaten` = `kabupaten`.`id`))) left join `ns_departemen` on((`site`.`ns_departemen` = `ns_departemen`.`id`))) left join `do_subdepartemen` on((`site`.`do_subdepartemen` = `do_subdepartemen`.`id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deskripsi_activity` (`deskripsi_activity`),
  ADD KEY `program` (`program`),
  ADD KEY `subprogram` (`subprogram`);

--
-- Indexes for table `do_subdepartemen`
--
ALTER TABLE `do_subdepartemen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `kabupaten`
--
ALTER TABLE `kabupaten`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kabupaten` (`nama`);

--
-- Indexes for table `ns_departemen`
--
ALTER TABLE `ns_departemen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `plan_activity_all`
--
ALTER TABLE `plan_activity_all`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `plan_activity_site`
--
ALTER TABLE `plan_activity_site`
  ADD PRIMARY KEY (`site_id`,`activity_id`),
  ADD KEY `activity_id` (`activity_id`),
  ADD KEY `site_id` (`site_id`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ns_departemen` (`ns_departemen`),
  ADD KEY `do_subdepartemen` (`do_subdepartemen`),
  ADD KEY `kabupaten` (`kabupaten`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `subprogram`
--
ALTER TABLE `subprogram`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_2` (`nama`),
  ADD KEY `nama` (`nama`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `nsa_departemen` (`ns_departemen`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `do_subdepartemen`
--
ALTER TABLE `do_subdepartemen`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kabupaten`
--
ALTER TABLE `kabupaten`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ns_departemen`
--
ALTER TABLE `ns_departemen`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`program`) REFERENCES `program` (`id`),
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`subprogram`) REFERENCES `subprogram` (`id`);

--
-- Constraints for table `plan_activity_all`
--
ALTER TABLE `plan_activity_all`
  ADD CONSTRAINT `plan_activity_all_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `user` (`uuid`);

--
-- Constraints for table `plan_activity_site`
--
ALTER TABLE `plan_activity_site`
  ADD CONSTRAINT `plan_activity_site_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `site` (`id`),
  ADD CONSTRAINT `plan_activity_site_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`),
  ADD CONSTRAINT `plan_activity_site_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `user` (`uuid`);

--
-- Constraints for table `site`
--
ALTER TABLE `site`
  ADD CONSTRAINT `site_ibfk_1` FOREIGN KEY (`kabupaten`) REFERENCES `kabupaten` (`id`),
  ADD CONSTRAINT `site_ibfk_2` FOREIGN KEY (`do_subdepartemen`) REFERENCES `do_subdepartemen` (`id`),
  ADD CONSTRAINT `site_ibfk_3` FOREIGN KEY (`ns_departemen`) REFERENCES `ns_departemen` (`id`),
  ADD CONSTRAINT `site_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `user` (`uuid`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`ns_departemen`) REFERENCES `ns_departemen` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
