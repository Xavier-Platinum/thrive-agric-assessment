const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid warehouse name!`
    }
  },
  location: {
    type: String,
    required: false,
    trim: true,
    default: null,
    // validate: {
    //   validator: function(v) {
    //     return /^[a-zA-Z0-9\s,]+$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid location!`
    // }
  },
  capacity: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  currentStock: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  contactNumber: String,
  email: {
    type: String,
    // validate: {
    //   validator: function(v) {
    //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid email!`
    // },
    default: null
  },
  address: {
    street: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    city: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    state: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    zipCode: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    country: {
      type: String,
      required: false,
      trim: true,
      default: null,
    }
  },
  operatingHours: {
    monday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } },
    tuesday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } },
    wednesday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } },
    thursday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } },
    friday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } },
    saturday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } },
    sunday: { open: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    }, close: {
      type: String,
      required: false,
      // validate: {
      //   validator: function(v) {
      //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid time format!`
      // },
      default: null
    } }
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
