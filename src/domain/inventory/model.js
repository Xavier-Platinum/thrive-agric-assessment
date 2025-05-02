const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: { //REVIEW - Consider using a separate Category model
    type: String,
    // enum: ['electronics', 'furniture', 'clothing', 'food', 'other'],
    default: 'other'
  },
  supplier: { //REVIEW: Normalized supplier information
    name: {
      type: String,
      required: false
    },
    contact: {
      phone: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: false,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        }
      }
    },
    address: {
      street: {
        type: String,
        required: false
      },
      city: {
        type: String,
        required: false
      },
      state: {
        type: String,
        required: false
      },
      zipCode: {
        type: String,
        required: false
      },
      country: {
        type: String,
        required: false
      }
    }
  },
  expirationDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return v > Date.now();
      },
      message: props => `${props.value} is not a valid expiration date!`
    }
  },
  batchNumber: {
    type: String,
    required: false,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'out_of_stock', 'discontinued'],
    default: 'available'
  },
  location: {
    aisle: String,
    shelf: String,
    bin: String
  },
  tags: [{
    type: String,
    trim: true,
    // default: ''
  }],
  lastUpdated: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
  archivedAt: {
    type: Date,
    default: null
  },
  archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  archivedReason: {
    type: String,
    default: null
  },
  archivedNotes: {
    type: String,
    default: null
  },
  deleted: { type: Boolean, default: false },
  deletedAt: {
    type: Date,
    default: null
  },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deletedReason: {
    type: String,
    default: null
  },
  deletedNotes: {
    type: String,
    default: null
  },
  images: [{
    url: String,
    altText: String,
    publicId: String,
  }],
  barcode: {
    type: String,
    unique: false,
    trim: true,
    // validate: {
    //   validator: function(v) {
    //     return /^[0-9]{12,13}$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid barcode!`
    // }
  },
  serialNumber: {
    type: String,
    unique: true,
    trim: true,
    // validate: {
    //   validator: function(v) {
    //     return /^[A-Z0-9]{8,12}$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid serial number!`
    // }
  },
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  customFields: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  auditTrail: [{ //REVIEW - Consider using a separate Audit model
    action: {
      type: String,
      enum: ['created', 'updated', 'deleted', 'archived', 'unarchived'],
      required: true
    },
    timestamp: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    changes: mongoose.Schema.Types.Mixed
  }],
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
