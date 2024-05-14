import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() 
export class OrderDocs extends Document {
    @Prop() 
    custom: string;

    @Prop() 
    product: string;

    @Prop() 
    name: string;
    
    @Prop() 
    status: string;

    @Prop() 
    order: string;

    @Prop() 
    data: number;

    @Prop() 
    totalAmount: number;
}
export const OrderScherma = SchemaFactory.createForClass(OrderDocs);

export const ProductSchema = new mongoose.Schema({
sku: String,
name: String,
price: Number,

})
