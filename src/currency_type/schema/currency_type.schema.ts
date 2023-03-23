import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Currency_typeDocument = HydratedDocument<Currency_type>;

@Schema()
export class Currency_type {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const Currency_typeSchema = SchemaFactory.createForClass(Currency_type);
