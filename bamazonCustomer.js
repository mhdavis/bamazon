const mysql = require("mysql");
const inquirer = require("inquirer");
const serverParams = require("./config.js");

let connection = mysql.createConnection(serverParams);

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    connection.query("SELECT * FROM products", function (err, res) {
      const customerTotal = 0;
      if (err) throw err;
      for (let i=0; i < res.length; i++) {
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
      customerProcess();
    });
  }
});

function customerProcess() {
  console.log("\n");
  inquirer.prompt([
    {
      name: "idSelected",
      type: "input",
      message: "Product ID for purchase:"
    },
    {
      name: "quantitySelected",
      type: "input",
      message: "Desired quantity for purchase:"
    }
  ]).then(function (answer) {
    connection.query("SELECT * FROM products", function (err, res) {
      let parsedId = parseInt(answer.idSelected) - 1;
      let storeStock = res[parsedId].stock_quantity;
      let desiredAmount = answer.quantitySelected;
      console.log("");
      if (storeStock >= desiredAmount) {
        console.log("There is enough!");
      } else {
        console.log("Insufficient Quantity!");
      }
    });
  });
}
