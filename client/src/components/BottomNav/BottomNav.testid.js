import createTestIdFilePath from '../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('components', 'BottomNav')}-container`,
  addButton: `${createTestIdFilePath('components', 'BottomNav')}-addButton`,
  popupMenu: `${createTestIdFilePath('components', 'BottomNav')}-popupMenu`,
  calendarButton: `${createTestIdFilePath('components', 'BottomNav')}-calendarButton`,
  taskButton: `${createTestIdFilePath('components', 'BottomNav')}-taskButton`,
};

export default TEST_ID;
