INSERT INTO department (name)
VALUES  ('IT'),
        ('Accounting'),
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('Engineer', 1.3, 1),
        ('Intern', 3.4, 2),
        ('Designer', 2.2, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Bob', 'Marley', 1, 1),
        ('Carl', 'Vega', 2, 2),
        ('Muhammad', 'Abbasi', 3, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;