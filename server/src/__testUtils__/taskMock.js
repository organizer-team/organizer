import Task from '../models/Task';

export const addTaskToMockDB = async (newTask) => {
  const task = new Task(newTask);
  await task.save();

  const taskId = task._id;
  return taskId.toString();
};
