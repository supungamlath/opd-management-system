-- Create 
CREATE DEFINER=`root`@`localhost` TRIGGER `online_loan_AFTER_INSERT` AFTER INSERT ON `online_loan` FOR EACH ROW BEGIN
  DECLARE i int;
  DECLARE installment int;
  set i = 1;
  set installment = new.amount * (1+new.interestRate) / new.timePeriod;
  
  if new.role == "Patient" do
  
  while i <= new.timePeriod*12 do
	insert into online_loan_installment(onlineLoanID, payment, date, installmentNumber, status)
    values (new.ID, installment, adddate(new.applyDate, interval i month), i, 'UnPaid');
    set i = i+1;
 end while;
END


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
RETURNS INT DETERMINISTIC
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
