import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderCancelDto } from './dto/cancel-order.dto';

@Injectable()
export class OrderService {
  private readonly order = [];

  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
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

  async someMethod() {
    const session = await this.orderModel.startSession();
    session.startTransaction();
    try {
      const newOrder = new this.orderModel();
      newOrder.name = 'Novo peido';
      await newOrder.save({ session });

      const existingOrder = await this.orderModel.findById(1).session(session);
      if (existingOrder) {
        existingOrder.name = 'Pedido atualizado';
        await existingOrder.save({ session });
      } 

      const orderToDelete = await this.orderModel.findById(2).session(session);
      if (orderToDelete){
        await orderToDelete.remove({ session });
      }else {
        throw new Error('Ordem não encontrada.');
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async cancel(id: string, cancelDetails: OrderCancelDto) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    if (order.status === 'cancelled') {
      return {menssage: `Order #${id} is already cancelled`}
    }
    order.status = 'cancelled';
    order.cancelDetails = cancelDetails;
    order.cancelDate = new Date();
    
    await order.save();

    return order;
  }

  createOrderWithSession(session: unknown) {
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
