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