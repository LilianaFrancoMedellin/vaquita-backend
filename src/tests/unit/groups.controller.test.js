import { jest } from '@jest/globals';
import { GroupController } from '../../controllers/group.controller';
import groupService from '../../services/group.service';

jest.mock('../../services/group.service', () => ({
  getById: jest.fn(),
  getAll: jest.fn(),
  create: jest.fn(),
  editById: jest.fn(),
  removeById: jest.fn(),
}));

const mockedRes = () => {
  const res = {};
  res.json = (json) => json;
  res.status = jest.fn(() => res);
  res.send = jest.fn(() => res);

  return res;
};

describe('Group controller methods', () => {
  describe('getById', () => {
    it('returns a group when the id provided exists', async () => {
      // arrange
      const mockedGroup = { id: 1, name: 'test group' };

      // mocks the response
      groupService.getById.mockResolvedValue(mockedGroup);

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
      // mocks the response
      groupService.getById.mockResolvedValue(undefined);

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
      expect(response.message).toBe('Group with id 1 does not exist');
    });
  });

  describe('getAll', () => {
    it('returns an array of groups', async () => {
      // arrange
      const mockedGroups = [
        { id: 1, name: 'test group 1' },
        { id: 2, name: 'test group 2' },
      ];

      // mocks the response
      groupService.getAll.mockResolvedValue(mockedGroups);

      const groupController = GroupController();

      const req = {};
      const res = mockedRes();

      // act
      const response = await groupController.getAll(req, res);

      // assert
      expect(response.groups).toBeDefined();
      expect(response.groups.length).toBe(2);
      expect(response.groups[0].id).toBe(mockedGroups[0].id);
    });

    it('returns an empty array of groups', async () => {
      // arrange
      // mocks the response
      groupService.getAll.mockResolvedValue([]);

      const groupController = GroupController();

      const req = {};
      const res = mockedRes();

      // act
      const response = await groupController.getAll(req, res);

      // assert
      expect(response.groups).toBeDefined();
      expect(response.groups.length).toBe(0);
    });
  });

  describe('create', () => {
    it('returns a message when the provided body is empty', async () => {
      // arrange
      const body = {};

      const groupController = GroupController();

      const req = {
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.create(req, res);

      // assert
      expect(response.messages).toBeDefined();
      expect(response.messages.length).toBe(2);
    });

    it('returns a message when the provided body is missing an attribute', async () => {
      // arrange
      const body = {
        name: 'some test name',
      };

      const groupController = GroupController();

      const req = {
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.create(req, res);

      // assert
      expect(response.messages).toBeDefined();
      expect(response.messages.length).toBe(1);
      expect(response.messages[0]).toContain('color');
    });

    it('returns a message when the group was not created', async () => {
      // arrange
      const body = {
        name: 'some test name',
        color: '#FFF',
      };

      // mocks the response
      groupService.create.mockResolvedValue(undefined);

      const groupController = GroupController();

      const req = {
        user: { id: 1 },
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.create(req, res);

      // assert
      expect(response.message).toBeDefined();
      expect(response.message).toBe('An error ocurred');
    });

    it('returns a message when the group creation throws an error', async () => {
      // arrange
      const body = {
        name: 'some test name',
        color: '#FFF',
      };
      const errorMessage = 'Some test error';

      // mocks the response
      groupService.create.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const groupController = GroupController();

      const req = {
        user: { id: 1 },
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.create(req, res);

      // assert
      expect(response.message).toBeDefined();
      expect(response.message).toBe(errorMessage);
    });

    it('returns the group created correctly', async () => {
      // arrange
      const body = {
        name: 'some test name',
        color: '#FFF',
      };

      // mocks the response
      groupService.create.mockResolvedValue(body);

      const groupController = GroupController();

      const req = {
        user: { id: 1 },
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.create(req, res);

      // assert
      expect(response.group).toBeDefined();
      expect(response.group.name).toBe(body.name);
      expect(response.group.color).toBe(body.color);
    });
  });

  describe('editById', () => {
    it('returns a message when the provided body is empty', async () => {
      // arrange
      const body = {};

      const groupController = GroupController();

      const req = {
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.editById(req, res);

      // assert
      expect(response.messages).toBeDefined();
      expect(response.messages.length).toBe(2);
    });

    it('returns a message when the provided body is missing an attribute', async () => {
      // arrange
      const body = {
        name: 'some test name',
      };

      const groupController = GroupController();

      const req = {
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.editById(req, res);

      // assert
      expect(response.messages).toBeDefined();
      expect(response.messages.length).toBe(1);
      expect(response.messages[0]).toContain('color');
    });

    it('returns a message when the group was not updated', async () => {
      // arrange
      const body = {
        name: 'some test name',
        color: '#FFF',
      };

      // mocks the response
      groupService.editById.mockResolvedValue(undefined);

      const groupController = GroupController();

      const req = {
        params: { id: 1 },
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.editById(req, res);

      // assert
      expect(response.message).toBeDefined();
      expect(response.message).toBe('An error ocurred');
    });

    it('returns a message when the group edition throws an error', async () => {
      // arrange
      const body = {
        name: 'some test name',
        color: '#FFF',
      };
      const errorMessage = 'Some test error';

      // mocks the response
      groupService.editById.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const groupController = GroupController();

      const req = {
        params: { id: 1 },
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.editById(req, res);

      // assert
      expect(response.message).toBeDefined();
      expect(response.message).toBe(errorMessage);
    });

    it('returns the group edited correctly', async () => {
      // arrange
      const body = {
        name: 'some test name',
        color: '#FFF',
      };

      // mocks the response
      groupService.editById.mockResolvedValue(body);

      const groupController = GroupController();

      const req = {
        params: { id: 1 },
        body,
      };
      const res = mockedRes();

      // act
      const response = await groupController.editById(req, res);

      // assert
      expect(response.group).toBeDefined();
      expect(response.group.name).toBe(body.name);
      expect(response.group.color).toBe(body.color);
    });
  });

  describe('removeById', () => {
    it('removes a group when the provided id is valid', async () => {
      // arrange
      // mocks the response
      groupService.removeById.mockResolvedValue(true);

      const groupController = GroupController();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = mockedRes();

      // act
      const response = await groupController.removeById(req, res);

      // assert
      expect(response.body).toBeUndefined();
    });

    it('fails trying to remove a group when the provided id does not exists', async () => {
      // arrange
      // mocks the response
      groupService.removeById.mockResolvedValue(false);

      const groupController = GroupController();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = mockedRes();

      // act
      const response = await groupController.removeById(req, res);

      // assert
      expect(response.message).toBeDefined();
      expect(response.message).toBe('An error ocurred');
    });

    it('throw an exception when trying to remove a group', async () => {
      // arrange
      const errorMessage = 'An error ocurred';
      // mocks the response
      groupService.removeById.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const groupController = GroupController();

      const req = {
        params: {
          id: 1,
        },
      };
      const res = mockedRes();

      // act
      const response = await groupController.removeById(req, res);

      // assert
      expect(response.message).toBeDefined();
      expect(response.message).toBe(errorMessage);
    });
  });
});
