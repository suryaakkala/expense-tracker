const db = require('../config/db');
const { calculateSplits } = require('../utils/splitUtils');
const { updateBalances } = require('../services/balanceService');

exports.addExpense = async (req, res) => {
  const { groupId, paidBy, amount, splitType, participants, splits, description } = req.body;

  const [expense] = await db.query(
    'INSERT INTO expenses (group_id, paid_by, amount, split_type, description) VALUES (?,?,?,?,?)',
    [groupId, paidBy, amount, splitType, description]
  );

  const expenseId = expense.insertId;
  const finalSplits = calculateSplits(amount, splitType, participants, splits);

  for (let userId in finalSplits) {
    await db.query(
      'INSERT INTO expense_splits (expense_id, user_id, share) VALUES (?,?,?)',
      [expenseId, userId, finalSplits[userId]]
    );

    if (userId != paidBy) {
      await updateBalances(userId, paidBy, finalSplits[userId]);
    }
  }

  res.json({ message: 'Expense added successfully' });
};
