import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderCancelDto } from './dto/cancel-order.dto';

@Injectable()
export class OrderService {
  private readonly order = [];

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto){
    const order = {
      customer: createOrderDto.customer,
      items: createOrderDto.items,
      total: createOrderDto.total,
      lineItems: createOrderDto.lineItems,
      totalTax: createOrderDto.totalTax,
      currency: createOrderDto.currency
    };

    this.order.push(order);
    return order;
  }

  findAll(){
    return this.order;
  }

  findOne(id: number) {
    return this.order.find(item => item.id === id);
  }

  async cancel(id: string, cancelDetails: OrderCancelDto) {
    const order = await this.ordersRepository.findOne(id as FindOneOptions);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    order.status = 'cancelled';
    order.cancelDetails = cancelDetails;
    await this.ordersRepository.save(order);
    return order;
  }

  createOrderWithSession(session: any) {
    const order = {
      line_items: [
        {
          title: "Botas de Couro",
          price: 74.99,
          grams: 1300,
          quantity: 3,
          tax_lines: [
            {
              price: 13.5,
              rate: 0.06,
              title: "Imposto"
            }
          ]
        }
      ],
      transactions: [
        {
          kind: "Oferta",
          status: "Sucesso",
          amount: 238.47
        }
      ],
      total_tax: 13.5,
      currency: "BR$"
    };

    this.order.push(order);
    return order;
  }
}