INSERT INTO department (name)
VALUES  ('IT'),
        ('Accounting'),
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('Engineer', 1.3, 1),
        ('Engineer', 3.4, 2),
        ('Engineer', 2.2, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Harry', 'Potter', 1, 1),
        ('Hermione', 'Granger', 2, 2),
        ('Ron', 'Weasley', 3, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;