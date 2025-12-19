const db = require('../config/db');

exports.createGroup = async (req, res) => {
  const { name, createdBy, members } = req.body;

  const [result] = await db.query(
    'INSERT INTO expense_groups (name, created_by) VALUES (?,?)',
    [name, createdBy]
  );

  const groupId = result.insertId;

  for (let userId of members) {
    await db.query(
      'INSERT INTO group_members (group_id, user_id) VALUES (?,?)',
      [groupId, userId]
    );
  }

  res.json({ message: 'Group created', groupId });
};
