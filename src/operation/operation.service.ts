import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operation, OperationDocument } from './schema/operation.schema';



@Injectable()
export class OperationService {
  constructor(@InjectModel(Operation.name) private operationModel: Model<OperationDocument>) {}

  create(createOperationDto: CreateOperationDto) {
    const createOperation = new this.operationModel({
      ...CreateOperationDto
    })
    return createOperation.save();
  }

  findAll() {
    return this.operationModel.find();
  }

  findOneById(id: string) {
    return this.operationModel.findById(id).exec();
  }

  update(id: string, updateOperationDto: UpdateOperationDto) {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto, {new: true});
  }

  remove(id: string) {
    return this.operationModel.findByIdAndDelete(id);
  }
}
