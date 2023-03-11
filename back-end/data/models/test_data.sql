-- delete data from existing tables
USE opdDB;
delete from user;

insert into user (email, username, password, role) values ('chathura@gmail.com','Chathura','12345','patient');
insert into user (email, username, password, role) values ('isuru@gmail.com','Isuru','12345','admin');
insert into user (email, username, password, role) values ('anoshan@gmail.com','Anoshan','12345','prof');