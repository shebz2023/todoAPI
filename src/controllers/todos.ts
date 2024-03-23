import { Request, Response } from 'express';
import Todo from '../models/Todo';
import { todoVal } from '../validations/todos';


// create
export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const { error } = todoVal.validate(req.body);
        if (error) {
          return res.status(400).send({ error: error.details[0].message });
        }
  
        const todo = new Todo({
          title,
          content,
        });
  
        const savedTodo = await todo.save();
        res.status(201).send({ savedTodo, message: 'Todo created successfully!!' });
  
      } catch (error) {
        console.log(error,"the error that happened creating todo")
        res.status(500).send({ message: (error as Error).message });
      }
    }
      
// ALL
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();

    if (todos.length === 0) {
      res.status(404).json({ message: 'No todo posts found' });
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todo posts' });
  }
};

// one
export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id; 
    const todo = await Todo.findById(todoId);


    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: 'Todo post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todo post' });
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { error } = todoVal.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }


    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, content},
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo post not found' });
    }

    res.send({ updatedTodo, message: 'Todo updated!' });
  } catch (err: any) {
    return res.status(500).send({ message: (err as Error).message });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (deletedTodo) {
      res.status(200).json({ message: 'Todo post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Todo post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo post' });
  }
};

   