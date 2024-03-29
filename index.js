const inquirer = require('inquirer');
const mysql = require('mysql2');
 require('console.table');
const { start } = require('repl');
require('dotenv').config();
const util= require('util');


//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_NAME,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: "company_db"
    },
    console.log(`Connected to the company_db database.`)
);
db.connect(function(err){
    if (err) throw err
})


db.query=util.promisify(db.query)


function startMenu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose from the following options:',
            name: 'menu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add a role', 'Add an employee', 'Add an updated employee role', 'Quit']
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
async function viewDepartments() {
    // Query database
  const results = await getDepartments()
  console.table(results);
  startMenu();
};

function getRoles(){
  return db.query('SELECT * FROM role') 
}

//dispays the role table
async function viewRoles() {
    const results = await getRoles();
    console.table(results);
   
  
  startMenu();
};

  
function getDepartments(){
    return db.query('SELECT * FROM department')
}


function getEmployees(){
    return db.query('SELECT * FROM employee')
}

//displays the employee table
 async function viewEmployees() {

    const results = await getEmployees();
    console.table(results);
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
async function addRole() {
    const departments = await getDepartments();
    const departmentChoices = await departments.map(department =>({name:department.name, value:department.id}));
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
            choices: departmentChoices   //choose from existing departments
        }, 
    ]).then(({title, salary, department_id}) => {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [title, salary, department_id],  (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};

//adds a new employee to the employee table
async function addEmployee() {
    const employees = await getEmployees();
    const manager = await employees.map(employee =>({name:`${employee.first_name}   ${employee.last_name}`, value:employee.id}));
    const roles = await getRoles();
    const roleChoices = await roles.map(role =>({name:role.title, value:role.id}));
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
            choices: roleChoices
        }, 
        {
            type: 'list',
            message: 'Who is the employee\'s manager.',
            name: 'manager',
            choices: manager
        }, 
    ]).then(({first_name, last_name, role, manager}) => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [first_name, last_name, role, manager],  (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};

//
async function updateEmployeeRole() {
    const employees = await getEmployees();
    const employeeChoices = await employees.map(employee =>({name:`${employee.first_name}   ${employee.last_name}`, value:employee.id}));
    const roles = await getRoles();
    const roleChoices = await roles.map(role =>({name:role.title, value:role.id}));
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update:',
            name: 'name',
            choices: employeeChoices, //choose from existing employees
        }, 
        {
            type: 'list',
            message: 'Select the employee\'s new role:',
            name: 'title',
            choices: roleChoices, //choose from existing roles
        }, 
    ]).then(({name, title}) => {
        db.query('UPDATE employee SET role_id=? WHERE id=?', [title,name], (err, results) => {
            console.log(results);
        });
        startMenu();
    });
};