import mongoose from 'mongoose';

export const OpenaiSchema = new mongoose.Schema({
  message: {
    role: { type: String },
    content: { type: String },
  },
  success: { type: Boolean },
  result: {
    message: {
      role: { type: String },
      content: { type: String },
    },
    updated_at: { type: Date },
  },
  created_at: { type: Date, default: Date.now },
});
