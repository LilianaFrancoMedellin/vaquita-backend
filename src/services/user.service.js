const UserService = () => {
  const getAll = () => {
    console.log(3, "[User] Service Get All");
  };

  const getById = (id) => {
    console.log(3, "[User] Service Get By Id", id);
  };

  const create = (newUser) => {
    console.log(3, "[User] Service Create", newUser);
  };

  const editById = (id, user) => {
    console.log(3, "[User] Service Edit", id, user);
  };

  const removeById = (id) => {
    console.log(3, "[User] Service Remove", id);
  };

  return {
    getAll,
    getById,
    create,
    editById,
    removeById,
  };
};

export { UserService };
