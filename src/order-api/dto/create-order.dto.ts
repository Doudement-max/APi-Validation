export class CreateOrderDto {
    readonly customer: string;
    readonly items: string[];
    readonly total: number;
} 

export class UpdateOrderDto {
    readonly items?: string[]; 
    readonly total?: number;
}

export class GetOrderDto {
    readonly id: string;
}