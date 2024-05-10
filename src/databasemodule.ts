import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from "@nestjs/config";  

@Module({ 
    imports: [MongooseModule.forRootAsync({
        useFactory: async (ConfigService: ConfigService) => ({
            uri: ConfigService.get('mongodb://localhost:27017/nestdb'),
        }),
     inject: [ConfigService],
    })
],
exports: [MongooseModule],
})
export class DatabaseModule {}