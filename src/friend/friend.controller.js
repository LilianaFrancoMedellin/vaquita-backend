class FriendController {
  get(req, res) {
    return res.status(200).json({
      name: "foo",
    });
  }

  getAll(_req, res) {
    return res.status(200).json([]);
  }

  create(req, res) {}

  edit(req, res) {}

  delete(req, res) {}
}

export { FriendController };
