const mysql = require("mysql");
const inquirer = require("inquirer");
const serverParams = require("./config.js");

let connection = mysql.createConnection(serverParams);

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Successfully Connected!");
  }
});
