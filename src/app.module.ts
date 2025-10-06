import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_CONFIGS } from './config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: APP_CONFIGS.database.host,
      port: APP_CONFIGS.database.port,
      username: APP_CONFIGS.database.user,
      password: APP_CONFIGS.database.password,
      database: APP_CONFIGS.database.name,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Note: Set to false in production
    }),
    ProductsModule,
    OrdersModule,
    CommonModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
