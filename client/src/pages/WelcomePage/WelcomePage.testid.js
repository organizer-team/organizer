import createTestIdFilePath from '../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('pages', 'WelcomePage',)}-container`,
  submitButton: `${createTestIdFilePath('pages', 'WelcomePage',)}-submitButton`,
  loadingContainer: `${createTestIdFilePath('pages', 'WelcomePage',)}-loadingContainer`,
  errorContainer: `${createTestIdFilePath('pages', 'WelcomePage',)}-errorContainer`,
};

export default TEST_ID;
