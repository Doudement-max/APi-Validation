import { Injectable } from '@nestjs/common';
import { Model, Schema, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderCancelDto } from "/home/doudement/Documentos/api-validation/nestjs-validation/src/order-api/dto/cancel-order.dto";

export interface OrderEntity extends Document {
  id: number;
  remove: string;
  name: string; 
  customerName: string;
  totalAmount: number;
  status: string;
  cancelDetails: OrderCancelDto;
  cancelDate: Date;
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  cancelDetails: { type: Object, required: true },
  cancelDate: { type: Date, required: true },
});
import mongoose from 'mongoose';
import { OrderDto } from './dto/order-dto';

@Injectable() 
export class OrderService{
  constructor(
    @InjectModel('OrderEntity') private orderModel: Model<OrderEntity>,
  ) {

    this.initializeModel();
  }

 
  initializeModel() {
    this.orderModel = mongoose.model<OrderEntity>('OrderEntity', OrderSchema);
  } 
  async findAll(): Promise<OrderDto[]> {
    const docs = await this.orderModel.find().exec();
    return docs.map(doc => ({
      id: doc._id.toString(),
      remove: doc.remove,
      name: doc.name,
      customerName: doc.customerName,
      totalAmount: doc.totalAmount,
      status: doc.status,
      cancelDetails: doc.cancelDetails,
      cancelDate: doc.cancelDate,
    }));
  }
}
