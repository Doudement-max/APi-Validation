import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  order: string;

  @Prop({ required: true })
  data: Date;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  cancelDate: Date;

  @Prop({type: Object})
  cancelDetails: unknown;
} 

export const OrderSchema = SchemaFactory.createForClass(Order);
