const { Router } = require('express');
const controller = require('../controllers/user.controller');

const userRoutes = Router();

const {
  getUsers,
  getUserById,
  getUserByUserName,
  updateUser,
  deleteUser,
  addUser,
  login
} = controller;

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.get('/userByName/:username/:email', getUserByUserName);
userRoutes.post('/', addUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.post('/login', login);

module.exports = userRoutes;
