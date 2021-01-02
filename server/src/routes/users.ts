import express from 'express';
import * as usersController from '../controllers/users';

const router = express.Router();

router.get('/', usersController.getUsers);

router.get('/:userId', usersController.getUser);

router.put('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

export default router;