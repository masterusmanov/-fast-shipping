import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  create(createOrderDto: CreateOrderDto) {
    const createOrder = new this.orderModel({
      ...createOrderDto
    })
    return createOrder.save();
  }

  findAll() {
    return this.orderModel.find();
  }

  findOneById(id: string) {
    return this.orderModel.findById(id).exec();
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true});
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
