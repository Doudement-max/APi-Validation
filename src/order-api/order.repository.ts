import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async findOrderById(id: number): Promise<Order | null> {
    try {
      const order = await this.orderModel.findById(id);
      return order || null;
    } catch (error) {
      console.error('Erro ao buscar ordem pelo ID:', error.message);
      return null;
    }
  }

  async updateOrder(id: number, orderData: any): Promise<Order | null> {
    try {
      const existingOrder = await this.findOrderById(id); 

      if (existingOrder instanceof this.orderModel) {
        existingOrder.custom = orderData.custom;
        existingOrder.product = orderData.product;
        existingOrder.totalAmount = orderData.totalAmount;

        await existingOrder.save(); 
        return existingOrder;
      } else {
        throw new Error('Ordem não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a ordem:', error.message);
      throw new Error('Não foi possível atualizar a ordem.');
    }
  }
  
  async deleteOrder(id: number): Promise<void> {
    try {
      const existingOrder = await this.findOrderById(id); 
      if (!existingOrder) {
        throw new Error('Ordem não encontrada.');
      }
  
      await this.orderModel.deleteOne({ _id: id }); 
    } catch (error) {
      console.error('Erro ao excluir a ordem:', error.message);
      throw new Error('Não foi possível excluir a ordem.');
    }
  }

  async createOrder(orderData: {custom: string; product: string }): Promise<Order> {
    const newOrder = new this.orderModel(orderData);
    return newOrder.save();
  } 
}
