// /validations/inventory.validation.js
const Joi = require('joi');

const supplierSchema = Joi.object({
    name: Joi.string().optional(),
    contact: Joi.object({
        phone: Joi.string().optional(),
        email: Joi.string().email().optional()
    }).optional(),
    address: Joi.object({
        street: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string().optional(),
        country: Joi.string().optional()
    }).optional()
}).optional();

const locationSchema = Joi.object({
    aisle: Joi.string().optional(),
    shelf: Joi.string().optional(),
    bin: Joi.string().optional()
}).optional();

const dimensionsSchema = Joi.object({
    length: Joi.number().optional(),
    width: Joi.number().optional(),
    height: Joi.number().optional()
}).optional();

const imageSchema = Joi.object({
    url: Joi.string().uri().required(),
    altText: Joi.string().optional(),
    publicId: Joi.string().optional()
});

const auditTrailSchema = Joi.object({
    action: Joi.string().valid('created', 'updated', 'deleted', 'archived', 'unarchived').required(),
    timestamp: Joi.date().default(Date.now),
    userId: Joi.string().hex().length(24).optional(),
    changes: Joi.object().optional()
});

exports.inventoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    quantity: Joi.number().min(0).required(),
    warehouseId: Joi.string().hex().length(24).required(),
    description: Joi.string().allow('', null),
    price: Joi.number().min(0).required(),
    category: Joi.string().default('other'),
    supplier: supplierSchema,
    expirationDate: Joi.date().greater('now').optional(),
    batchNumber: Joi.string().optional(),
    status: Joi.string().valid('available', 'out_of_stock', 'discontinued').default('available'),
    location: locationSchema,
    tags: Joi.array().items(Joi.string().trim()).optional(),
    barcode: Joi.string().optional(),
    serialNumber: Joi.string().optional().trim(),
    // serialNumber: Joi.string().regex(/^[A-Z0-9]{8,12}$/).optional(),
    weight: Joi.number().optional(),
    dimensions: dimensionsSchema,
    customFields: Joi.object().optional(),
    auditTrail: Joi.array().items(auditTrailSchema).optional(),
    images: Joi.array().items(imageSchema).optional()
});

exports.updateInventoryValidationSchema = Joi.object({
    name: Joi.string().trim(),
    quantity: Joi.number().min(0),
    warehouseId: Joi.string().hex().length(24),
    description: Joi.string().allow('', null),
    price: Joi.number().min(0),
    category: Joi.string(),
    supplier: supplierSchema,
    expirationDate: Joi.date().greater('now'),
    batchNumber: Joi.string(),
    status: Joi.string().valid('available', 'out_of_stock', 'discontinued'),
    location: locationSchema,
    tags: Joi.array().items(Joi.string().trim()),
    barcode: Joi.string(),
    serialNumber: Joi.string(),
    // serialNumber: Joi.string().regex(/^[A-Z0-9]{8,12}$/),
    weight: Joi.number(),
    dimensions: dimensionsSchema,
    customFields: Joi.object(),
    auditTrail: Joi.array().items(auditTrailSchema).optional(),
    images: Joi.array().items(imageSchema).optional()
});

exports.getInventoryValidationSchema = Joi.object({
    search: Joi.string().optional(),
    filter: Joi.object().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.object({
        field: Joi.string().valid('name', 'quantity', 'price', 'createdAt').default('createdAt'),
        order: Joi.string().valid('asc', 'desc').default('asc')
    }).optional()
});

exports.deleteInventoryValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

exports.getInventoryByIdValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

exports.getInventoryByNameValidationSchema = Joi.object({
    name: Joi.string().trim().required()
});

exports.inventoryArrayValidationSchema = Joi.array().items({
    name: Joi.string().trim().required(),
    quantity: Joi.number().min(0).required(),
    warehouseId: Joi.string().hex().length(24).required(),
    description: Joi.string().allow('', null),
    price: Joi.number().min(0).required(),
    category: Joi.string().default('other'),
    supplier: supplierSchema,
    expirationDate: Joi.date().greater('now').optional(),
    batchNumber: Joi.string().optional(),
    status: Joi.string().valid('available', 'out_of_stock', 'discontinued').default('available'),
    location: locationSchema,
    tags: Joi.array().items(Joi.string().trim()).optional(),
    barcode: Joi.string().optional(),
    serialNumber: Joi.string().optional().trim(),
    // serialNumber: Joi.string().regex(/^[A-Z0-9]{8,12}$/).optional(),
    weight: Joi.number().optional(),
    dimensions: dimensionsSchema,
    customFields: Joi.object().optional(),
    auditTrail: Joi.array().items(auditTrailSchema).optional(),
    images: Joi.array().items(imageSchema).optional()
});

// exports.validateInventoryArray = (req, res, next) => {
//     const schema = Joi.array().items(inventoryValidationSchema);

//     const { error } = schema.validate(req.body, { abortEarly: false });

//     if (error) {
//         return res.status(400).json({
//             success: false,
//             statusCode: 400,
//             data: null,
//             error: error.details.map(err => err.message)
//         });
//     }

//     next();
// };
