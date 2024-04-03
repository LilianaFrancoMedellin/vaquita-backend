const GroupService = () => {
  const getById = (id) => {
    console.log(3, "[Group] Service Get All", id);
  };

  const getAll = () => {
    console.log(3, "[Group] Service Get All");
  };

  const create = (newGroup) => {
    console.log(3, "Group] Service Create", newGroup);
  };

  const editById = (id, group) => {
    console.log(3, "[User] Service Edit", id, group);
  };

  const removeById = (id) => {
    console.log(3, "[Group] Service Remove", id);
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
