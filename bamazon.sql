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
VALUES ("Apathist Cookbook", "books", 14.99, 100);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Oxy Wow!", "Home Supplies", 19.99, 789);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Rino Epoxy 16oz", "Office Supplies", 9.99, 1278);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Rino Epoxy 7.5oz", "Office Supplies", 4.99, 1435);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Schmavideo 20XD6", "Electronics", 1337.99, 150);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Samurai Food Processor", "Appliances", 214.99, 456);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Trendster Watch", "Apparel & Accessories", 99.99, 42);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Pool for Fools", "books", 9.99, 208);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("HAM 90KX Turbo Edition", "Electronics", 199.99, 999);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Benny Luce Collectors Ed", "Electronics", 42.69, 1);
