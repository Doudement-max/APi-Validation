import { Injectable } from '@nestjs/common';
import { Model, Schema} from 'mongoose';
import { Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OrderDto } from './dto/order-dto';

export interface OrderEntity extends Document{
  [x: string]: unknown;
  _id: string;
  id: string;
  remove: string;
  name: string; 
  customerName: string;
  totalAmount: number;
  status: string;
  cancelDetails: {
    amount: string;
    currency: string;
  };
  cancelDate: Date;
}

const OrderCancelSchema = new Schema({
  amount: String,
  currency: String,
});

export const OrderEntitySchema: Schema = new Schema({
  id: { type: Number, required: true },
  remove: { type: String, required: true },
  name: { type: String, required: true },
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  cancelDetails: { type: OrderCancelSchema, required: true },
  cancelDate: { type: Date, required: true },
});

@Injectable() 
export class OrderRepository{
  constructor(
    @InjectModel('OrderEntity') private orderModel: Model<OrderDto>,
  ) {
    this.initializeModel();
  }

  initializeModel() {
    this.orderModel = mongoose.model<OrderDto>('OrderEntity', OrderEntitySchema);
  } 

  async findAll(): Promise<OrderDto[]> {
    const docs = await this.orderModel.find().exec();
    return docs.map(doc => this.transformToEntity(doc));
  }

  transformToEntity(newOrder: OrderDto): OrderEntity {
    const newOrderEntity: OrderEntity = newOrder.toObject();
    newOrderEntity.id = newOrder._id.toString();
    return newOrderEntity;
  }
  


  
}
