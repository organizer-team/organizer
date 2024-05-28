import isPlainObject from './isPlainObject';

/**
 * This function will return a string describing the error if the given object has properties not in the allowed list.
 * If there is no error, it will return an empty string.
 *
 * @param object - The object to validate.
 * @param allowedFields - An array of strings denoting the properties that are allowed
 * @returns A string indicating the properties that are not allowed to be set, or an empty string if all properties are allowed.
 * @throws Error if the object is not a plain object or if allowedFields is not an array.
 */
const validateAllowedFields = (
  object: Record<string, unknown>,
  allowedFields: string[]
): string => {
  if (!isPlainObject(object)) {
    throw new Error('object must be a plain object');
  }

  if (!Array.isArray(allowedFields)) {
    throw new Error('allowedFields must be an array');
  }

  const invalidFields: string[] = [];

  Object.keys(object).forEach((key) => {
    if (!allowedFields.includes(key)) {
      invalidFields.push(key);
    }
  });

  if (invalidFields.length > 0) {
    return `the following properties are not allowed to be set: ${invalidFields.join(
      ', '
    )}`;
  } else {
    return '';
  }
};

export default validateAllowedFields;
