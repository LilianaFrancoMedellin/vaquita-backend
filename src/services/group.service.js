import { GroupModel } from "../models/group.model.js";

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

    if (name.length > 30) {
      return {
        newGroup: null,
        success: false,
        message: "The field name can not be longer thatn 30 characters",
        code: 400,
      };
    }

    const groupFound = await groupModel.findByName(name);

    if (groupFound) {
      return {
        newGroup: null,
        success: false,
        message: "The group already exists",
        code: 409,
      };
    }

    const createdGroup = await groupModel.create(newGroup);

    return {
      newGroup: createdGroup,
      success: true,
      message: "Group created successfully",
      code: 201,
    };
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
