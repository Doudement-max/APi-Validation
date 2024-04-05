import { Module } from '@nestjs/common';
import { ProductController } from './product-api/product-controller';
import { ProductService } from './product-api/product-service'; 
import { OrderController } from './order-api/order-controller';
import { OrderService } from './order-api/order-service';
import { CustomController } from './custom-api/custom-controller';
import { CustomService } from './custom-api/custom-service';
@Module({
  imports: [],
  controllers: [ProductController,OrderController,CustomController],
  providers: [ProductService,OrderService,CustomService],
})
export class AppModule {}
