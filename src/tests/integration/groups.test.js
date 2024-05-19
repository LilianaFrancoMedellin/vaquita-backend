import supertest from 'supertest';
import app from '../../app.js';
import { login } from '../utils.js';

const requestWithSupertest = supertest(app);

const URL = '/groups';
let token = null;

describe('Groups endpoints', () => {
  beforeAll(async () => {
    token = await login(requestWithSupertest);
  });

  describe('GET /groups', () => {
    it('should return 401 when no bearer token is provided', async () => {
      const res = await requestWithSupertest.get(URL);

      expect(res.status).toEqual(401);
    });

    it('should return 200 when bearer token is provided', async () => {
      const res = await requestWithSupertest.get(URL).set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
    });
  });

  describe('GET /groups/{id}', () => {
    it('should return 401 when no bearer token is provided', async () => {
      const res = await requestWithSupertest.get(`${URL}/1`);

      expect(res.status).toEqual(401);
    });

    it('should return 404 when bearer token is provided but the group was not found', async () => {
      const res = await requestWithSupertest
        .get(`${URL}/100`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
    });

    it('should return 200 when bearer token is provided and id is found', async () => {
      const res = await requestWithSupertest
        .get(`${URL}/1`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
    });
  });

  describe('PUT /groups/{id}', () => {
    it('should return 401 when no bearer token is provided', async () => {
      const res = await requestWithSupertest.put(`${URL}/1`);

      expect(res.status).toEqual(401);
    });

    it('should return 400 when bearer token is provided but the body is not valid', async () => {
      const res = await requestWithSupertest
        .put(`${URL}/1`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      expect(res.body.messages.length).not.toBe(0);
    });

    it('should return 404 when bearer token is provided but the provided id does not exist', async () => {
      const body = {
        name: 'test',
        color: '#FFF',
      };
      const res = await requestWithSupertest
        .put(`${URL}/100`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
    });

    it('should return 200 when bearer token is provided and group was updated successfully', async () => {
      const body = {
        name: 'test',
        color: '#FFF',
      };
      const res = await requestWithSupertest
        .put(`${URL}/1`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.group).toBeDefined();
      expect(res.body.group.color).toBe(body.color);
    });
  });

  describe('DELETE /groups/{id}', () => {
    it('should return 401 when no bearer token is provided', async () => {
      const res = await requestWithSupertest.delete(`${URL}/1`);

      expect(res.status).toEqual(401);
    });

    it('should return 404 when bearer token is provided but the provided id does not exist', async () => {
      const res = await requestWithSupertest
        .delete(`${URL}/100`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(404);
    });
  });
});
