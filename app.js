require('dotenv').config();
const express = require('express');

const userRoutes = require('./src/routes/users');
const groupRoutes = require('./src/routes/groups');
const expenseRoutes = require('./src/routes/expenses');
const balanceRoutes = require('./src/routes/balances');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/expenses', expenseRoutes);
app.use('/balances', balanceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
