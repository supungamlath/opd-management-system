-- create the tables of the database
drop database opdDB;
create database opdDB;
use opdDB;
-- create the tables of the database

CREATE TABLE user (
  user_ID        INT NOT NULL AUTO_INCREMENT,
  email         VARCHAR(30) NOT NULL,
  username      VARCHAR(30) NOT NULL,
  password      VARCHAR(256) NOT NULL,
  role          VARCHAR(256) NOT NULL
    check (type in ('patient', 'admin', 'prof')),
  PRIMARY KEY(ID),
  UNIQUE(username),
  UNIQUE(email)
);