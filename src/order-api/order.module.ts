import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.model';

@Injectable()
export class OrderProvider {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}
  
  provideOrderModel() {
    return this.orderModel;
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderProvider],
  exports: [OrderProvider]
})
export class OrderModule {}
