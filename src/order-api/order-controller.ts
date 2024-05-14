import { Controller, Get, Post, Body, Param, Req, HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order-service";
import { ApiTags, ApiOperation, ApiResponse, ApiOperationOptions } from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { Session } from "@nestjs/common";
import { OrderResponse } from "./dto/create-order.dto";

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post() 
    @ApiOperation({summary: 'Create order'})
    @ApiResponse({status: 201, description: 'The order has been successfully created'})
    async create(@Body() CreateOrderDto: CreateOrderDto) {
        return await this.orderService.create(CreateOrderDto);
    }

    @HttpCode(201)
    @ApiOperation({
      status: 201,
      description: 'O Pedido foi criado com sucesso',
      type: OrderResponse,
    } as ApiOperationOptions)
     
    @Post(':id/cancel')
    @ApiOperation({summary: 'Cancelar o Pedido'})
    async cancelOrder(@Param('id') id: string, @Body() cancelDetails: {amount: string, currency: string}) {}

    @Get()
    async findAll() {
        return await this.orderService.findAll();
    }
}
