import { Model } from "../lib/model.js";

const GroupService = () => {
  console.log(3, "[Group] Service Get All");

  const groupModel = Model();

  const getById = (id) => {
    console.log(3.1, "[Group] Service Get All");

    return groupModel.findUnique(id);
  };

  const getAll = () => {
    console.log(3.1, "[Group] Service Get All");

    return groupModel.findMany();
  };

  const create = (newGroup) => {
    console.log(3.1, "[Group] Service Get All");

    return groupModel.create(newGroup);
  };

  const editById = (id, group) => {
    console.log(id, group);
    console.log(3.1, "[Group] Service Get All");

    return groupModel.update(id, group);
  };

  const removeById = (id) => {
    console.log(3.1, "[Group] Service Get All");

    return groupModel.delete(id);
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
