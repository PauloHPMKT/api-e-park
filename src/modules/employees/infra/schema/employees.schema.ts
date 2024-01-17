import mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  role_gpt_generate: {
    type: String,
    default: 'user',
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
