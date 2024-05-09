import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
sku: String,
name: String,
price: Number,

})