USE bamazon;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    user_type VARCHAR(30),
    
    PRIMARY KEY (id)
);
