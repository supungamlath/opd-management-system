USE OPDdb;

INSERT INTO user (Username, Password, Role) VALUES
('admin', '$2a$10$CwTycUXWue0Thq9StjUM0uQ4dVJ4kdSBYfX8R1mXHu0dyj16Fc.ja', 'System Admin'), -- password - admin123
('johnDoe', '$2a$10$CwTycUXWue0Thq9StjUM0uMFnO06ozXGXxrQcSM7aHnSUdwrEDG/u', 'Patient'), -- password - password123
('janeSmith', '$2a$10$CwTycUXWue0Thq9StjUM0uI9IfHw/yXeJwyos8R.HMupooqnU8GGm', 'Healthcare Professional'); -- password - password456

INSERT INTO system_admin (user_ID, first_name, last_name, email, phone_number) VALUES
(1, 'Anoshan', 'Jayahanthan', 'johndoe@example.com', '123-456-7890');

INSERT INTO patient (user_ID, first_name, last_name, nic, address, email, gender, dob) VALUES
(2, 'John', 'Doe', '1234567890', '123 Main St', 'janesmith@example.com', 'Female', '1990-01-01');

INSERT INTO healthcare_professional (user_ID, first_name, last_name, email, phone_Number, role) VALUES
(3, 'Chathura', 'Gunasekara', 'chathura@example.com', '555-555-5555', 'Doctor');

INSERT INTO patient_record (patient_ID, healthcare_Professional_ID, disease_Reason, prescriptions, treatment_Plans, progress_Notes) VALUES
(1, 1, 'Fever', 'Ibuprofen', 'Rest and hydration', 'Patient feels better after taking medication');


INSERT INTO appointment (appointment_Date, appointment_Time, patient_ID, healthcare_professional_ID, status) VALUES
('2023-03-15', '10:00:00', 1, 1, 'Pending'),
('2023-03-20', '14:30:00', 1, 1, 'Accepted');