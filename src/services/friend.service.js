const FriendService = () => {
  const getAll = () => {
    console.log(3, "[Friend] Service Get All");
  };

  const getById = (id) => {
    console.log(3, "[Friend] Service Get By Id", id);
  };

  const create = (newFriend) => {
    console.log(3, "[Friend] Service Create", newFriend);
  };

  const editById = (id, friend) => {
    console.log(3, "[Friend] Service Edit", id, friend);
  };

  const removeById = (id) => {
    console.log(3, "[Friend] Service Remove", id);
  };

  return {
    getAll,
    getById,
    create,
    editById,
    removeById,
  };
};

export { FriendService };
