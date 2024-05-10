import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  color_id: { type: String },
  description: { type: String },
});

const Area = mongoose.model('areas', areaSchema);

export default Area;
