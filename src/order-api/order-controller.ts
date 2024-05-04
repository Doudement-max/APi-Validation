import { Controller, Get, Post, Body, Param, Req, HttpException, HttpStatus } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order-service";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { Session } from "@nestjs/common";
@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post() 
    async create(@Body() CreateOrderDto: CreateOrderDto) {
        return await this.orderService.create(CreateOrderDto);
    }

    @Get()
    async findAll() {
        return await this.orderService.findAll();
    }

}