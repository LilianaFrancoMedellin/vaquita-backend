import { Model } from "../lib/model.js";

const GroupService = () => {
  console.log(3, "[Group] Service");

  const groupModel = Model([]);

  const getById = (id) => {
    console.log(id, typeof id);
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

    const { name } = newGroup;

    if (name.length > 30) {
      return {
        newGroup: null,
        success: false,
        message: "The field name can not be longer thatn 30 characters",
        code: 400,
      };
    }

    const groupFound = groupModel.findWhere("name", name);

    if (groupFound) {
      return {
        newGroup: null,
        success: false,
        message: "The group already exists",
        code: 400,
      };
    }

    const createdGroup = groupModel.create(newGroup);

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
