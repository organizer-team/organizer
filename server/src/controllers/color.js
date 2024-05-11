import Color from '../models/Color.js';

/** GET ALL COLORS
 *
 * @route GET /api/color/
 * @desc Get all colors
 */

export const getColors = async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json({ success: true, colors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
