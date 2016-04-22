/*
DROP TABLE IF EXISTS player_info;
DROP TABLE IF EXISTS unit;
DROP TABLE IF EXISTS tower;
DROP TABLE IF EXISTS gold;
*/
DROP TABLE IF EXISTS unit;

CREATE TABLE unit
(
	unit_id int(11) NOT NULL AUTO_INCREMENT,
	code varchar(255) NOT NULL,
	x_coord int NOT NULL,
	y_coord int NOT NULL,
	health int NOT NULL,
	PRIMARY KEY (unit_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;