import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { OrderResponse } from "./dto/create-order.dto";
import { Order } from "./order.entity"; 
import { OrderRepository } from "./order.repository";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";



@Module({
     imports:[Order, OrderResponse, MongooseModule.forRoot('mongodb://localhost/mydb')], 
     
    controllers: [OrderController],
    providers: [OrderService, OrderRepository, ],
})
export class MongooseCoreModule{}
export class OrderModule {}