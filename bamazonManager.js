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
  inquirer.prompt([{
    name: "choice",
    type: "list",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ],
    message: "Select a manager option:"
  }]).then(function(answer) {
    switch (answer.choice) {
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
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(
        "\n" +
        "+--------------------------+\n" +
        "|   MANAGER PRODUCT VIEW   |\n" +
        "+--------------------------+"
      );
      for (let i = 0; i < res.length; i++) {
        console.log(
          "\n" +
          `-------------------------------- ITEM ${res[i].item_id}\n` +
          '|| Product: ' + res[i].product_name + "\n" +
          '|| Depart.: ' + res[i].department_name + "\n" +
          '|| Price: $' + res[i].price.toFixed(2) + "\n" +
          '|| Stock: ' + res[i].stock_quantity + "\n" +
          "--------------------------------"
        );
      }
    });
  }

  function viewLowInventory() {
    console.log("option 2");
  }

  function addInventory() {
    console.log("option 3");
  }

  function addNewProduct() {
    console.log("option 4");
  }
