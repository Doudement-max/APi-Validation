import { ApiProperty } from "@nestjs/swagger";

export class LineItem {
    @ApiProperty()
    title: string;

    @ApiProperty()
    price: number;

    @ApiProperty() 
    quantity: number;
}

export class CreateOrderDto {
    readonly customer: string;
    readonly items: string[];
    readonly total: number;
    lineItems: any;
    totalTax: string;
    currency: string;
    @ApiProperty() 
    id: number

    @ApiProperty()
    email:string;

    @ApiProperty({type:  [LineItem] })
    line_items: LineItem[];
} 

export class UpdateOrderDto {
    readonly items?: string[]; 
    readonly total?: number;
}

export class GetOrderDto {
    readonly id: string;
}

class ShopMoney {
    @ApiProperty()
    amount: string;

    @ApiProperty() 
    currency_code: string;
}