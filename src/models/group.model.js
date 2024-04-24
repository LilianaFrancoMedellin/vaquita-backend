import connectionPool from "../lib/connection.js";

const GroupModel = (initialEntities) => {
  const entities = initialEntities || [];

  console.log(4, "[Group] Model");

  const getById = async (id) => {
    console.log(4.1, "[Database] Model findUnique");

    const client = await connectionPool.connect();

    const result = await client.query("SELECT * FROM GROUPS WHERE ID = $1", [
      id,
    ]);

    client.release();

    return result.rows[0];
  };

  const getByFieldId = (attribute, id) => {
    console.log(4.1, "[Database] Model getByFieldId");

    return entities.find((entity) => entity[attribute] === id);
  };

  const getAll = async () => {
    console.log(4.1, "[Database] Model findMany");

    const client = await connectionPool.connect();

    const result = await client.query("SELECT * FROM GROUPS");

    client.release();

    return result.rows;
  };

  const findByName = async (value) => {
    console.log(4.1, "[Database] Model findWhere");

    const client = await connectionPool.connect();

    const result = await client.query(
      "SELECT COUNT(*) FROM GROUPS WHERE NAME = $1",
      [value]
    );

    client.release();

    return result.rows[0].count > 0;
  };

  const create = async (entity) => {
    console.log(4.1, "[Database] Model create");

    const client = await connectionPool.connect();

    const result = await client.query(
      "INSERT INTO GROUPS (owneruserid, name, color, CREATEDAT) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [entity.ownerUserId, entity.name, entity.color]
    );

    client.release();

    return result.rows[0];
  };

  const update = (id, newEntity) => {
    console.log(4.1, "[Database] Model update");

    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if (entityIndex !== -1) {
      entities[entityIndex] = newEntity;

      return true;
    }

    return false;
  };

  const del = async (id) => {
    console.log(4.1, "[Database] Model delete");

    const client = await connectionPool.connect();

    const result = await client.query("DELETE FROM GROUPS WHERE ID = $1", [id]);

    client.release();

    return result.rowCount >= 1;
  };

  return {
    getById,
    getByFieldId,
    getAll,
    create,
    delete: del,
    update,
    findByName,
  };
};

export { GroupModel };
