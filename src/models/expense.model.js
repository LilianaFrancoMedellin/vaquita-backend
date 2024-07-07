import connectionPool from '../lib/connection.js';

const ExpenseModel = () => {
  const getAllByGroup = async (groupId) => {
    const client = await connectionPool.connect();

    const result = await client.query('SELECT * FROM EXPENSES WHERE groupid = $1', [groupId]);

    client.release();

    return result.rows;
  };

  const create = async (expense) => {
    const client = await connectionPool.connect();

    const result = await client.query(
      'INSERT INTO EXPENSES (owneruserid, groupid, description, total, divisiontype) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [expense.ownerUserId, expense.groupId, expense.description, expense.total, 'equal']
    );

    client.release();

    return result.rows[0];
  };

  return {
    getAllByGroup,
    create,
  };
};

export { ExpenseModel };
