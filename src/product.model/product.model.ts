/*import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'typeorm';


@Schema() 
export class Order extends Document {
    @Prop() 
    custom: string;

    @Prop() 
    product: string;

    @Prop() 
    status: string;

    @Prop() 
    order: string;

    @Prop() 
    data: number;
}
export const OrderScherma = SchemaFactory.createForClass(Order);

export const ProductSchema = new mongoose.Schema({
sku: String,
name: String,
price: Number,

})*/