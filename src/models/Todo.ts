import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false 
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
