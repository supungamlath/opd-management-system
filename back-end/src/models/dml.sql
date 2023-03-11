USE OPDdb;

INSERT INTO system_admin (username, password, first_name, last_name, email, phone_number) VALUES
('Anoshan', '123456','Anoshan', 'Jayahanthan', 'johndoe@example.com', '123-456-7890');

INSERT INTO patient (username, password, first_name, last_name, nic, address, email, gender, dob) VALUES
('JohnDoe', '123456', 'John', 'Doe', '1234567890', '123 Main St', 'janesmith@example.com', 'Female', '1990-01-01');

INSERT INTO healthcare_professional (username, password, first_name, last_name, email, phone_Number, role) VALUES
('Chathura', '123456', 'Chathura', 'Gunasekara', 'chathura@example.com', '555-555-5555', 'Doctor');

INSERT INTO patient_record (patient_ID, professional_ID, disease_Reason, prescriptions, treatment_Plans, progress_Notes) VALUES
(1, 1, 'Fever', 'Ibuprofen', 'Rest and hydration', 'Patient feels better after taking medication');


INSERT INTO appointment (appointment_Date, appointment_Time, patient_ID, professional_ID, status) VALUES
('2023-03-15', '10:00:00', 1, 1, 'Pending'),
('2023-03-20', '14:30:00', 1, 1, 'Accepted');