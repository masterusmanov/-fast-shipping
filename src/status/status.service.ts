import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Status, StatusDocument } from './schema/status.schema';
import { Model } from 'mongoose';


@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<StatusDocument>) {}

  create(createStatusDto: CreateStatusDto) {
    const createStatus = new this.statusModel({
      ...CreateStatusDto
    })
    return createStatus.save();
  }

  findAll() {
    return this.statusModel.find();
  }

  findOneById(id: string) {
    return this.statusModel.findById(id).exec();
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusModel.findByIdAndUpdate(id, updateStatusDto, {new: true});
  }

  remove(id: string) {
    return this.statusModel.findByIdAndDelete(id);
  }
}
