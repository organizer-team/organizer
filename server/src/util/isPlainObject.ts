const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) return false;

  let proto = Object.getPrototypeOf(value);
  if (proto === null) return false;

  while (proto !== null && Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
};

export default isPlainObject;
