import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core'; 
import { ShopifyCoreModule } from '@nestjs-shopify/core';
// os imports de Product, Order e Custom.
import { ProductController } from './product-api/product-controller';
import { ProductService } from './product-api/product-service';
import { ProductModule } from './product-api/product-module'; 
import { OrderController } from './order-api/order-controller';
import { OrderService } from './order-api/order-service';
import { OrderModule } from './order-api/order-module';
import { CustomController } from './custom-api/custom-controller';
import { CustomService } from './custom-api/custom-service';
import { CustomModule } from './custom-api/custom-module';
// Config
import {ConfigModule} from '@nestjs/config';

@Module({
  controllers: [ProductController,OrderController,CustomController],
 
  imports: [
    ProductModule, 
    OrderModule, 
    CustomModule, 
    ConfigModule.forRoot({ isGlobal: true }),
  ],
 
  providers: [ProductService,OrderService,CustomService],
})
export class AppModule {}
