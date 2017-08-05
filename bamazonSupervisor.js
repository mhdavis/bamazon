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
        createNewDepartment();
        break;
    }
  });
}

function viewProductSales() {
  let query =
    `
    SELECT departments.id,
    department_name,
    over_head_costs,
    SUM(product_sales) AS department_sales,
    SUM(product_sales) - departments.over_head_costs AS total_profit
    FROM departments
    LEFT JOIN products ON departments.id = products.department_id
    GROUP BY departments.id;
    `;
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
      if (res[i].total_profit === null && res[i].department_sales === null) {
        table.push([
          res[i].id,
          res[i].department_name,
          res[i].over_head_costs,
          0,
          0
        ]);
      } else {
        table.push([
          res[i].id,
          res[i].department_name,
          res[i].over_head_costs,
          res[i].department_sales,
          res[i].total_profit
        ]);
      }
    }
    console.log(table.toString());
    supervisorContinue();
  });
}

function createNewDepartment() {
  inquirer.prompt([{
      name: "departmentName",
      type: "input",
      message: "Enter a new department name:"
    },
    {
      name: "overheadCost",
      type: "input",
      message: "Enter overhead cost ($):",
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
    `
    INSERT INTO departments (department_name, over_head_costs)
    VALUES ("${answers.departmentName}", ${parseFloat(answers.overheadCost)})
    `;
    connection.query(query, function(err, res) {
      if (err) throw err;
      if (res.affectedRows > 0) {
        console.log(`\nSuccessfully added ${answers.departmentName} department!`);
      } else {
        console.log(`\nError: department creation unsuccessful`);
      }

      inquirer.prompt([{
        name: "continueAddingDepartments",
        type: "confirm",
        message: "Would you like to continue adding new departments?",
      }]).then(function(answer) {
        if (answer.continueAddingDepartments) {
          createNewDepartment();
        } else {
          supervisorContinue();
        }
      });
    });

  });
}

function supervisorContinue() {
  inquirer.prompt([{
    name: "continue",
    type: "confirm",
    message: "Return to Supervisor Options?",
    default: true
  }]).then(function(answer) {
    if (answer.continue) {
      displaySupervisorOptions();
    } else {
      console.log("\n-- THANK YOU, GOODBYE! --");
    }
  });
}
