import { Entity, PrimaryGeneratedColumn, Column, EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { OrderCancelDto } from "/home/doudement/Documentos/api-validation/nestjs-validation/src/order-api/dto/cancel-order.dto";
import { Injectable } from "@nestjs/common";

@Entity('order') 
export class Order {
    [x: string]: string | number | OrderCancelDto | Date;
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 100})
customerName: string;
 
@Column({ type: 'decimal', precision: 10, scale: 2}) 
totalAmount: number; 
  status: string;
  cancelDetails: OrderCancelDto;
  cancelDate: Date;
  static cancelDetails: OrderCancelDto;
  static status: string;
   
}

@Injectable() 
export class OrderService{
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}
}
