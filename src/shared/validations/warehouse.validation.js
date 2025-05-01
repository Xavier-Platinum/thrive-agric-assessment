const Joi = require('joi');

const operatingHoursSchema = Joi.object({
    monday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional(),
    tuesday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional(),
    wednesday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional(),
    thursday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional(),
    friday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional(),
    saturday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional(),
    sunday: Joi.object({ open: Joi.string(), close: Joi.string() }).optional()
}).optional();

const addressSchema = Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zipCode: Joi.string().optional(),
    country: Joi.string().optional()
}).optional();

const imageSchema = Joi.object({
    url: Joi.string().uri().required(),
    altText: Joi.string().optional(),
    publicId: Joi.string().optional()
});

exports.warehouseValidationSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().optional(),
    capacity: Joi.number().min(0).optional(),
    currentStock: Joi.number().min(0).optional(),
    inventory: Joi.array().items(Joi.string().hex().length(24)).optional(),
    manager: Joi.string().hex().length(24).optional(),
    contactNumber: Joi.string().optional(),
    email: Joi.string().email().optional(),
    address: addressSchema,
    operatingHours: operatingHoursSchema,
    status: Joi.string().valid('active', 'inactive', 'under_maintenance').default('active'),
    customFields: Joi.object().optional(),
    images: Joi.array().items(imageSchema).optional()
});

exports.warehouseUpdateValidationSchema = Joi.object({
    name: Joi.string().optional(),
    location: Joi.string().optional(),
    capacity: Joi.number().min(0).optional(),
    currentStock: Joi.number().min(0).optional(),
    inventory: Joi.array().items(Joi.string().hex().length(24)).optional(),
    manager: Joi.string().hex().length(24).optional(),
    contactNumber: Joi.string().optional(),
    email: Joi.string().email().optional(),
    address: addressSchema,
    operatingHours: operatingHoursSchema,
    status: Joi.string().valid('active', 'inactive', 'under_maintenance').default('active'),
    customFields: Joi.object().optional(),
    images: Joi.array().items(imageSchema).optional()
});

exports.warehouseDeleteValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    reason: Joi.string().optional(),
    notes: Joi.string().optional()
});

exports.warehouseArchiveValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    reason: Joi.string().optional(),
    notes: Joi.string().optional()
});

exports.warehouseUnarchiveValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

exports.warehouseRestoreValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

exports.warehouseGetAllValidationSchema = Joi.object({
    search: Joi.string().optional(),
    filter: Joi.object().optional(),
    page: Joi.number().integer().min(1).default(1).optional(),
    limit: Joi.number().integer().min(1).max(100).default(10).optional(),
    sort: Joi.object({
        field: Joi.string().valid('name', 'location', 'capacity', 'currentStock', 'status').optional(),
        order: Joi.string().valid('asc', 'desc').optional()
    }).optional()
});

exports.warehouseGetByIdValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

exports.warehouseGetByNameValidationSchema = Joi.object({
    name: Joi.string().required()
});
