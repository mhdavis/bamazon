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
  let fullTableQuery =
  `
  SELECT
  products.id,
  products.name,
  departments.department_name,
  products.price,
  products.stock_quantity,
  products.product_sales
  FROM products, departments
  WHERE products.department_id = departments.id
  GROUP BY products.id
  `;
  connection.query(fullTableQuery, function(err, res) {
    if (err) throw err;

    console.log(
      "\n" +
      "+--------------------------+\n" +
      "|   MANAGER PRODUCT VIEW   |\n" +
      "+--------------------------+\n"
    );

    let table = new Table({
      chars: tableChars,
      head: ["ID", "Product", "Department", "Price", "Stock", "Product Sales"],
      colWidths: [5, 25, 20, 15 ,10, 25]
    });

    for (let i=0; i < res.length; i++) {
      table.push([
        res[i].id,
        res[i].name,
        res[i].department_name,
        "$" + res[i].price.toFixed(2),
        res[i].stock_quantity,
        res[i].product_sales
       ]);
    }
    console.log(table.toString());
    managerContinue();
  });
}

function viewLowInventory() {
  let lowInventoryQuery =
  `
  SELECT
  products.id,
  products.name,
  departments.department_name,
  products.price,
  products.stock_quantity,
  products.product_sales
  FROM products, departments
  WHERE products.department_id = departments.id
  AND products.stock_quantity < 5
  GROUP BY products.id
  `;
  connection.query(lowInventoryQuery, function(err, res) {
    if (err) throw err;
    console.log(
      "\n" +
      "+-------------------------+\n" +
      "|    VIEW LOW INVENTORY   |\n" +
      "+-------------------------+\n"
    );

    let table = new Table({
      chars: tableChars,
      head: ["ID", "Product", "Department", "Price", "Stock", "Product Sales"],
      colWidths: [5, 25, 20, 15 ,10, 25]
    });

    for (let i=0; i < res.length; i++) {
      table.push([
        res[i].id,
        res[i].name,
        res[i].department_name,
        "$" + res[i].price.toFixed(2),
        res[i].stock_quantity,
        res[i].product_sales
       ]);
    }
    console.log(table.toString());

    managerContinue();
  });
}

function addInventory() {
  let addInventoryQuery =
  `
  SELECT
  products.id,
  products.name,
  products.price,
  products.stock_quantity
  FROM products
  GROUP BY products.id
  `;
  connection.query(addInventoryQuery, function(err, res) {
    if (err) throw err;
    console.log(
      "\n" +
      "+-------------------------+\n" +
      "|     ADD TO INVENTORY    |\n" +
      "+-------------------------+\n"
    );

    let table = new Table({
      chars: tableChars,
      head: ["ID", "Product", "Stock"],
      colWidths: [5, 25, 10]
    });

    for (let i=0; i < res.length; i++) {
      table.push([
        res[i].id,
        res[i].name,
        res[i].stock_quantity
       ]);
    }
    console.log(table.toString());
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
      let query = `UPDATE products SET stock_quantity=stock_quantity+${parseInt(answer.quantity)} WHERE id=${parseInt(answer.id)}`;
      connection.query(query, function(error, res) {
        if (error) throw error;
        if (res.changedRows > 0) {
          console.log(`\nSuccessfully increased Item ${answer.id} by ${answer.quantity} units!\n`);
        } else {
          console.log(`\nError: Item ${answer.id} does NOT exist\n`);
        }
        continueAddingInventory();
      });

    });
  });
}

function addNewProduct() {
  console.log(
    "\n" +
    "+------------------------+\n" +
    "|     ADD NEW PRODUCT    |\n" +
    "+------------------------+\n"
  );
  let departmentsQuery =
  `
  SELECT
  departments.id,
  departments.department_name
  FROM departments
  GROUP BY departments.id
  `;

  let departmentsArr = [];
  let departmentsObjArr =[];

  connection.query(departmentsQuery, function (err, res) {
      for (let i=0; i < res.length; i++) {
        let departmentObj = {
          department_id: res[i].id,
          department_name: res[i].department_name
        }
        departmentsObjArr.push(departmentObj);
        departmentsArr.push(res[i].department_name);
      }
  });

  inquirer.prompt([
    {
      name: "product",
      type: "input",
      message: "NAME:"
    },
    {
      name: "department",
      type: "list",
      choices: departmentsArr,
      message: "DEPART.:"
    },
    {
      name: "price",
      type: "input",
      message: "PRICE ($):",
      validate: function (value) {
        let flt = parseFloat(value);
        if (typeof flt === 'number') {
          return true;
        }
        return false;
      }
    },
    {
      name: "stock",
      type: "input",
      message: "STOCK:",
      validate: function (value) {
        let flt = parseFloat(value);
        if (typeof flt === 'number') {
          return true;
        }
        return false;
      }
    }
  ]).then(function (answers) {
    let selectedDepartment = departmentsObjArr.find(function (obj) {
      return obj.department_name === answers.department;
    });
    let query =
    `
    INSERT INTO products (name, department_id, price, stock_quantity, product_sales)
    VALUES (
      "${answers.product}",
       ${selectedDepartment.department_id},
       ${parseFloat(answers.price).toFixed(2)},
       ${parseInt(answers.stock)},
       0)
    `;
    connection.query(query, function (err) {
      if (err) throw err;

      inquirer.prompt([{
        name: "continueAddingProducts",
        type: "confirm",
        message: "Would you like to continue adding new products?",
      }]).then(function(answer) {
        if (answer.continueAddingProducts) {
          addNewProduct();
        } else {
          managerContinue();
        }
      });
    });

  });
}

// helper functions

function managerContinue() {
  inquirer.prompt([{
    name: "continue",
    type: "confirm",
    message: "Return to Manager Options?",
    default: true
  }]).then(function(answer) {
    if (answer.continue) {
      displayManagerOptions();
    } else {
      console.log("\n-- THANK YOU, GOODBYE! --");
    }
  });
}

function continueAddingInventory() {
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
}
