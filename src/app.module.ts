import { Module } from '@nestjs/common'; 
import { OrderModule } from './order-api/order.module';
import { OrderService } from './order-api/order.service';
import { OrderController } from './order-api/order.controller';


@Module({
  imports: [
  OrderModule
  ], 
  providers: [OrderService],
  controllers: [OrderController],
})
export class AppModule {}
