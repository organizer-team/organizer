import Task from '../models/Task';

export const addTaskToMockDB = async (newTask) => {
  const task = new Task(newTask);
  await task.save();

  const taskId = task._id;
  return taskId.toString();
};

export const findTaskInMockDB = async (taskId) => {
  const task = await Task.findById(taskId);
  return task;
};
