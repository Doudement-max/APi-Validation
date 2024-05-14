import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { OrderEntity } from "./order.entity"; 
import { OrderRepository } from "./order.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/databasemodule";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]), 
    DatabaseModule
  ], 
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
}) 
export class OrderModule {}  
