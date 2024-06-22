import userGroupService from '../services/user-group.service.js';
import userGroupSchemaValidation from '../validations/user-group.schema.validation.js';
import { StatusCodes } from 'http-status-codes';

const UserGroupController = () => {
  console.log(2, '[User Group] Controller');

  const getAllByGroupId = async (req, res) => {
    console.log(2.1, '[Group] Controller Get All by Group Id');

    const userGroups = await userGroupService.getAllByGroupId(req.params.groupId);

    return res.status(StatusCodes.OK).json({
      userGroups,
    });
  };

  const create = async (req, res) => {
    console.log(2.1, '[User Group] Controller Create');

    const { error, value } = userGroupSchemaValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: error.details.map((detail) => detail.message),
      });
    }

    try {
      const userGroup = await userGroupService.create(value);

      if (group) {
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
    getAllByGroupId,
    create,
    removeById,
  };
};

export { UserGroupController };
