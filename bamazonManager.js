const mysql = require("mysql");
const inquirer = require("inquirer");
const serverParams = require("./config.js");

let connection = mysql.createConnection(serverParams);

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    displayManagerOptions();
  }
});

function displayManagerOptions() {
  inquirer.prompt([
    {
      name: "choice",
      type: "list",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add to Product"
      ],
      message: "Select a manager option:"
    }
  ]).then(function (answers) {
    console.log(answers.choice);
  });
}
