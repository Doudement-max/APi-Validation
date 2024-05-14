import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { OrderEntity } from "./order.entity"; 
import { OrderRepository } from "./order.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "src/databasemodule";
import { OrderDocs, OrderScherma } from "src/product.model/product.model";

@Module({
  imports: [
  MongooseModule.forFeature([{ name: OrderDocs.name, schema: OrderScherma}]),
    DatabaseModule
  ], 
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
}) 
export class OrderModule {}  
