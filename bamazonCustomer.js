const mysql = require("mysql");
const inquirer = require("inquirer");
const serverParams = require("./config.js");

let connection = mysql.createConnection(serverParams);

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      for (let i=0; i <res.length; i++) {
        console.log(
          `\n----------------------------- ITEM ${res[i].item_id}\n` +
          '|| Product Name: ' + res[i].product_name + "\n" +
          '|| Department: ' + res[i].department_name + "\n" +
          '|| Price: ' + res[i].price + "\n" +
          '|| Stock: ' + res[i].stock_quantity + "\n" +
          "-----------------------------"
        )
      }
    });
  }
});
