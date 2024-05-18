// TimeSelector.testid.js
import createTestIdFilePath from '../../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('components', 'TimeSelector')}-container`,
  nowButton: `${createTestIdFilePath('components', 'TimeSelector')}-nowButton`,
  morningButton: `${createTestIdFilePath('components', 'TimeSelector')}-morningButton`,
  afternoonButton: `${createTestIdFilePath('components', 'TimeSelector')}-afternoonButton`,
  eveningButton: `${createTestIdFilePath('components', 'TimeSelector')}-eveningButton`,
  nightButton: `${createTestIdFilePath('components', 'TimeSelector')}-nightButton`,
  noTimeButton: `${createTestIdFilePath('components', 'TimeSelector')}-noTimeButton`,
  timeInput: `${createTestIdFilePath('components', 'TimeSelector')}-timeInput`,
};

export default TEST_ID;
