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
    managerContinue();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    console.log(
      "\n" +
      "+-------------------------+\n" +
      "|    VIEW LOW INVENTORY   |\n" +
      "+-------------------------+"
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
    managerContinue();
  });
}

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(
      "\n" +
      "+-------------------------+\n" +
      "|     ADD TO INVENTORY    |\n" +
      "+-------------------------+\n"
    );
    for (let i = 0; i < res.length; i++) {
      console.log(`ID: ${res[i].item_id} || PRODUCT: ${res[i].product_name} || STOCK: ${res[i].stock_quantity}`);
    }
    console.log("");

    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter ID of item you would like to increase:"
      },
      {
        name: "quantity",
        type: "input",
        message: "Enter quantity to add:"
      }
    ]).then(function(answer) {
      let query = `UPDATE products SET stock_quantity=stock_quantity+${parseInt(answer.quantity)} WHERE item_id=${parseInt(answer.id)}`;
      connection.query(query, function(error) {
        if (error) throw error;
        // console.log(`\nSuccessfully increased Item ${answer.id} by ${answer.quantity} units!`);
      });

      inquirer.prompt([{
        name: "continueAdding",
        type: "confirm",
        message: "Would you like to continue adding to inventory?",
        default: true
      }]).then(function(answer) {
        if (answer.continueAdding) {
          addInventory();
        } else {
          managerContinue();
        }
      });
    });

  });

}

function addNewProduct() {
  console.log("option 4");
}

// helper functions


function managerContinue() {
  inquirer.prompt([{
    type: "confirm",
    name: "continue",
    message: "Return to Manager Options?",
    default: true
  }]).then(function(answer) {
    if (answer.continue) {
      displayManagerOptions();
    } else {
      console.log("\nTHANK YOU, GOODBYE!")
    }
  });
}