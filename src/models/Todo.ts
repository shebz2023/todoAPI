import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
