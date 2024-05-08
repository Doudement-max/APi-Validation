import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderCancelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly amount: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly currency: string;
}
