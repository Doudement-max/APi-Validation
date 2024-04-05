import { Injectable } from "@nestjs/common";
import { CreateCustomDto } from './dto/create-custom.dto';

@Injectable() 
export class CustomService {
    private readonly custom = [];

    create(createCustomDto: CreateCustomDto) {
        this.custom.push(createCustomDto);
    } 
    findAll() {
        return this.custom;
} 
findOne(id: number) {
    return this.custom.find(item => item.id === id);
}

}