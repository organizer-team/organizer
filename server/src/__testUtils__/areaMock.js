import Area from '../models/Area';

export const addAreaToMockDB = async (newArea) => {
  const area = new Area(newArea);
  await area.save();

  const areaId = area._id;
  return areaId.toString();
};

// Mock the Area.create method to throw an error
export const serverErrorMock = async () => {
  jest.spyOn(Area, 'create').mockImplementation(() => {
    throw new Error('Server error');
  });
};
