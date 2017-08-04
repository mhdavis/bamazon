DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  over_head_costs INTEGER NOT NULL
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Athletics", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cosmetics", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Outdoors", 700);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Personal Care", 300);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Kitchen", 200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Improvement", 100);
