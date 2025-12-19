const db = require('../config/db');

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  await db.query(
    'INSERT INTO users (name, email) VALUES (?,?)',
    [name, email]
  );
  res.json({ message: 'User created' });
};
