import { GroupService } from "../services/group.service.js";

const GroupController = () => {
  console.log(2, "[Group] Controller");

  const groupService = GroupService();

  const getById = (req, res) => {
    console.log(2.1, "[Group] Controller Get By Id");

    const group = groupService.getById(req.params.id);

    if (!group) {
      return res
        .status(404)
        .json({ message: `Group with id ${req.params.id} does not exist` });
    }

    return res.status(200).json({
      group,
    });
  };

  const getAll = (_req, res) => {
    console.log(2.1, "[Group] Controller Get All");
    const groups = groupService.getAll();

    return res.status(200).json({
      groups,
    });
  };

  const create = (req, res) => {
    console.log(2.1, "[Group] Controller Create");
    const newGroup = groupService.create(req.body);
    return res.status(201).json(newGroup);
  };

  const editById = (req, res) => {
    console.log(2.1, "[Group] Controller Edit");
    const updated = groupService.editById(req.params.id, req.body);

    if (updated) {
      return res.status(204).send();
    }

    return res.status(404).json({
      message: `Group with id ${req.params.id} does not exist`,
    });
  };

  const removeById = (req, res) => {
    console.log(2.1, "[Group] Controller Remove");

    const removed = groupService.removeById(req.params.id);

    if (removed) {
      return res.status(204).send();
    }

    return res.status(404).json({
      message: `Group with id ${req.params.id} does not exist`,
    });
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
