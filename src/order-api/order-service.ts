import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { EntityManager, FindOneOptions, Repository, TransactionAlreadyStartedError } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderCancelDto } from './dto/cancel-order.dto';

@Injectable()
export class OrderService {
  private readonly order = [];

  constructor(
    @InjectRepository(Order)
    private orderRepository: OrderRepository,

    @InjectEntityManager() 
    private entityManager: EntityManager,
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
  async someMethod() {;
    await this.entityManager.transaction(async TransactionalEntityManager => {
      const newOrder = new Order();
      newOrder.name = 'Novo peido';
      await TransactionalEntityManager.save(newOrder);

      const existingOrder = await TransactionalEntityManager.findOne(Order, {id: 1} as FindOneOptions); 
       if (existingOrder) {
        existingOrder.name = 'Pedido atualizado';
        await TransactionalEntityManager.save(existingOrder);
       } 

       const orderToDelete = await TransactionalEntityManager.findOne(Order, {id: 2}as FindOneOptions);
       if (orderToDelete){
         await TransactionalEntityManager.remove(orderToDelete);
       }
    }) 
      
    
  }

  async cancel(id: string, cancelDetails: OrderCancelDto) {
    const order = await this.entityManager.findOne(Order, { id: id } as FindOneOptions)as unknown as Order | undefined;
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    if (order.status === 'cancelled') {
      return {menssage: `Order #${id} is already cancelled`}
    }
    order.status = 'cancelled';
    order.cancelDetails = cancelDetails;
    order.cancelDate = new Date();
    
    await this.entityManager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(order);
    });

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

function TransactionalEntityManager(entityManager: EntityManager): Promise<unknown> {
  throw new Error('Function not implemented.');
}
