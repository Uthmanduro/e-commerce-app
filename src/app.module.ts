import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_CONFIGS } from './config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: APP_CONFIGS.database.host,
      port: APP_CONFIGS.database.port,
      username: APP_CONFIGS.database.user,
      password: APP_CONFIGS.database.password,
      database: APP_CONFIGS.database.name,
      entities: [],
      synchronize: true, // Note: Set to false in production
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
