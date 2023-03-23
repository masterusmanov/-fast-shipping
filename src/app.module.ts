import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { CurrencyTypeModule } from './currency_type/currency_type.module';
import { OrderModule } from './order/order.module';
import { OperationModule } from './operation/operation.module';
import { StatusModule } from './status/status.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
  MongooseModule.forRoot(process.env.MONGO_URL),
  AdminModule,
  CurrencyTypeModule,
  OrderModule,
  OperationModule,
  StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
