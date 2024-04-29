import { GroupService } from "../services/group.service.js";

const GroupController = () => {
  console.log(2, "[Group] Controller");

  const groupService = GroupService();

  const getById = async (req, res) => {
    console.log(2.1, "[Group] Controller Get By Id");

    const group = await groupService.getById(req.params.id);

    if (!group) {
      return res
        .status(404)
        .json({ message: `Group with id ${req.params.id} does not exist` });
    }

    return res.status(200).json({
      group,
    });
  };

  const getAll = async (_req, res) => {
    console.log(2.1, "[Group] Controller Get All");
    const groups = await groupService.getAll();

    return res.status(200).json({
      groups,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, "[Group] Controller Create");

    // extracting only the fields we need
    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({
        message: "The fields [name, color, ownerUserId] are required",
      });
    }

    if (typeof name !== "string") {
      return res.status(400).json({
        message: "The field name should be a string",
      });
    }

    if (!name.trim()) {
      return res.status(400).json({
        message: "The field name can not be empty",
      });
    }

    if (typeof color !== "string") {
      return res.status(400).json({
        message: "The field color should be a string",
      });
    }

    if (!color.trim()) {
      return res.status(400).json({
        message: "The field color can not be empty",
      });
    }

    // creating our own body only with the fields we really need (name & color only)
    // doing this we discard the rest of the fields we may receive in the body
    const sanitizedBody = {
      name: name.trim(),
      color: color.trim(),
      ownerUserId: req.user.id,
    };

    const { newGroup, success, message, code } = await groupService.create(
      sanitizedBody
    );

    if (success) {
      return res.status(code).json(newGroup);
    } else {
      return res.status(code).json(message);
    }
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

  const removeById = async (req, res) => {
    console.log(2.1, "[Group] Controller Remove");

    const removed = await groupService.removeById(req.params.id);

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
