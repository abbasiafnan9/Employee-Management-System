const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { start } = require('repl');

//comnnect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

// console.table([
//     {
//         name: 'foo',
//         age: 10
//     },
//     {
//         name: 'bar',
//         age: 20
//     }
// ]);



function startMenu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose from the following options:',
            name: 'menu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Add an updated employee role', 'Quit']
        },
    ]).then(answers => {
        switch (answers.menu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add an updated employee role':
                updateEmployeeRole();
                break;
            default:

                break;
        };
    });

};
startMenu();

//displays the department table
function viewDepartments() {
    // Query database
    db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
  });
  startMenu();
};

//dispays the role table
function viewRoles() {
    // Query database
    db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
  });
  startMenu();
};

//displays the employee table
function viewEmployees() {
    // Query database
    db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
  });
  startMenu();
};

//adds a new department to the department table
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department.',
            name: 'name',
        },
    ]).then(({name}) => {
        db.query('INSERT INTO department (name) VALUES (?)', name, (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};

//adds a new role to the role table
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the title of the role.',
            name: 'title',
        }, 
        {
            type: 'input',
            message: 'Enter the salary of the role.',
            name: 'salary',
        }, 
        {
            type: 'list',
            message: 'Which department does the role belong?',
            name: 'department_id',
            choices: []//choose from existing departments
        }, 
    ]).then(({title, salary, department_id}) => {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?)', title, salary, department_id,  (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};

//adds a new employee to the employee table
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee\'s first name.',
            name: 'first_name',
        }, 
        {
            type: 'input',
            message: 'Enter the employee\'s last name.',
            name: 'last_name',
        }, 
        {
            type: 'list',
            message: 'What is the employee\'s role.',
            name: 'role',
            choices: []//choose from existing roles
        }, 
        {
            type: 'list',
            message: 'Who is the employee\'s manager.',
            name: 'manager',
            choices: []// choose from existing managers
        }, 
    ]).then(({first_name, last_name, role, manager}) => {
        db.query('INSERT INTO employee (first_name, last_name, role, manager) VALUES (?)', first_name, last_name, role, manager,  (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};

//
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update:',
            name: 'name',
            choices: [], //choose from existing employees... but the names are seaparated...
        }, 
        {
            type: 'list',
            message: 'Select the employee\'s new role:',
            name: 'title',
            choices: [], //choose from existing roles
        }, 
    ]).then(({name, title}) => {
        db.query('INSERT INTO role (title) VALUES (?)', title, (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};