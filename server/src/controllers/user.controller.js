const controller = {};
const UserModel = require('../schemes/user.scheme');
const bcrypt = require('bcrypt');
const createAccessToken = require('../utils/jwt');
// npm install jsonwebtoken

controller.updateUser = async (req, res) => {
  try {
    const allUsers = await UserModel.findByIdAndUpdate(req.params.id, {
      username: req.body.username
    });
    const userUpdtated = await UserModel.findById(req.params.id);
    res.status(200).send(userUpdtated);
  } catch (err) {
    res
      .status(409)
      .send({ error: `Error al actualizar usuario ${req.params.id}` });
  }
};

controller.deleteUser = async (req, res) => {
  try {
    const allUsers = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(409).send({ error: `Error al borrar usuario ${req.params.id}` });
  }
};

controller.getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(409).send({ error: 'Error al consultar usuarios' });
  }
};

controller.getUserByUserName = async (req, res) => {
  try {
    const allUsers = await UserModel.find({
      $and: [{ username: req.params.username }, { email: req.params.email }]
    });
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(409).send({ error: 'Error al consultar usuarios' });
  }
};

controller.getUserById = async (req, res) => {
  try {
    const allUsers = await UserModel.findById(req.params.id);
    if (!allUsers) res.status(404).send({ error: 'El usuario no existe' });
    else res.status(200).send(allUsers);
  } catch (err) {
    res.status(409).send({ error: 'Error al consultar usuario' });
  }
};

controller.addUser = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  //Generar un hash de la contraseña
  const saltRounds = 10; //Nº de rondas de sal para la encriptación
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    email
  });
  try {
    await newUser.save();
    res.status(201).send({ message: 'User created' });
    res.end();
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ error: 'Email exists' });
    }
  }
};

controller.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await UserModel.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: 'The email does not exists' });
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: 'The password is incorrect' });

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username
    });
    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = controller;
