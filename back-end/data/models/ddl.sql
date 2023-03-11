DROP DATABASE IF EXISTS OPDdb;
CREATE DATABASE OPDdb;
USE OPDdb;


CREATE TABLE `user` (
  `user_ID` INT NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL,
  `role` ENUM('Patient', 'Healthcare Professional', 'System Admin'),
  PRIMARY KEY (`user_ID`)
);

CREATE TABLE `system_admin` (
  `admin_ID` INT NOT NULL AUTO_INCREMENT,
  `user_ID` INT,
  `first_name` varchar(25) NOT NULL,
  `last_Name` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `phone_number` varchar(15),
  PRIMARY KEY (`admin_iD`),
  FOREIGN KEY (`user_iD`) REFERENCES `user`(`user_id`)  
);

CREATE TABLE `patient` (
  `patient_ID` INT NOT NULL AUTO_INCREMENT,
  `user_ID` INT,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `nic` varchar(20) NOT NULL UNIQUE,
  `address` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `dob` DATE,
  PRIMARY KEY (`patient_ID`),
  FOREIGN KEY (`user_ID`) REFERENCES `user`(`user_ID`)
);

CREATE TABLE `healthcare_professional` (
  `healthcare_professional_ID` INT NOT NULL AUTO_INCREMENT,
  `user_ID` INT NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `phone_number` varchar(15) NOT NULL,
  `role` varchar(30) NOT NULL,
  PRIMARY KEY (`healthcare_professional_ID`),
  FOREIGN KEY (`user_ID`) REFERENCES `user`(`user_ID`)
);

CREATE TABLE `patient_record` (
  `record_ID` INT NOT NULL AUTO_INCREMENT,
  `patient_ID` INT NOT NULL,
  `healthcare_Professional_ID` INT NOT NULL,
  `disease_Reason` varchar(40) NOT NULL,
  `prescriptions` varchar(200) NOT NULL,
  `treatment_Plans` varchar(200) NOT NULL,
  `progress_Notes` varchar(200) NOT NULL,
  PRIMARY KEY (`record_ID`),
  FOREIGN KEY (`patient_ID`) REFERENCES `patient`(`patient_ID`),
  FOREIGN KEY (`healthcare_professional_ID`) REFERENCES `healthcare_professional`(`healthcare_professional_ID`)
);

CREATE TABLE `appointment` (
  `appointment_ID` INT NOT NULL AUTO_INCREMENT,
  `appointment_date` DATE NOT NULL,
  `appointment_time` TIME NOT NULL,
  `patient_ID` INT NOT NULL,
  `healthcare_professional_ID` INT NOT NULL,
  `status` ENUM('Pending', 'Accepted', 'Arrived', 'Missed', 'Declined', 'Cancelled', 'Completed'),
  PRIMARY KEY (`appointment_ID`),
  FOREIGN KEY (`patient_ID`) REFERENCES `patient`(`patient_ID`),
  FOREIGN KEY (`healthcare_Professional_ID`) REFERENCES `healthcare_professional`(`healthcare_professional_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Indexes

CREATE INDEX `appointment_date` ON `appointment` (`appointment_date`);
CREATE INDEX `appointment_status` ON `appointment` (`appointment_status`);


-- Functions

DELIMITER //
CREATE FUNCTION insert_user(
    p_username VARCHAR(100),
    p_password VARCHAR(100),
    p_role ENUM('Patient', 'Healthcare Professional', 'System Admin'),
    p_first_name VARCHAR(25),
    p_last_name VARCHAR(25),
    p_email VARCHAR(100),
    p_phone_number VARCHAR(15),
    p_nic VARCHAR(20),
    p_address VARCHAR(80),
    p_gender ENUM('Male', 'Female', 'Other'),
    p_dob DATE
)
RETURNS INT
BEGIN
    DECLARE user_id INT;
    
    -- Insert user data into user table
    INSERT INTO user (username, password, role)
    VALUES (p_username, p_password, p_role);
    
    -- Retrieve ID of newly inserted user
    SET user_id = LAST_INSERT_ID();
    
    -- Insert remaining data into appropriate table
    CASE p_role
        WHEN 'Patient' THEN
            INSERT INTO patient (user_ID, first_name, last_name, email, phone_number, nic, address, gender, dob)
            VALUES (user_id, p_first_name, p_last_name, p_email, p_phone_number, p_nic, p_address, p_gender, p_dob);
        WHEN 'Healthcare Professional' THEN
            INSERT INTO healthcare_professional (user_ID, first_name, last_name, email, phone_number, role)
            VALUES (user_id, p_first_name, p_last_name, p_email, p_phone_number, 'healthcare professional');
        WHEN 'System Admin' THEN
            INSERT INTO system_admin (user_ID, first_name, last_name, email, phone_number)
            VALUES (user_id, p_first_name, p_last_name, p_email, p_phone_number);
    END CASE;
    
    RETURN user_id;
END //
DELIMITER ;

