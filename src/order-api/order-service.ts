/*import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import Shopify, { IOrder } from 'shopify-api-node'; // Importe os tipos corretos

@Injectable()
export class OrderService {
  private readonly order = [];
  private shopify: Shopify; // Substitua por sua instância do Shopify

  constructor() {
    this.shopify = new Shopify({  }); 
  }

  create(createOrderDto: CreateOrderDto){
    this.order.push(createOrderDto);
  }

  findAll(){
    return this.order;
  }

  findOne(id: number) {
    return this.order.find(item => item.id === id);
  }

  async createOrderWithSession(session: any) {
    const order: IOrder = {
      line_items: [
        {
          title: "Big Brown Bear Boots",
          price: 74.99,
          grams: 1300,
          quantity: 3,
          tax_lines: [
            {
              price: 13.5,
              rate: 0.06,
              title: "State tax"
            }
          ]
        }
      ],
      transactions: [
        {
          kind: "sale",
          status: "success",
          amount: 238.47
        }
      ],
      total_tax: 13.5,
      currency: "EUR"
    };

    return await this.shopify.order.create(order);
  }
}
*/