import { GroupService } from "../services/group.service.js";

const GroupController = () => {
  console.log(2, "[Group] Controller");

  const groupService = GroupService();

  const getById = (req, res) => {
    console.log(2.1, "[Group] Controller Get By Id");

    groupService.getById(123);

    return res.status(200).json({
      name: "foo",
    });
  };

  const getAll = (_req, res) => {
    console.log(2.1, "[Group] Controller Get All");
    groupService.getAll();
    return res.status(200).json([]);
  };

  const create = (req, res) => {
    console.log(2.1, "[Group] Controller Create");
    groupService.create({});
    return res.status(200).json({});
  };

  const editById = (req, res) => {
    console.log(2.1, "[Group] Controller Edit");
    groupService.editById(123, {});
    return res.status(200).json({});
  };

  const removeById = (req, res) => {
    console.log(2.1, "[Group] Controller Remove");
    return res.status(200).json({});
  };

  return {
    getById,
    getAll,
    create,
    editById,
    removeById,
  };
};

export { GroupController };
