import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create.order.dto';
import { OrderCancelDto } from './dto/cancel.order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = new this.orderModel(createOrderDto);
      return await newOrder.save();
    } catch (error) {
      console.error('Erro ao criar a ordem:', error.message);
      throw new Error('Não foi possível criar a ordem.');
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderModel.find().exec();
    } catch (error) {
      console.error('Erro ao buscar todas as ordens:', error.message);
      throw new Error('Não foi possível buscar todas as ordens.');
    }
  }

  async findOrderById(id: string): Promise<Order | null> {
    try {
      return await this.orderModel.findById(id).exec();
    } catch (error) {
      console.error('Erro ao buscar ordem pelo ID:', error.message);
      throw new Error('Erro ao buscar ordem pelo ID.');
    }
  }

  async cancel(id: string, cancelDetails: OrderCancelDto): Promise<Order> {
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new NotFoundException(`Order #${id} não encontrada`);
      }

      if (order.status === 'cancelled') {
        return { message: `Order #${id} já está cancelada` } as any;
      }

      order.status = 'cancelled';
      order.cancelDetails = cancelDetails;
      order.cancelDate = new Date();
      await order.save();

      return order;
    } catch (error) {
      console.error('Erro ao cancelar a ordem:', error.message);
      throw new Error('Não foi possível cancelar a ordem.');
    }
  }

  async updateOrder(id: string, updateOrderDto: CreateOrderDto): Promise<Order | null> {
    try {
      const existingOrder = await this.findOrderById(id);

      if (!existingOrder) {
        throw new NotFoundException(`Order #${id} não encontrada`);
      }

      Object.assign(existingOrder, updateOrderDto);
      return await existingOrder.save();
    } catch (error) {
      console.error('Erro ao atualizar a ordem:', error.message);
      throw new Error('Não foi possível atualizar a ordem.');
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      const existingOrder = await this.findOrderById(id);
      if (!existingOrder) {
        throw new NotFoundException('Order não encontrada.');
      }

      await this.orderModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      console.error('Erro ao excluir a ordem:', error.message);
      throw new Error('Não foi possível excluir a ordem.');
    }
  }
}
