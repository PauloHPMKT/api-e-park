import mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpnj: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
