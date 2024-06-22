import { UserGroupModel } from '../models/user-group.model.js';
import { UserModel } from '../models/user.model.js';
import { GroupModel } from '../models/group.model.js';
import ConflictException from '../exceptions/conflict.exception.js';
import NotFoundException from '../exceptions/not-found.exception.js';

const UserGroupService = () => {
  console.log(3, '[User Group] Service');

  const userGroupModel = UserGroupModel();

  const getById = (id) => {
    console.log(3.1, '[User Group] Service Get By Id');

    return userGroupModel.getById(id);
  };

  const getAllByGroupId = (id) => {
    console.log(3.1, '[Group] Service Get All by Group Id');

    return userGroupModel.getAllByGroupId(id);
  };

  const create = async (userGroup) => {
    console.log(3.1, '[User Group] Service Create');
    const { groupId, usersId } = userGroup;

    const groupModel = GroupModel();
    const existingGroup = await groupModel.getById(groupId);

    if (!existingGroup) {
      throw new ConflictException('The group does not exists');
    }

    usersId.forEach(async (userId) => {
      const userModel = UserModel();
      const existingUser = await userModel.getById(userId);

      if (!existingUser) {
        throw new ConflictException('The user does not exists');
      }
    });

    usersId.forEach(async (userId) => {
      const userModel = UserModel();
      const existingUser = await userModel.getById(userId);

      if (!existingUser) {
        throw new ConflictException('The user does not exists');
      }
    });

    const userGroups = [];

    usersId.forEach(async (userId) => {
      const userGroup = await userGroupModel.create({
        userId,
        groupId,
      });

      userGroups.push(userGroup);
    });

    return userGroups;
  };

  const removeById = async (id) => {
    console.log(3.1, '[User Group] Service Remove');

    const existingUserGroup = await getById(id);

    if (!existingUserGroup) {
      throw new NotFoundException(`User Group with id ${id} does not exist`);
    }

    return userGroupModel.delete(id);
  };

  return {
    getAllByGroupId,
    create,
    removeById,
  };
};

export default UserGroupService();
