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
        "Add New Product"
      ],
      message: "Select a manager option:"
    }
  ]).then(function (answers) {
    switch (answer.choices) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addNewProduct();
        break;
    }
  });
}

function viewProducts() {

}

function viewLowInventory() {

}

function addInventory() {

}

function addNewProduct() {
  
}
