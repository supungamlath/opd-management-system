USE OPDdb;

INSERT INTO User (Username, Password, Role) VALUES
('admin', 'admin123', 'System Admin'),
('johnDoe', 'password123', 'Patient'),
('janeSmith', 'password456', 'Healthcare Professional');


INSERT INTO System_Admin (User_ID, First_Name, Last_Name, Email, Phone_Number) VALUES
(1, 'Anoshan', 'Jayahanthan', 'johndoe@example.com', '123-456-7890');

INSERT INTO Patient (User_ID, First_Name, Last_Name, NIC, Address, Email, Gender, DOB) VALUES
(2, 'John', 'Doe', '1234567890', '123 Main St', 'janesmith@example.com', 'Female', '1990-01-01');

INSERT INTO Healthcare_Professional (User_ID, First_Name, Last_Name, Email, Phone_Number, Role) VALUES
(3, 'Chathura', 'Gunasekara', 'chathura@example.com', '555-555-5555', 'Doctor');