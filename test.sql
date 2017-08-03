DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  department_id INTEGER AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  over_head_costs INTEGER NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Athletics", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cosmetics", 20000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Outdoors", 30000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Personal Care", 40000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Kitchen", 50000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Improvement", 60000);
