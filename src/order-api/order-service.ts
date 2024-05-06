import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  private readonly orders = [];

  create(createOrderDto: CreateOrderDto){
    this.orders.push(createOrderDto);
  }

  findAll(){
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find(item => item.id === id);
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

    this.orders.push(order);
    return order;
  }
}
