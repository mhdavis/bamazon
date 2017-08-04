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
  connection.query(query2, function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}

function createDepartment() {

}
