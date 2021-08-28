const joi = require('@hapi/joi');

// Create all your joi schemas
const itemIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const itemStringSchema = joi.string().max(50);
const itemNumberSchema = joi.number().min(0).max(100);
const itemUrlSchema = joi.string().uri();
const itemTagsSchema = joi.array().items(joi.string().max(50));
const itemDateSchema = joi.date().iso();
const itemEmailSchema = joi.string().email();

const createItemSchema = {
    string: itemStringSchema.required(),
    number: itemNumberSchema.required(),
    url: itemUrlSchema.required(),
    email: itemEmailSchema.required(),
    date: itemDateSchema.required(),
    tags: itemTagsSchema,
};

const updateItemSchema = {
    string: itemStringSchema,
    number: itemNumberSchema,
    url: itemUrlSchema,
    email: itemEmailSchema,
    tags: itemTagsSchema,
    date: itemDateSchema
};

module.exports = {
    itemIdSchema,
    createItemSchema,
    updateItemSchema
};