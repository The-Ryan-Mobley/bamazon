USE bamazon;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30) NOT NULL,
overhead_cost DECIMAL(10,2) NOT NULL,
product_sales DECIMAL(10,2) NOT NULL,
PRIMARY KEY(department_id)
);
INSERT INTO departments(department_name,overhead_cost,product_sales)
VALUES ('Apparel & Accessories', 20000.00,0.00),('books', 8000.00,0.00),
('Electronics', 45000.00,0.00),('Office Supplies',5000.00,0.00),('Appliances',68000.00,0.00);
