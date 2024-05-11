import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  start_time: { type: Date },
  due_time: { type: Date },
  area_id: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('tasks', taskSchema);

export default Task;
