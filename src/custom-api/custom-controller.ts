import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CustomService } from "./custom-service"; 
import { CreateCustomDto } from "./dto/create-custom.dto";

@Controller('custom')
export class CustomController {
    constructor(private readonly customService: CustomService) {}

    @Post() 
    create(@Body() createCustomDto: CreateCustomDto) {
        return this.customService.create(createCustomDto);
    } 

    @Get()
    findAll() {
        return this.customService.findAll();
    }  

    @Get(':id') 
    findOne(@Param('id') id: string) {
         return this.customService.findOne(+id);
    }
}