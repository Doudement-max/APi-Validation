import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateOrderDto } from './dto/create.order.dto';
import { OrderCancelDto } from './dto/cancel.order.dto';
import { OrderService } from './order.service';
import { ApiTags, ApiOperation, ApiResponse, ApiOperationOptions } from '@nestjs/swagger';
import { OrderResponse } from './dto/create.order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created', type: OrderResponse })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @HttpCode(201)
  @ApiOperation({
    summary: 'Cancel order',
    description: 'Cancel an existing order',
  } as ApiOperationOptions)
  @ApiResponse({ status: 201, description: 'The order has been successfully cancelled' })
  @Post(':id/cancel')
  async cancelOrder(@Param('id') id: string, @Body() cancelDetails: OrderCancelDto) {
    try {
      return await this.orderService.cancel(id, cancelDetails);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Find all orders' })
  @ApiResponse({ status: 200, description: 'All orders have been successfully retrieved' })
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find order by ID' })
  @ApiResponse({ status: 200, description: 'Order has been successfully retrieved' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderService.findOrderById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
