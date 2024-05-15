import { jest } from '@jest/globals';
import { GroupController } from '../../controllers/group.controller';
import { GroupService } from '../../services/group.service';

jest.mock('../../services/group.service', () => ({
  GroupService: jest.fn().mockImplementation(() => ({
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    editById: jest.fn(),
    removeById: jest.fn(),
  })),
}));

const mockedRes = () => {
  const res = {};
  res.json = (json) => json;
  res.status = jest.fn(() => res);
  res.send = jest.fn(() => res);

  return res;
};

describe('Group controller methods', () => {
  beforeEach(() => {
    // jest.resetModules();
  });

  describe('getById', () => {
    it('returns a group when the id provided exists', async () => {
      // arrange
      const mockedGroup = { id: 1, name: 'test group' };

      // mocks the actual method with a mock value
      const groupService = GroupService();
      groupService.getById.mockReturnValue(mockedGroup); // <- this line is not mocking the response

      const groupController = GroupController();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = mockedRes();

      // act
      const response = await groupController.getById(req, res);

      // assert
      expect(response.group.id).toBe(mockedGroup.id);
      expect(response.group.name).toBe(mockedGroup.name);
    });

    it('returns an error message when the provided id does not exists', async () => {
      // arrange
      // mocks the actual method with a mock value
      const groupService = GroupService();
      groupService.getById.mockReturnValue(undefined);

      const groupController = GroupController();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = mockedRes();

      // act
      const response = await groupController.getById(req, res);

      // assert
      expect(response.message).toBeDefined();
    });
  });
});
