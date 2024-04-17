const GET_ALL = 'SELECT id, name, color FROM groups';
const GET_BY_ID = `${GET_ALL} WHERE id = $1`;
const CREATE_GROUP = `INSERT INTO groups (name, color) VALUES ($1, $2) RETURNING id`;

const Database = (dbClient) => {
  
    console.log(4, "[Group] Database");
  
    const getById = async (id) => {
      console.log(4.1, "[Database] Database findUnique");
  
      const result = await dbClient.query(GET_BY_ID,[id]);
      return result.rows[0];
    };
  
    const getAll = async () => {
      console.log(4.1, `[Database] Database findMany: ${GET_ALL}`);
      const result = await dbClient.query(GET_ALL);
      
      return result.rows;
    };
  
    const create = async (entity) => {
      console.log(4.1, "[Database] Database create");
  
      const params = [entity.name, entity.color];
      const insertResult = await dbClient.query(CREATE_GROUP,params);
      const newId = insertResult.rows[0].id;
      const newGroupResult = await dbClient.query(GET_BY_ID,[newId]);
  
      return newGroupResult.rows[0];
    };
  
    const update = (id, newEntity) => {
      console.log(4.1, "[Database] Database update");
  
      const entityIndex = entities.findIndex((entity) => entity.id === id);
  
      if (entityIndex !== -1) {
        entities[entityIndex] = newEntity;
  
        return true;
      }
  
      return false;
    };
  
    const del = (id) => {
      console.log(4.1, "[Database] Database delete");
  
      const entityIndex = entities.findIndex((entity) => entity.id === id);
  
      if (entityIndex !== -1) {
        entities.splice(entityIndex, 1);
  
        return true;
      }
  
      return false;
    };
  
    if (!dbClient) {
      throw Error('dbClient must be provided');
    }

    return {
      getById,
      getAll,
      create,
      delete: del,
      update,
    };
  };
  
  export default Database;
  