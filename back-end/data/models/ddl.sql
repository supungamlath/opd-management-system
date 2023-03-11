DROP DATABASE IF EXISTS OPDdb;
CREATE DATABASE OPDdb;
USE OPDdb;


CREATE TABLE `User` (
  `User_ID` INT NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL UNIQUE,
  `Password` varchar(100) NOT NULL,
  `Role` ENUM('Patient', 'Healthcare Professional', 'System Admin'),
  PRIMARY KEY (`User_ID`)
);

CREATE TABLE `System_Admin` (
  `Admin_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT,
  `First_Name` varchar(25) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  `Email` varchar(100) NOT NULL UNIQUE,
  `Phone_Number` varchar(15),
  PRIMARY KEY (`Admin_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)  
);

CREATE TABLE `Patient` (
  `Patient_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT,
  `First_Name` varchar(25) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  `NIC` varchar(20) NOT NULL UNIQUE,
  `Address` varchar(80) NOT NULL,
  `Email` varchar(100) NOT NULL UNIQUE,
  `Gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `DOB` DATE,
  PRIMARY KEY (`Patient_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)
);

CREATE TABLE `Healthcare_Professional` (
  `Healthcare_Professional_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT NOT NULL,
  `First_Name` varchar(25) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  `Email` varchar(100) NOT NULL UNIQUE,
  `Phone_Number` varchar(15) NOT NULL,
  `Role` varchar(30) NOT NULL,
  PRIMARY KEY (`Healthcare_Professional_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)
);

CREATE TABLE `Patient_Record` (
  `Record_ID` INT NOT NULL AUTO_INCREMENT,
  `Patient_ID` INT NOT NULL,
  `Healthcare_Professional_ID` INT NOT NULL,
  `Disease_Reason` varchar(40) NOT NULL,
  `Prescriptions` varchar(200) NOT NULL,
  `Treatment_Plans` varchar(200) NOT NULL,
  `Progress_Notes` varchar(200) NOT NULL,
  PRIMARY KEY (`Record_ID`),
  FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`),
  FOREIGN KEY (`Healthcare_Professional_ID`) REFERENCES `Healthcare_Professional`(`Healthcare_Professional_ID`)
);

CREATE TABLE `Appointment` (
  `Appointment_ID` INT NOT NULL AUTO_INCREMENT,
  `Appointment_Date` DATE NOT NULL,
  `Appointment_Time` TIME NOT NULL,
  `Patient_ID` INT NOT NULL,
  `Healthcare_Professional_ID` INT NOT NULL,
  `status` ENUM('Pending', 'Accepted', 'Declined', 'Cancelled', 'Completed'),
  PRIMARY KEY (`Appointment_ID`),
  FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`),
  FOREIGN KEY (`Healthcare_Professional_ID`) REFERENCES `Healthcare_Professional`(`Healthcare_Professional_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);
