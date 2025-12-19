const db = require('../config/db');

exports.getUserBalances = async (req, res) => {
  const userId = req.params.userId;

  const [youOwe] = await db.query(
    'SELECT user_to, amount FROM balances WHERE user_from=?',
    [userId]
  );

  const [youAreOwed] = await db.query(
    'SELECT user_from, amount FROM balances WHERE user_to=?',
    [userId]
  );

  res.json({ youOwe, youAreOwed });
};
