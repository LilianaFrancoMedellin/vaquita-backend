import { FriendService } from "../services/friend.service.js";

const FriendController = () => {
  const friendService = FriendService();
  console.log(2, "[Friend] Controller");

  const getById = (_req, res) => {
    console.log(2.1, "[Friend] Controller Get By Id");
    friendService.getById(123);
    return res.status(200).json({ name: "foo" });
  };

  const getAll = (_req, res) => {
    console.log(2.1, "[Friend] Controller Get All");

    friendService.getAll();

    return res.status(200).json([]);
  };

  const create = (req, res) => {
    console.log(2.1, "[Friend] Controller Create");

    friendService.create({});

    return res.status(201).json({});
  };

  const editById = (req, res) => {
    console.log(2.1, "[Friend] Edit By Id");

    friendService.editById(123, {});
    return res.status(200).json({});
  };

  const removeById = (req, res) => {
    console.log(2.1, "[Friend] Remove By Id");

    friendService.remove;
    return res.status(204).json({});
  };

  return {
    getById,
    getAll,
    create,
    editById,
    removeById,
  };
};

export { FriendController };
