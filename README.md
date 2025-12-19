ENV FILE:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=pwd
DB_NAME=expense_app_db
```

MySQL DB SCHEMA:
```
CREATE DATABASE expense_app_db;
USE expense_app_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE expense_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  created_by INT
);

CREATE TABLE group_members (
  group_id INT,
  user_id INT,
  PRIMARY KEY (group_id, user_id)
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT,
  paid_by INT,
  amount DECIMAL(10,2),
  split_type ENUM('EQUAL','EXACT','PERCENT'),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expense_splits (
  expense_id INT,
  user_id INT,
  share DECIMAL(10,2)
);

CREATE TABLE balances (
  user_from INT,
  user_to INT,
  amount DECIMAL(10,2),
  PRIMARY KEY (user_from, user_to)
);
```

