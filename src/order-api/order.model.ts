import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
@Schema() 
export class Order extends Document {
    @Prop({required: true}) 
    custom: string;

    @Prop({required: true}) 
    product: string;

    @Prop({required: true}) 
    name: string;
    
    @Prop({required: true}) 
    status: string;

    @Prop({required: true}) 
    order: string;

    @Prop({required: true}) 
    data: number;

    @Prop({required: true}) 
    totalAmount: number;
 
    @Prop({required: true})  
     cancelDate: Date;

     _id: Types.ObjectId;
  
  remove: unknown;
  customerName: string;
  cancelDetails: unknown;
}; 

export const OrderSchema = SchemaFactory.createForClass(Order);

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async findOrderById(id: number): Promise<Order | null> {
    try {
      return await this.orderModel.findById(id);
    } catch (error) {
      console.error('Erro ao buscar ordem pelo ID:', error.message);
      throw new Error('Erro ao buscar ordem pelo ID.');
    }
  }

  async updateOrder(id: number, orderData: any): Promise<Order | null> {
    try {
      const existingOrder = await this.findOrderById(id); 

      if (existingOrder) {
       
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

  async createOrder(orderData: {custom: string; product: string }): Promise<Order> {
    try {
      const newOrder = new this.orderModel(orderData);
      return await newOrder.save();
    } catch (error) {
      console.error('Erro ao criar a ordem:', error.message);
      throw new Error('Não foi possível criar a ordem.');
    }
  }    
}
