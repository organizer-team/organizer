import createTestIdFilePath from '../../utils/createTestIdFilePath';

const TEST_ID = {
  container: `${createTestIdFilePath('components', 'ColourSelector')}-container`,
  'button-Red': `${createTestIdFilePath('components', 'ColourSelector')}-button-Red`,
  'button-Green': `${createTestIdFilePath('components', 'ColourSelector')}-button-Green`,
  'button-Blue': `${createTestIdFilePath('components', 'ColourSelector')}-button-Blue`,
  'button-Yellow': `${createTestIdFilePath('components', 'ColourSelector')}-button-Yellow`,
  'button-Purple': `${createTestIdFilePath('components', 'ColourSelector')}-button-Purple`,
  'button-Orange': `${createTestIdFilePath('components', 'ColourSelector')}-button-Orange`,
  'button-Black': `${createTestIdFilePath('components', 'ColourSelector')}-button-Black`,
  'button-No Colour': `${createTestIdFilePath('components', 'ColourSelector')}-button-No Colour`,
};

export default TEST_ID;
