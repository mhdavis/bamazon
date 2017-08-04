DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  department_id INTEGER NOT NULL,
  price FLOAT(12, 2),
  stock_quantity INTEGER NOT NULL,
  product_sales INTEGER NOT NULL,
  PRIMARY KEY(id)
);

/*
Athletics - 1
Cosmetics - 2
Outdoors - 3
Personal Care - 4
Kitchen - 5
Home Improvement - 6
*/

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Bowl", 5, 10.00, 100, 20);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Baseball Glove", 1, 25.00, 30, 1000);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Baseball Bat", 5, 40.00, 10, 80);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Lipstick", 2, 15.00, 10, 30);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Nail Polish", 2, 5.00, 10, 20);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Eye Shadow", 2, 10.00, 10, 50);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Lawn Mower", 3, 200.00, 5, 10);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Weed Wacker", 3, 100.00, 10, 20);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Shampoo", 4, 10.00, 30, 100);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Conditioner", 4, 10.00, 30, 100);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Body Wash", 4, 10.00, 30, 50);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Sponge", 4, 15.00, 30, 100);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Lacrosse Stick", 1, 120.00, 20, 60);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Spatula", 5, 10.00, 20, 20);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Plunger", 6, 20.00, 30, 40);

INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
VALUES ("Fan", 6, 20.00, 10, 20);
