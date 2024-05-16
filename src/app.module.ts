import { Module } from '@nestjs/common';
// os imports de Product, Order e Custom.

import { ProductModule } from './product-api/product-module'; 
import { OrderModule } from './order-api/order-module';


import { CustomModule } from './custom-api/custom-module';
import { MongooseModule } from '@nestjs/mongoose';  


// Config
import {ConfigModule, ConfigService} from '@nestjs/config';


@Module({
  controllers: [],
 
  imports: [
    ProductModule, 
    OrderModule, 
    CustomModule, 

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/nestdb',
      })
    })
  ],
 
  providers: [],
})

export class AppModule {}
