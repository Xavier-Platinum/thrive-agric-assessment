const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  currentStock: Number,
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  contactNumber: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'under_maintenance'],
    default: 'active'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
  archivedAt: Date,
  archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  archivedReason: String,
  archivedNotes: String,
  deleted: { type: Boolean, default: false },
  deletedAt: Date,
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedReason: String,
  deletedNotes: String,
  images: [{
    url: String,
    altText: String,
    publicId: String,
  }],
  customFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
