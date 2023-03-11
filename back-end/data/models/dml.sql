DROP DATABASE IF EXISTS OPDdb;
CREATE DATABASE OPDdb;
USE OPDdb;


CREATE TABLE `User` (
  `User_ID` INT NOT NULL AUTO_INCREMENT,
  `Username` varchar(100),
  `Password` varchar(100),
  `Email` varchar(100),
  `Role` ENUM('Patient', 'Healthcare Professional', 'System Admin'),
  PRIMARY KEY (`User_ID`)
);

CREATE TABLE `System Admin` (
  `Admin_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT,
  `First_Name` varchar(25),
  `Last_Name` varchar(25),
  `Email` varchar(100),
  `Phone_Number` varchar(15),
  PRIMARY KEY (`Admin_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)  
);

CREATE TABLE `Patient` (
  `Patient_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT,
  `First_Name` varchar(25),
  `Last_Name` varchar(25),
  `Address` varchar(80),
  `Gender` ENUM('Male', 'Female', 'Other'),
  `DOB` DATE,
  PRIMARY KEY (`Patient_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)
);

CREATE TABLE `Healthcare Professional` (
  `Healthcare_Professional_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT,
  `First_Name` varchar(25),
  `Last_Name` varchar(25),
  `Email` varchar(15),
  `Phone_Number` varchar(15),
  `Role` varchar(30),
  PRIMARY KEY (`Healthcare_Professional_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)
);

CREATE TABLE `Patient Record` (
  `Record_ID` INT NOT NULL AUTO_INCREMENT,
  `Patient_ID` INT,
  `Healthcare_Professional_ID` INT,
  `Disease_Reason` varchar(40),
  `Prescriptions` varchar(200),
  `Treatment_Plans` varchar(200),
  `Progress_Notes` varchar(200),
  PRIMARY KEY (`Record_ID`),
  FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`),
  FOREIGN KEY (`Healthcare_Professional_ID`) REFERENCES `Healthcare Professional`(`Healthcare_Professional_ID`)
);

CREATE TABLE `Appointment` (
  `Appointment_ID` INT NOT NULL AUTO_INCREMENT,
  `Appointment_Date` DATE,
  `Appointment_Time` TIME,
  `Patient_ID` INT,
  `Healthcare_Professional_ID` INT,
  `status` ENUM('Pending', 'Accepted', 'Declined', 'Cancelled', 'Completed'),
  PRIMARY KEY (`Appointment_ID`),
  FOREIGN KEY (`Patient_ID`) REFERENCES `Patient`(`Patient_ID`),
  FOREIGN KEY (`Healthcare_Professional_ID`) REFERENCES `Healthcare Professional`(`Healthcare_Professional_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);
