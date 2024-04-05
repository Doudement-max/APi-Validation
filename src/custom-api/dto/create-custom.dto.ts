export class CreateCustomDto {
    readonly customer: string; 
    readonly items: string[];
    readonly total: number;
} 

export class UpdateCustomDto {
    readonly items?: string[];
    readonly total?: number;
}

export class GetCustomDto {
    readonly id: string;
}