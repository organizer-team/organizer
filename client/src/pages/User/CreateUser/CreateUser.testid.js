import createTestIdFilePath from '../../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('pages', 'User', 'CreateUser')}-container`,
  form: `${createTestIdFilePath('pages', 'User', 'CreateUser')}-form`,
  userNameInput: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-userNameInput`,
  passwordInput: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-passwordInput`,
  confirmPasswordInput: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-confirmPasswordInput`,
  emailInput: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-emailInput`,
  submitButton: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-submitButton`,
  loadingContainer: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-loadingContainer`,
  errorContainer: `${createTestIdFilePath(
    'pages',
    'User',
    'CreateUser'
  )}-errorContainer`,
};

export default TEST_ID;
