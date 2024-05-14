import Area from '../models/Area.js';

/** GET AREAS BY USER ID
 *
 * @route GET /api/area/:userId/
 * @desc Get all areas for a user
 */

export const getAreasByUserId = async (req, res) => {
  try {
    // Get the user id from the request
    const user_id = req.params.userId;
    // Find all areas that have the user id
    const areas = await Area.find({ user_id });
    // If there are no areas, send a 404 status code
    if (!areas || areas.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No areas found' });
    }
    // Send the areas back to the client
    res.status(200).json({ success: true, areas });
  } catch (err) {
    // If there is an error, send a 500 status code
    res.status(500).json({ message: err.message });
  }
};

/** CREATE AREA
 *
 * @route POST /api/area/create
 * @desc Create a new area with the given user id
 */

export const createArea = async (req, res) => {
  try {
    // Get the user id from the request
    const { userId } = req.body;
    // Create a new area with the user id
    const area = await Area.create({ ...req.body, user_id: userId });
    // Send the area back to the client
    res.status(201).json({ success: true, area });
  } catch (err) {
    // If there is an error, send a 500 status code
    res.status(500).json({ message: err.message });
  }
};
