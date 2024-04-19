import express from 'express';
import {
  createUser,
  createGuestUser,
  getUsers,
  login,
  logout,
  getProfile,
  updateUser,
  updatePassword,
  deleteUser,
  checkEmail,
  getUserById,
} from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/register', createUser);
userRouter.post('/registerGuest', createGuestUser);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/profile', getProfile);
userRouter.put('/update', updateUser);
userRouter.put('/password/update', updatePassword);
userRouter.delete('/delete', deleteUser);
userRouter.get('/:_id', getUserById);

userRouter.get('/checkemail/:email', checkEmail);

export default userRouter;
