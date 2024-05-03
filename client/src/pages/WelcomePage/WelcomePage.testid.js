import createTestIdFilePath from '../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('pages', 'WelcomePage')}-container`,
  guestUserButton: `${createTestIdFilePath('pages', 'WelcomePage')}-guestUserButton`,
  userAccountLink: `${createTestIdFilePath('pages', 'WelcomePage')}-userAccountLink`,
  loadingContainer: `${createTestIdFilePath('pages', 'WelcomePage')}-loadingContainer`,
  errorContainer: `${createTestIdFilePath('pages', 'WelcomePage')}-errorContainer`,
};

export default TEST_ID;
