/*import { Module } from '@nestjs/common';
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
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';  
import { MongooseCoreModule } from './order-api/order-module';
import { DatabaseModule } from './databasemodule'; 

// Config
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  controllers: [ProductController,OrderController,CustomController],
 
  imports: [
    ProductModule, 
    OrderModule, 
    CustomModule, 
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/nestdb',
      })
    })
  ],
 
  providers: [ProductService,OrderService,CustomService],
})

export class AppModule {}*/


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
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  controllers: [ProductController,OrderController,CustomController],
 
  imports: [
    ProductModule, OrderModule, CustomModule,],
 
  providers: [ProductService,OrderService,CustomService],
})

export class AppModule {}
