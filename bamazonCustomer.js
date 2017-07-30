const mysql = require("mysql");
const inquirer = require("inquirer");

function createSqlParams() {
  inquirer.prompt([
    {
      name: 'user',
      type: 'input',
      message: 'Server Username:'
    },
    {
      name: 'password',
      type: 'password',
      message: 'Server Password:'
    }
  ]).then(function (answers) {
    let obj = {
      host: "localhost",
      port: 3306,
      user: answers.user,
      password: answers.password,
      database: "bamazon_db"
    };
    return obj;
  });
}

const params = createSqlParams();
