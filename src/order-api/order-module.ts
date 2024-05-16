import { Module } from "@nestjs/common";
import { OrderController } from "./order-controller";
import { OrderService } from "./order-service";
import { ProductModule } from "src/product-api/product-module";
import { CustomModule } from "src/custom-api/custom-module";
import { MongooseModule } from "@nestjs/mongoose"; 
import { OrderSchema } from "./order.model";


@Module({
  imports: [ProductModule,CustomModule, MongooseModule.forFeature([{name:'order',schema: OrderSchema}])], 
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
}) 
export class OrderModule {}
