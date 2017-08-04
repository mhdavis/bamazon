const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const serverParams = require("./config.js");
const tableChars = require("./tableChars.js");

let connection = mysql.createConnection(serverParams);

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    displaySupervisorOptions();
  }
});

function displaySupervisorOptions() {
  inquirer.prompt([{
    name: "choice",
    type: "list",
    choices: [
      "View Products Sales by Department",
      "Create New Department"
    ],
    message: "Select a manager option:"
  }]).then(function(answer) {
    switch (answer.choice) {
      case "View Products Sales by Department":
        viewProductSales();
        break;
      case "Create New Department":
        createDepartment();
        break;
    }
  });
}

function viewProductSales() {
  let query =
    `SELECT department_id,
   department_name,
   over_head_costs,
   SUM(product_sales) AS department_sales,
   SUM(product_sales) - departments.over_head_costs AS total_profit
  FROM products
  INNER JOIN departments ON departments.id = products.department_id
  GROUP BY department_id`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(
      "\n" +
      "+---------------------+\n" +
      "|   SUPERVISOR VIEW   |\n" +
      "+---------------------+\n"
    );

    let table = new Table({
      chars: tableChars,
      head: ["ID", "Department", "Overhead Costs", "Department Sales", "Total Profit"],
      colWidths: [5, 20, 20, 20, 20]
    });

    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].department_id,
        res[i].department_name,
        res[i].over_head_costs,
        res[i].department_sales,
        res[i].total_profit
      ]);
    }
    console.log(table.toString());

  });
}

function addNewDepartment() {
  inquirer.prompt([{
      name: "departmentName",
      type: "input",
      message: "Enter a new department name:"
    },
    {
      name: "overheadCost",
      type: "input",
      message: "Enter overhead cost:",
      validate: function(value) {
        let flt = parseFloat(value);
        if (typeof flt === 'number') {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answers) {
    let query =
      `INSERT INTO departments (department_name, over_head_cost)
    VALUES (${answers.departmentName}, ${parseInt(answers.overheadCost)})`;
    connection.query(query, function(err) {
      if (err) throw err;

      inquirer.prompt([{
        name: "continueAddingDepartments",
        type: "confirm",
        message: "Would you like to continue adding new departments?",
      }]).then(function(answer) {
        if (answer.continueAddingDepartments) {
          addNewDepartment();
        } else {
          supervisorContinue();
        }
      });
    });

  });
}

function supervisorContinue() {

}
