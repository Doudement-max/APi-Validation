import {Injectable} from "@nestjs/common";
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    private readonly order = []; 

    create(createOrderDto: CreateOrderDto){
        this.order.push(CreateOrderDto);

    }
    findAll(){
        return this.order;
 }
 findOne(id: number) {
    return this.order.find(item => item.id === id)
 }       
}
