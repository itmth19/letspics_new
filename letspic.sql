-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2014 年 9 朁E08 日 02:08
-- サーバのバージョン： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `letspic`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `friendlist`
--

CREATE TABLE IF NOT EXISTS `friendlist` (
  `ID1` int(11) NOT NULL,
  `ID2` int(11) NOT NULL,
  PRIMARY KEY (`ID1`,`ID2`),
  KEY `ID1` (`ID1`,`ID2`),
  KEY `ID2` (`ID2`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- テーブルの構造 `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fromID` int(11) NOT NULL,
  `toID` int(11) NOT NULL,
  `isRead` int(1) NOT NULL DEFAULT '0',
  `message` text COMMENT '文書',
  `imgName` text COMMENT '画像のファイル名',
  `replyMsgID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fromID` (`fromID`),
  KEY `fromID_2` (`fromID`),
  KEY `toID` (`toID`),
  KEY `replyMsgID` (`replyMsgID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FacebookID` bigint(21) NOT NULL,
  `name` text NOT NULL,
  `country` text NOT NULL,
  `sex` text NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `FacebookID` (`FacebookID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `friendlist`
--
ALTER TABLE `friendlist`
  ADD CONSTRAINT `friendlist_ibfk_2` FOREIGN KEY (`ID2`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `friendlist_ibfk_1` FOREIGN KEY (`ID1`) REFERENCES `users` (`ID`);

--
-- テーブルの制約 `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`toID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`replyMsgID`) REFERENCES `messages` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
