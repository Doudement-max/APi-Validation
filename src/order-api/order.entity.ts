import { Injectable } from '@nestjs/common';
import { Model, Schema, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderCancelDto } from "/home/doudement/Documentos/api-validation/nestjs-validation/src/order-api/dto/cancel-order.dto";

export interface OrderEntity extends Document {
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

@Injectable() 
export class OrderService{
  constructor(
    @InjectModel('OrderEntity') private orderModel: Model<OrderEntity>,
  ) {}
}
