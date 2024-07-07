import userGroupService from '../services/user-group.service.js';
import { StatusCodes } from 'http-status-codes';

const UserGroupController = () => {
  console.log(2, '[User Group] Controller');

  const getAllUsersByGroupId = async (req, res) => {
    console.log(2.1, '[Group] Controller Get All Users by Group Id');

    const users = await userGroupService.getAllUsersByGroupId(req.params.groupId);

    return res.status(StatusCodes.OK).json({
      users,
    });
  };

  const getAvailableUsersByGroupId = async (req, res) => {
    console.log(2.1, '[Group] Controller Get Available Users by Group Id');

    const users = await userGroupService.getAvailableUsersByGroupId(req.params.groupId);

    return res.status(StatusCodes.OK).json({
      users,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, '[User Group] Controller Create');

    try {
      const userGroup = await userGroupService.create(req.body);

      if (userGroup) {
        return res.status(StatusCodes.CREATED).json({ userGroup });
      } else {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'An error ocurred',
        });
      }
    } catch (error) {
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  };

  const removeById = async (req, res) => {
    console.log(2.1, '[Group] Controller Remove');

    try {
      const removed = await userGroupService.removeById(req.params.id);

      if (removed) {
        return res.status(StatusCodes.NO_CONTENT).send();
      } else {
        return res.status(StatusCodes.CONFLICT).json({
          message: 'An error ocurred',
        });
      }
    } catch (error) {
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  };

  return {
    getAllUsersByGroupId,
    getAvailableUsersByGroupId,
    create,
    removeById,
  };
};

export { UserGroupController };
