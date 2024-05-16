import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { OrderEntitySchema } from "./order.entity"; 
import { OrderRepository } from "./order.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "src/databasemodule";
import { OrderDocs, OrderScherma } from "src/product.model/product.model";
import { OrderCancelDto } from "./dto/cancel-order.dto";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderEntitySchema }]),
    DatabaseModule, 
  ], 
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService]
}) 
export class OrderModule {}
