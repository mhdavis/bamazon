const mysql = require("mysql");
const inquirer = require("inquirer");
const serverParams = require("./config.js");

let connection = mysql.createConnection(serverParams);
let customerTotal = 0;

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    commenceShop();
  }
});

function commenceShop() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
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
    processOrder();
  });
}

function processOrder() {
  console.log("\n");
  inquirer.prompt([{
      name: "idSelected",
      type: "input",
      message: "Product ID for purchase:"
    },
    {
      name: "quantitySelected",
      type: "input",
      message: "Desired quantity for purchase:",
      validate: function(value) {
        if (parseInt(value) >= 0) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answer) {
    connection.query("SELECT * FROM products", function(err, res) {
      let parsedId = parseInt(answer.idSelected);
      let idIndex = parsedId - 1;
      if (res[idIndex]) {
        let storeStock = res[idIndex].stock_quantity;
        let desiredAmount = answer.quantitySelected;

        if (storeStock >= desiredAmount) {
          customerTotal += parseFloat(res[idIndex].price) * parseFloat(answer.quantitySelected);
          removeFromStock(answer);
          console.log("\nTotal Cost = $" + String(customerTotal.toFixed(2)) + "\n");
          continueOrStop();
        } else {
          console.log(`\nProduct ID ${answer.idSelected}: Insufficient Quantity!`);
          processOrder();
        }
      } else {
        console.log(`\nSorry! No Product with ID: [ ${answer.idSelected} ] Found!`);
        processOrder();
      }
    });
  });
}

function removeFromStock(ans) {
  let rfsQuery = `UPDATE products SET stock_quantity=stock_quantity-${parseInt(ans.quantitySelected)} WHERE item_id=${parseInt(ans.idSelected)}`;
  connection.query(rfsQuery, function(err) {
    if (err) throw err;
  });
}

function continueOrStop() {
  inquirer.prompt([{
    name: "continue",
    type: "confirm",
    message: "Would you like to continue shopping?",
    default: true
  }]).then(function(reply) {
    if (reply.continue) {
      commenceShop();
    } else {
      console.log("\nFinal Total Cost = $" + String(customerTotal.toFixed(2)) + "\n");
      console.log("--- THANK YOU FOR SHOPPING, HAVE A NICE DAY! ---")
    }
  });
}
