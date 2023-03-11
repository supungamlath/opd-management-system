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
  `appointments` INT Default 10,
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
  `status` ENUM('Pending', 'Accepted', 'Arrived', 'Missed', 'Declined', 'Cancelled', 'Completed') ,
  PRIMARY KEY (`appointment_ID`),
  FOREIGN KEY (`patient_ID`) REFERENCES `patient`(`patient_ID`),
  FOREIGN KEY (`professional_ID`) REFERENCES `healthcare_professional`(`professional_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Indexes

-- CREATE INDEX `appointment_ID` ON `user` (`username`);
-- CREATE INDEX `user_role` ON `user` (`role`);


-- Funcitons

-- Users
grant all privileges on bank.* to 'admin'@'localhost';

grant select on bank.* to 'manager'@'localhost';
grant insert, update, select on loan to 'manager'@'localhost';

grant select on bank.* to 'employee'@'localhost';
grant insert, select on loan to 'employee'@'localhost';

grant select on bank.* to 'customer'@'localhost';
grant insert, select on online_loan to 'customer'@'localhost';
grant insert, select on transfer to 'customer'@'localhost';
grant update, select on online_loan_installment to 'customer'@'localhost';
grant update, select on loan_installment to 'customer'@'localhost';

