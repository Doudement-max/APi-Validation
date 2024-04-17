/*import { Controller, Get, Post, Body, Param, Req } from "@nestjs/common"; 
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order-service";

@APiTAgs('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post() 
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    } 

    @Post('createWithSession') 
    async createWithSession(@Req() req: Request) {
        const session = req.session; 
        return this.orderService.createOrderWithSession(session);
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }  

    @Get(':id') 
    findOne(@Param('id') id: string) {
         return this.orderService.findOne(+id);
    }
}
*/