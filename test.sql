SELECT SUM(stock_quantity) FROM products WHERE department_name="Athletics";

SELECT SUM(product_sales) FROM products WHERE department_name="Athletics";

/*Total sales across all departments and group by department name*/
SELECT department_name, SUM(product_sales) FROM products GROUP BY department_name;

/*Joins with departments*/
SELECT department_name, SUM(product_sales)
FROM products
GROUP BY department_name
INNER JOIN departments ON departments.department_name = products.department_name;
