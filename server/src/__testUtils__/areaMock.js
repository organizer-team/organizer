import Area from '../models/Area';

export const addAreaToMockDB = async (newArea) => {
  const area = new Area(newArea);
  await area.save();

  const areaId = area._id;
  return areaId.toString();
};
