import { GroupModel } from '../models/group.model.js';
import { UserGroupModel } from '../models/user-group.model.js';
import ConflictException from '../exceptions/conflict.exception.js';
import NotFoundException from '../exceptions/not-found.exception.js';

const GroupService = () => {
  console.log(3, '[Group] Service');

  const groupModel = GroupModel();
  const userGroupModel = UserGroupModel();

  const getById = (id, userId) => {
    console.log(3.1, '[Group] Service Get By Id');

    return groupModel.getById(id, userId);
  };

  const getAll = (userId) => {
    console.log(3.1, '[Group] Service Get All');

    return groupModel.getAll(userId);
  };

  const create = async (newGroup) => {
    console.log(3.1, '[Group] Service Create');
    const { name } = newGroup;

    const groupFound = await groupModel.findByName(name);

    if (groupFound) {
      throw new ConflictException('The group already exists');
    }

    const groupCreated = await groupModel.create(newGroup);

    if (groupCreated) {
      await userGroupModel.create({
        groupId: groupCreated.id,
        userId: newGroup.ownerUserId,
      });
    }

    return groupCreated;
  };

  const editById = async (id, group) => {
    console.log(3.1, '[Group] Service Edit');

    const countGroup = await groupModel.countById(id);

    if (countGroup === 0) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    return groupModel.update(id, group);
  };

  const removeById = async (id, userId) => {
    console.log(3.1, '[Group] Service Remove');

    const countGroup = await groupModel.countById(id, userId);

    if (countGroup === 0) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    const countUserGroup = await userGroupModel.countByGroup(id);

    if (countUserGroup > 1) {
      throw new ConflictException(`Group with id ${id} has friends linked`);
    }

    await userGroupModel.delByGroupAndUser(id, userId);

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
