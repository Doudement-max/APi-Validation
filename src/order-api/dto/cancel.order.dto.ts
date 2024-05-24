import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../order.model'; 

@Injectable()
export class OrderCancelDto {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async cancel(id: string) {
  
    const order = await this.orderModel.findById(id);

    
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

  
    if (order.status === 'cancelled') {
      return { message: `Order #${id} is already cancelled` };
    }


    order.status = 'cancelled';
    order.cancelDate = new Date();
    
  
    await order.save();

    return order;
  } 
  
}
