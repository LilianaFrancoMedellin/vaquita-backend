import createApplicationError from "../lib/application.error.js";
import Model from "../persistence/groups.database.js";

const GroupService = (dbClient) => {
  console.log(3, "[Group] Service");

  const groupModel = Model(dbClient);

  const getById = async (id) => {
    console.log(3.1, "[Group] Service Get By Id");
    return await groupModel.getById(id);
  };

  const getAll = async () => {
    console.log(3.1, "[Group] Service Get All");
    return await groupModel.getAll();
  };

  const create = async (newGroup) => {
    console.log(3.1, "[Group] Service Create");
    try {
      return await groupModel.create(newGroup);
    } catch(err) {
      throw createApplicationError('no se puede guardar', 400, err);
    }
  };

  const editById = (id, group) => {
    console.log(id, group);
    console.log(3.1, "[Group] Service Edit");
  };

  const removeById = (id) => {
    console.log(id);
    console.log(3.1, "[Group] Service Remove");
  };

  return {
    getAll,
    getById,
    create,
    editById,
    removeById,
  };
};

export { GroupService };
