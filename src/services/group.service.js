import { Model } from "../lib/model.js";

const GroupService = () => {
  console.log(3, "[Group] Service");

  const groupModel = Model();

  const getById = (id) => {
    console.log(id);
    console.log(3.1, "[Group] Service Get By Id");
    return groupModel.getById(id);
  };

  const getAll = () => {
    console.log(3.1, "[Group] Service Get All");
    return groupModel.getAll();
  };

  const create = (newGroup) => {
    console.log(newGroup);
    console.log(3.1, "[Group] Service Create");
    return groupModel.create(newGroup);
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
