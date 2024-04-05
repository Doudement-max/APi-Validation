export class CreateProductDto {
    readonly customer: string;
    readonly items: string[];
    readonly total: number;
}

export class UpgradeProductDto {
    readonly items?: string[];
    readonly total?: number;
}

export class GetProductDto {
    readonly id: string;
}