import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema() 
export class OrderDocs extends Document {
    @Prop({required: true}) 
    custom: string;

    @Prop({required: true}) 
    product: string;

    @Prop({required: true}) 
    name: string;
    
    @Prop({required: true}) 
    status: string;

    @Prop({required: true}) 
    order: string;

    @Prop({required: true}) 
    data: number;

    @Prop({required: true}) 
    totalAmount: number;
 
    @Prop({required: true})  
     cancelDate: Date;

     _id: Types.ObjectId;
  
  remove: unknown;
  customerName: string;
  cancelDetails: unknown;
}; 


export const OrderScherma = SchemaFactory.createForClass(OrderDocs);

export const ProductSchema = new mongoose.Schema({
sku: String,
name: String,
price: Number,

})
