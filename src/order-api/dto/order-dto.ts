import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderCancelDto } from './cancel-order.dto';

export class OrderDto implements Partial<OrderDto> {
  toObject(): import("../order.entity").OrderEntity {
    throw new Error('Method not implemented.');
  }
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  remove: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  cancelDetails: OrderCancelDto;

  @ApiProperty()
  @IsNotEmpty()
  cancelDate: Date;
  _id: any;
}
