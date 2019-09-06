DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(8 , 2 ),
    stock_qty INTEGER(10),
    PRIMARY KEY (id)
);
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Apathist Cookbook", "books", 14.99, 100), ("Oxy Wow!", "Home Supplies", 19.99, 789),
("Rino Epoxy 16oz", "Office Supplies", 9.99, 1278), ("Rino Epoxy 7.5oz", "Office Supplies", 4.99, 1435),
("Schmavideo 20XD6", "Electronics", 1337.99, 150), ("Samurai Food Processor", "Appliances", 214.99, 456),
("Trendster Watch", "Apparel & Accessories", 99.99, 42), ("Pool for Fools", "books", 9.99, 208),
("HAM 90KX Turbo Edition", "Electronics", 199.99, 999), ("Benny Luce Collectors Ed", "Electronics", 42.69, 1);
