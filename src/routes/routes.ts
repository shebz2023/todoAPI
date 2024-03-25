import express from 'express';
import {  createTodo, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from '../controllers/todos';
import { createUser, deleteUserByEmail, getAllUsers, login } from '../controllers/users';
import { authenticateUser, authorizeAdmin } from '../middlewares/auth';
import { getSubs,getAllSubs,createSubs,deleteSubs } from '../controllers/subs';

const router = express.Router();


// todos 
router.get('/todos', getAllTodos);
router.post('/todos',authenticateUser, createTodo);
router.get('/todos/:id', getTodoById);
router.patch('/todos/:id',authenticateUser, updateTodoById);
router.delete('/todos/:id',authenticateUser, deleteTodoById);


// subs
router.get('/subs',authenticateUser,authorizeAdmin,getAllSubs);
router.get('/subs/:id',authenticateUser,authorizeAdmin,getSubs);
router.post('/subs',createSubs);
router.delete('/subs/:id',authenticateUser,authorizeAdmin,deleteSubs)


// accounts
router.get('/users',authenticateUser,authorizeAdmin, getAllUsers);
router.post('/login', login);
router.post('/signup', createUser);
router.delete('/users/:email',authenticateUser,authorizeAdmin, deleteUserByEmail);

export default router;
