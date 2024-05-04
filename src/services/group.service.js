import { GroupModel } from "../models/group.model.js";
import ConflictException from "../exceptions/conflict.exception.js";

const groupModel = GroupModel();

const GroupService = () => {
  console.log(3, "[Group] Service");

  const getById = (id) => {
    console.log(id);
    console.log(3.1, "[Group] Service Get By Id");

    return groupModel.getById(id);
  };

  const getAll = () => {
    console.log(3.1, "[Group] Service Get All");

    return groupModel.getAll();
  };

  const create = async (newGroup) => {
    console.log(newGroup);
    console.log(3.1, "[Group] Service Create");
    const { name } = newGroup;

    const groupFound = await groupModel.findByName(name);

    if (groupFound) {
      throw new ConflictException("The group already exists");
    }

    return groupModel.create(newGroup);
  };

  const editById = (id, group) => {
    console.log(id, group);
    console.log(3.1, "[Group] Service Edit");
  };

  const removeById = (id) => {
    console.log(id);
    console.log(3.1, "[Group] Service Remove");

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
