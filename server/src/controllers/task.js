import Task from '../models/Task.js';
import Area from '../models/Area.js';

/** GET TASKS BY USER ID
 *
 * @route GET /api/task/:userId/
 * @desc Get all tasks for a user
 */

export const getTasksByUserId = async (req, res) => {
  try {
    // Get the user id from the request
    const user_id = req.params.userId;
    // Find all tasks that have the user id
    let tasks = await Task.find({ user_id });
    // Find all areas that have the user id and filter when task.area_id and area._id are the same
    const areas = await Area.find({ user_id });
    tasks = tasks.map((task) => {
      const area = areas.find((area) => area._id.toString() === task.area_id);
      if (area) {
        const { title, description, color_code } = area;
        return { ...task._doc, area: { title, description, color_code } };
      } else {
        return {
          ...task._doc,
          area: { title: '', description: '', color_code: '' },
        };
      }
    });
    // If there are no tasks, send a 404 status code
    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No tasks found' });
    }
    // Send the tasks back to the client
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    // If there is an error, send a 500 status code
    res.status(500).json({ message: err.message });
  }
};

/** CREATE TASK
 *
 * @route POST /api/task/create
 * @desc Create a new task with the given user id
 */

export const createTask = async (req, res) => {
  try {
    // Get the user id from the request
    const { userId } = req.body;
    // Create a new task with the user id
    const task = await Task.create({ ...req.body, user_id: userId });
    // Send the task back to the client
    res.status(201).json({ success: true, task });
  } catch (err) {
    // If there is an error, send a 500 status code
    res.status(500).json({ message: err.message });
  }
};
