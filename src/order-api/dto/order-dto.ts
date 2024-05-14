import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderEntity } from '../order.entity';
import { OrderCancelDto } from './cancel-order.dto';

export class OrderDto implements Partial<OrderEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: number;

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
}
