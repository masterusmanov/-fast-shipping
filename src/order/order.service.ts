import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto) {
    const createOrder = await new this.orderModel(createOrderDto).save();
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      String(createOrder._id),
      {order_unique_id: String(createOrder._id)},
      {new: true}
    ).populate('currency_type_id')
    return updatedOrder;
  };
  

  findAll() {
    return this.orderModel.find().populate('currency_type_id');
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
