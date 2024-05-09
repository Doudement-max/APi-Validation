import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('orders') 
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 100})
customerName: string;
 
@Column({ type: 'decimal', precision: 10, scale: 2}) 
totalAmount: number; 
  status: string;
  cancelDetails: import("/home/doudement/Documentos/api-validation/nestjs-validation/src/order-api/dto/cancel-order.dto").OrderCancelDto;
}


