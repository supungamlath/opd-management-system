CREATE DATABASE IF NOT EXISTS OPDdb;
USE OPDdb;

CREATE TABLE IF NOT EXISTS  `system_admin` (
  `admin_ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE, 
  `password` VARCHAR(256) NOT NULL, 
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `phone_number` varchar(15),
  PRIMARY KEY (`admin_ID`)
);

CREATE TABLE IF NOT EXISTS `patient` (
  `patient_ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE, 
  `password` VARCHAR(256) NOT NULL, 
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `nic` varchar(20) NOT NULL UNIQUE,
  `address` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `dob` DATE,
  `appointments` Int Default 10,
  PRIMARY KEY (`patient_ID`)
);

CREATE TABLE IF NOT EXISTS `healthcare_professional` (
  `professional_ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE, 
  `password` VARCHAR(256) NOT NULL, 
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `phone_number` varchar(15) NOT NULL,
  `role` varchar(30) NOT NULL,
  PRIMARY KEY (`professional_ID`)
);

CREATE TABLE IF NOT EXISTS `patient_record` (
  `record_ID` INT NOT NULL AUTO_INCREMENT,
  `patient_ID` INT NOT NULL,
  `professional_ID` INT NOT NULL,
  `disease_Reason` varchar(40) NOT NULL,
  `prescriptions` varchar(200) NOT NULL,
  `treatment_Plans` varchar(200) NOT NULL,
  `progress_Notes` varchar(200) NOT NULL,
  PRIMARY KEY (`record_ID`),
  FOREIGN KEY (`patient_ID`) REFERENCES `patient`(`patient_ID`),
  FOREIGN KEY (`professional_ID`) REFERENCES `healthcare_professional`(`professional_ID`)
);

CREATE TABLE IF NOT EXISTS `appointment` (
  `appointment_ID` INT NOT NULL AUTO_INCREMENT,
  `appointment_date` DATE NOT NULL,
  `appointment_time` TIME NOT NULL,
  `patient_ID` INT NOT NULL,
  `professional_ID` INT NOT NULL,
  `status` ENUM('Pending', 'Accepted', 'Arrived', 'Missed', 'Declined', 'Cancelled', 'Completed'),
  PRIMARY KEY (`appointment_ID`),
  FOREIGN KEY (`patient_ID`) REFERENCES `patient`(`patient_ID`),
  FOREIGN KEY (`professional_ID`) REFERENCES `healthcare_professional`(`professional_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Indexes

-- CREATE INDEX `appointment_ID` ON `user` (`username`);
-- CREATE INDEX `user_role` ON `user` (`role`);


-- Funcitons

-- Users for the database
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
flush privileges;
CREATE USER 'patient'@'localhost' IDENTIFIED BY 'patient';
flush privileges;
CREATE USER 'professional'@'localhost' IDENTIFIED BY 'professional';
flush privileges;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
flush privileges;

-- Grant all priviledges for all users
grant all privileges on OPDdb.* to 'root'@'localhost';
grant all privileges on OPDdb.healthcare_professional to 'admin'@'localhost';

grant update on OPDdb.healthcare_professional to 'professional'@'localhost';
grant all privileges on OPDdb.appointment to 'professional'@'localhost';

grant all privileges on OPDdb.patient to 'patient'@'localhost'; 
grant all privileges on OPDdb.appointment to 'patient'@'localhost'; 