import { Injectable } from '@nestjs/common';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Currency_type, Currency_typeDocument } from './schema/currency_type.schema';
import { Model } from 'mongoose';



@Injectable()
export class CurrencyTypeService {
  constructor(@InjectModel(Currency_type.name) private currency_typeModel: Model<Currency_typeDocument>) {}

  create(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    const createdCurrency_type = new this.currency_typeModel({
      ...createCurrencyTypeDto
    });
    return createdCurrency_type.save();
  }

  findAll() {
    return this.currency_typeModel.find();
  }

  findOneById(id: string) {
    return this.currency_typeModel.findById(id).exec();
  }

  update(id: string, updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    return this.currency_typeModel.findByIdAndUpdate(id, updateCurrencyTypeDto, {new: true});
  }

  remove(id: string) {
    return this.currency_typeModel.findByIdAndDelete(id);
  }
}
