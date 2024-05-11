import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color_code: { type: String, required: true },
});

const Color = mongoose.model('colors', colorSchema);

export default Color;
