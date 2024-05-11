import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.entity'; 

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectModel(Order.name)
    private readonly mongooseOrderModel: Model<Order>,
  ) {}

  async findOrderById(id: number): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOne(id as FindOneOptions<Order>);
      return order || null;
    } catch (error) {
      
      console.error('Erro ao buscar ordem pelo ID:', error.message);
      return null;
    }
  }

  async updateOrder(id: number, orderData: any): Promise<Order | null> {
    try {
      const existingOrder = await this.findOrderById(id); 
      if (!existingOrder) {
        return null; 
      }
  
     
      existingOrder.custom = orderData.custom;
      existingOrder.product = orderData.product;
      existingOrder.totalAmount = orderData.totalAmount;
  
      await this.orderRepository.save(existingOrder); 
      return existingOrder;
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
  
      await this.orderRepository.delete(id); 
    } catch (error) {
      console.error('Erro ao excluir a ordem:', error.message);
      throw new Error('Não foi possível excluir a ordem.');
    }
  }
 async createOrder(orderData: {custom: string; product: string }): Promise<Order> {
     const newOrder = new this.mongooseOrderModel(orderData);
     return newOrder.save();
 } 

}