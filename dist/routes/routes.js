"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = require("../controllers/todos");
const users_1 = require("../controllers/users");
const auth_1 = require("../middlewares/auth");
const subs_1 = require("../controllers/subs");
const router = express_1.default.Router();
// todos 
router.get('/todos', todos_1.getAllTodos);
router.post('/todos', auth_1.authenticateUser, auth_1.authorizeAdmin, todos_1.createTodo);
router.get('/todos/:id', todos_1.getTodoById);
router.patch('/todos/:id', auth_1.authenticateUser, auth_1.authorizeAdmin, todos_1.updateTodoById);
router.delete('/todos/:id', auth_1.authenticateUser, auth_1.authorizeAdmin, todos_1.deleteTodoById);
router.post('/todos/:id/like', auth_1.authenticateUser);
// subs
router.get('/subs', auth_1.authenticateUser, auth_1.authorizeAdmin, subs_1.getAllSubs);
router.get('/subs/:id', auth_1.authenticateUser, auth_1.authorizeAdmin, subs_1.getSubs);
router.post('/subs', subs_1.createSubs);
router.delete('/subs/:id', auth_1.authenticateUser, auth_1.authorizeAdmin, subs_1.deleteSubs);
// accounts
router.get('/users', auth_1.authenticateUser, auth_1.authorizeAdmin, users_1.getAllUsers);
router.post('/login', users_1.login);
router.post('/signup', users_1.createUser);
router.delete('/users/:email', auth_1.authenticateUser, auth_1.authorizeAdmin, users_1.deleteUserByEmail);
exports.default = router;
