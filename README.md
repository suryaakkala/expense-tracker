# Expense Sharing Application (Backend)

A backend expense-sharing system inspired by Splitwise. This application allows users to create groups, add shared expenses, split costs in multiple ways, and track balances between users.

---

## Features
- User creation
- Group creation with multiple members
- Add expenses to groups
- Split expenses using:
  - Equal split
  - Exact amounts
  - Percentage-based split
- Automatic balance calculation
- View who owes whom

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **mysql2** (database driver)
- **dotenv** (environment variables)

---

## Project Structure
```
suryaakkala-expense-tracker/
│── app.js
│── package.json
│── README.md
│── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── groupController.js
│   │   ├── expenseController.js
│   │   └── balanceController.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── groups.js
│   │   ├── expenses.js
│   │   └── balances.js
│   ├── services/
│   │   └── balanceService.js
│   └── utils/
│       └── splitUtils.js
```

---

## Environment Variables
Create a `.env` file in the root directory:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=expense_app_db
```

---

## Database Setup
Create the database and tables using the following schema:

```sql
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

---

## Installation & Running

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

Server will run on:
```
http://localhost:3000
```

---

## API Endpoints

### Users
- `POST /users` → Create a new user

### Groups
- `POST /groups` → Create a new group

### Expenses
- `POST /expenses` → Add an expense to a group

### Balances
- `GET /balances/:userId` → Get balance details for a user

---

## Expense Split Types
- **EQUAL** – Amount divided equally among participants
- **EXACT** – Fixed amount per user
- **PERCENT** – Percentage-based split

---

## Example Flow
1. Create users
2. Create a group and add members
3. Add expenses with split type
4. View balances to see who owes whom

---

## Future Improvements
- Authentication and authorization
- Expense settlement feature
- Transaction history
- Input validation and error handling
- Frontend integration

---

## License
This project is for educational and learning purposes.
