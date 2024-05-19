export const login = async (requestWithSupertest) => {
  const loginResponse = await requestWithSupertest.post('/auth/login').send({
    email: 'sisas@sisas.com',
    password: 'sisas',
  });

  expect(loginResponse.status).toEqual(200);
  expect(loginResponse.body.token).toBeDefined();

  return loginResponse.body.token;
};
