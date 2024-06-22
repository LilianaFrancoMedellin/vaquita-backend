import connectionPool from '../lib/connection.js';

const UserGroupModel = () => {
  console.log(4, '[User Group] Model');

  const getById = async (id) => {
    console.log(4.1, '[Database] Model getById');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT * FROM USERGROUP WHERE id = $1', [id]);

    client.release();

    return result.rows[0];
  };

  const getAllByGroupId = async (id) => {
    console.log(4.1, '[Database] Model getById');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT * FROM USERGROUP WHERE groupid = $1', [id]);

    client.release();

    return result.rows;
  };

  const create = async (entity) => {
    console.log(4.1, '[Database] Model create');

    const client = await connectionPool.connect();

    const result = await client.query(
      'INSERT INTO USERGROUP (userid, groupid) VALUES ($1, $2) RETURNING *',
      [entity.userId, entity.groupId]
    );

    client.release();

    return result.rows[0];
  };

  const del = async (id) => {
    console.log(4.1, '[Database] Model delete');

    const client = await connectionPool.connect();

    const result = await client.query('DELETE FROM USERGROUP WHERE id = $1', [id]);

    client.release();

    return result.rowCount >= 1;
  };

  return {
    getAllByGroupId,
    getById,
    create,
    delete: del,
  };
};

export { UserGroupModel };
