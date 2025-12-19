const db = require('../config/db');

exports.updateBalances = async (from, to, amount) => {
  const [rows] = await db.query(
    'SELECT amount FROM balances WHERE user_from=? AND user_to=?',
    [from, to]
  );

  if (rows.length === 0) {
    await db.query(
      'INSERT INTO balances (user_from, user_to, amount) VALUES (?,?,?)',
      [from, to, amount]
    );
  } else {
    await db.query(
      'UPDATE balances SET amount = amount + ? WHERE user_from=? AND user_to=?',
      [amount, from, to]
    );
  }
};
