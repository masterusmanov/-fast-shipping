import { Module } from '@nestjs/common';
import { CurrencyTypeService } from './currency_type.service';
import { CurrencyTypeController } from './currency_type.controller';
import { Currency_type, Currency_typeSchema } from './schema/currency_type.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Currency_type.name, schema: Currency_typeSchema }])],
  controllers: [CurrencyTypeController],
  providers: [CurrencyTypeService]
})
export class CurrencyTypeModule {}
