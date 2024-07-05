import connectionPool from '../lib/connection.js';

const GroupModel = () => {
  console.log(4, '[Group] Model');

  const getById = async (id, userId) => {
    console.log(4.1, '[Database] Model getById');

    const client = await connectionPool.connect();

    const result = await client.query(
      `SELECT g.*, ug.userid as userid, ug.id as usergroupid,
        (SELECT count(*) from usergroup where groupid = g.id) as participants
      FROM groups g
      join usergroup ug on g.id = ug.groupid and ug.userid = $2
      WHERE ug.groupid = $1`,
      [id, userId]
    );

    client.release();

    return result.rows[0];
  };

  const countById = async (id) => {
    console.log(4.1, '[Database] Model count by id');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT COUNT(*) FROM groups WHERE id = $1', [id]);

    client.release();

    return result.rows[0].count;
  };

  const getAll = async (userId) => {
    console.log(4.1, '[Database] Model getAll');

    const client = await connectionPool.connect();

    const result = await client.query(
      `SELECT g.*, ug.userid as userid, ug.id as usergroupid
      FROM groups g
      join usergroup ug on g.id = ug.groupid
      WHERE ug.userid = $1 order by g.createdat desc`,
      [userId]
    );

    client.release();

    return result.rows;
  };

  const findByName = async (value) => {
    console.log(4.1, '[Database] Model findWhere');

    const client = await connectionPool.connect();

    const result = await client.query('SELECT COUNT(*) FROM GROUPS WHERE NAME = $1', [value]);

    client.release();

    return result.rows[0].count > 0;
  };

  const create = async (entity) => {
    console.log(4.1, '[Database] Model create');

    const client = await connectionPool.connect();

    const result = await client.query(
      'INSERT INTO GROUPS (owneruserid, name, color) VALUES ($1, $2, $3) RETURNING *',
      [entity.ownerUserId, entity.name, entity.color]
    );

    client.release();

    return result.rows[0];
  };

  const update = async (id, entity) => {
    console.log(4.1, '[Database] Model update');

    const client = await connectionPool.connect();

    const result = await client.query(
      'UPDATE GROUPS set name = $1, color = $2 WHERE id = $3 RETURNING *',
      [entity.name, entity.color, id]
    );

    client.release();

    return result.rows[0];
  };

  const del = async (id) => {
    console.log(4.1, '[Database] Model delete');

    const client = await connectionPool.connect();

    const result = await client.query('DELETE FROM GROUPS WHERE id = $1', [id]);

    client.release();

    return result.rowCount >= 1;
  };

  return {
    getById,
    getAll,
    countById,
    create,
    delete: del,
    update,
    findByName,
  };
};

export { GroupModel };
