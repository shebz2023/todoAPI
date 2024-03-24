"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.getTodoById = exports.getAllTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const todos_1 = require("../validations/todos");
// create
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { error } = todos_1.todoVal.validate(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const todo = new Todo_1.default({
            title,
            content,
        });
        const savedTodo = yield todo.save();
        res.status(201).send({ savedTodo, message: 'Todo created successfully!!' });
    }
    catch (error) {
        console.log(error, "the error that happened creating todo");
        res.status(500).send({ message: error.message });
    }
});
exports.createTodo = createTodo;
// ALL
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.find();
        if (todos.length === 0) {
            res.status(404).json({ message: 'No todo posts found' });
        }
        else {
            res.status(200).json(todos);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve todo posts' });
    }
});
exports.getAllTodos = getAllTodos;
// one
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const todo = yield Todo_1.default.findById(todoId);
        if (todo) {
            res.status(200).json(todo);
        }
        else {
            res.status(404).json({ error: 'Todo post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve todo post' });
    }
});
exports.getTodoById = getTodoById;
const updateTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, completed } = req.body;
        const { error } = todos_1.todoVal.validate(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        if (!title && !content && !completed) {
            return res.status(400).send({ error: 'At least one property (title, content, or completed) must be provided' });
        }
        const updateObj = {};
        if (title) {
            updateObj.title = title;
        }
        if (content) {
            updateObj.content = content;
        }
        if (completed) {
            updateObj.completed = completed;
        }
        const updatedTodo = yield Todo_1.default.findByIdAndUpdate(req.params.id, updateObj, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo post not found' });
        }
        res.send({ updatedTodo, message: 'Todo updated!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const deletedTodo = yield Todo_1.default.findByIdAndDelete(todoId);
        if (deletedTodo) {
            res.status(200).json({ message: 'Todo post deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Todo post not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete todo post' });
    }
});
exports.deleteTodoById = deleteTodoById;
