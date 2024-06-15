import { GroupModel } from '../models/group.model.js';
import ConflictException from '../exceptions/conflict.exception.js';
import NotFoundException from '../exceptions/not-found.exception.js';

const GroupService = () => {
  console.log(3, '[Group] Service');

  const groupModel = GroupModel();

  const getById = (id) => {
    console.log(3.1, '[Group] Service Get By Id');

    return groupModel.getById(id);
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

    return groupModel.create(newGroup);
  };

  const editById = async (id, group) => {
    console.log(3.1, '[Group] Service Edit');

    const existingGroup = await getById(id);

    if (!existingGroup) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

    return groupModel.update(id, group);
  };

  const removeById = async (id) => {
    console.log(3.1, '[Group] Service Remove');

    const existingGroup = await getById(id);

    if (!existingGroup) {
      throw new NotFoundException(`Group with id ${id} does not exist`);
    }

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
