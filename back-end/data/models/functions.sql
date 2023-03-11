-- Events
CREATE EVENT update_appointments
    ON SCHEDULE EVERY 10 MINUTE
    STARTS '2023-01-01 00:00:00'
    DO
      UPDATE patient
      SET appointments = 10;

ALTER EVENT update_appointments
    ENABLE;