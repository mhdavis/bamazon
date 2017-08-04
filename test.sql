SELECT SUM(stock_quantity) FROM products WHERE department_name="Athletics";

SELECT SUM(product_sales) FROM products WHERE department_name="Athletics";

/*Total sales across all departments and group by department name*/
SELECT department_name, SUM(product_sales) FROM products GROUP BY department_name;

/*Joins with departments*/
SELECT department_name, SUM(product_sales) AS products_sold
FROM products
INNER JOIN departments ON departments.id = products.department_id
GROUP BY department_name;

/*Query for Supervisor*/
SELECT department_id,
 department_name,
 over_head_costs,
 SUM(product_sales) AS department_sales,
 SUM(product_sales) - departments.over_head_costs AS total_profit
FROM products
INNER JOIN departments ON departments.id = products.department_id
GROUP BY department_id;

/*Query for products display*/
SELECT
products.id,
products.name,
departments.name,
products.price,
products.stock_quantity,
product.sales
FROM products, departments
INNER JOIN departments ON departments.id = products.department_id
GROUP BY products.id;
