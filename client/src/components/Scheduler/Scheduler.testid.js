import createTestIdFilePath from '../../utils/createTestIdFilePath';

const TEST_ID = {
  element: `${createTestIdFilePath('components', 'Scheduler')}-element`,
  container: `${createTestIdFilePath('components', 'Scheduler')}-container`,
  quickOptions: `${createTestIdFilePath('components', 'Scheduler')}-quick-options`,
  todayButton: `${createTestIdFilePath('components', 'Scheduler')}-today-button`,
  tomorrowButton: `${createTestIdFilePath('components', 'Scheduler')}-tomorrow-button`,
  thisWeekendButton: `${createTestIdFilePath('components', 'Scheduler')}-this-weekend-button`,
  nextWeekButton: `${createTestIdFilePath('components', 'Scheduler')}-next-week-button`,
  noDateButton: `${createTestIdFilePath('components', 'Scheduler')}-no-date-button`,
  calendarView: `${createTestIdFilePath('components', 'Scheduler')}-calendar-view`,
};

export default TEST_ID;
