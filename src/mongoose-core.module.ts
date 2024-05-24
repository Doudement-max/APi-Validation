import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { moduleRefProvider } from './module-ref.provider'; 

@Global() 
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017',
      }),
    }),
  ],
  providers: [moduleRefProvider], 
  exports: [moduleRefProvider], 
})
export class MongooseCoreModule {}
