import createTestIdFilePath from '../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('components', 'AddTaskForm')}-container`,
  form: `${createTestIdFilePath('components', 'AddTaskForm')}-form`,
  nameInput: `${createTestIdFilePath('components', 'AddTaskForm')}-nameInput`,
  description: `${createTestIdFilePath('components', 'AddTaskForm')}-description`,
  dueDateSelector: `${createTestIdFilePath('components', 'AddTaskForm')}-dueDateSelector`,
  colourSelector: `${createTestIdFilePath('components', 'AddTaskForm')}-colourSelector`,
  areaSelector: `${createTestIdFilePath('components', 'AddTaskForm')}-areaSelector`,
  closeButton: `${createTestIdFilePath('components', 'AddTaskForm')}-closeButton`,
  sendButton: `${createTestIdFilePath('components', 'AddTaskForm')}-sendButton`,
};

export default TEST_ID;
