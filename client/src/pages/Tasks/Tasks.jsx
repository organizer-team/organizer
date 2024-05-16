import React, { useState, useEffect } from 'react';
import TEST_ID from './Tasks.testid.js';
import TimeTrackerView from '../../components/TimeTrackerView/TimeTrackerView.jsx';
import TaskList from '../../components/TaskList/TaskList.jsx';
import AddTaskButton from '../../components/AddTaskButton/AddTaskButton.jsx';
import { logError } from '../../../../server/src/util/logging.js';
const Tasks = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleDayBoxClick = async (
    selectedDate,
    selectedMonth,
    selectedYear
  ) => {
    try {
      // fetch the user profile to get the user ID
      const profileResponse = await fetch(
        'http://localhost:5000/api/user/profile',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const profileData = await profileResponse.json();
      const userId = profileData?.user?.id;

      if (!userId) {
        logError('User ID not found');
        return;
      }

      // fetch tasks based on user ID
      const tasksResponse = await fetch(
        `http://localhost:5000/api/task/${userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const tasksData = await tasksResponse.json();
      if (!tasksData.tasks) {
        logError('Tasks not found');
        return;
      }
      const tasks = tasksData.tasks;

      // filter tasks based on the selected date
      const filteredTasks = tasks.filter((task) => {
        const taskEndTime = new Date(task.end_time);
        const taskYear = taskEndTime.getFullYear();
        const taskMonth = taskEndTime.getMonth();
        const taskDay = taskEndTime.getDate();
        // check if the selected date falls within the end time of the task
        return (
          selectedYear === taskYear &&
          selectedMonth === taskMonth &&
          selectedDate === taskDay
        );
      });

      // set filtered tasks in state
      setFilteredTasks(filteredTasks);
    } catch (error) {
      logError('Error fetching data:', error);
    }
  };

  // fetch tasks for today by default
  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = currentDate.getDate();
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();
    handleDayBoxClick(selectedDate, selectedMonth, selectedYear);
  }, []);

  return (
    <div data-testid={TEST_ID.container} className="bg-indigo-200">
      <TimeTrackerView onDayBoxClick={handleDayBoxClick} />
      <TaskList tasks={filteredTasks} />
      <AddTaskButton />
    </div>
  );
};

export default Tasks;
