import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { OrderResponse } from "./dto/create-order.dto";
import { Order } from "./order.entity"; 
import { OrderRepository } from "./order.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";



@Module({
     imports:[Order, OrderResponse, 
        TypeOrmModule.forFeature([OrderRepository]),
     ], 
     
    controllers: [OrderController],
    providers: [OrderService, OrderRepository,],
    exports: [OrderService]
}) 

export class OrderModule {}