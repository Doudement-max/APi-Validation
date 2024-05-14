import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderEntity } from './order.entity';
import { OrderDocs } from 'src/product.model/product.model';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderDocs.name)
    private readonly orderModel: Model<OrderDocs>,
  ) {}

  async findOrderById(id: number): Promise<OrderDocs | null> {
    try {
      return await this.orderModel.findById(id);
    } catch (error) {
      console.error('Erro ao buscar ordem pelo ID:', error.message);
      throw new Error('Erro ao buscar ordem pelo ID.');
    }
  }

  async updateOrder(id: number, orderData: any): Promise<OrderDocs | null> {
    try {
      const existingOrder = await this.findOrderById(id); 

      if (existingOrder instanceof this.orderModel) {
        // Verifique se os dados do pedido são válidos antes de tentar atualizá-lo
        if (!orderData || !orderData.custom || !orderData.product || !orderData.totalAmount) {
          throw new Error('Dados do pedido inválidos.');
        }

        existingOrder.custom = orderData.custom;
        existingOrder.product = orderData.product;
        existingOrder.totalAmount = orderData.totalAmount;

        await existingOrder.save(); 
        return existingOrder;
      } else {
        throw new Error(`Ordem com ID ${id} não encontrada.`);
      }
    } catch (error) {
      console.error('Erro ao atualizar a ordem:', error.message);
    
      throw new Error(`Não foi possível atualizar a ordem: ${error.message}`);
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

  async createOrder(orderData: {custom: string; product: string }): Promise<OrderDocs> {
    try {
      const newOrder = new this.orderModel(orderData);
      return await newOrder.save();
    } catch (error) {
      console.error('Erro ao criar a ordem:', error.message);
      throw new Error('Não foi possível criar a ordem.');
    }
  } 
}
