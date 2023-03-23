import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OperationDocument = HydratedDocument<Operation>;

@Schema()
export class Operation {
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'order'})
  orderId: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'status'})
  statusId: string;

  @Prop({required: true})
  operationDate: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'admin'})
  adminId: string;

  @Prop()
  description: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);