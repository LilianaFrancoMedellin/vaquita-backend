import { Model } from "../lib/model.js";

const GroupService = () => {
  console.log(3, "[Group] Service");

  const groupModel = Model();

  const getById = (id) => {
    console.log(id);
    console.log(3.1, "[Group] Service Get By Id");
  };

  const getAll = () => {
    console.log(3.1, "[Group] Service Get All");
  };

  const create = (newGroup) => {
    console.log(newGroup);
    console.log(3.1, "[Group] Service Create");
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
