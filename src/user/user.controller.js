class UserController {
  get(_req, res) {
    return res.status(200).json({ email: "johndoe@mail.test" });
  }

  signIn(req, res) {}

  signUp(req, res) {}
}

export { UserController };
