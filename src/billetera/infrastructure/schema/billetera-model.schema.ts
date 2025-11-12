import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BilleteraDocument = HydratedDocument<BilleteraModel>;

@Schema({
  collection: 'billetera',
  timestamps: true
})
export class BilleteraModel {
  @Prop()
  _id: string;

  @Prop({ required: true, unique: true })
  documento: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BilleteraSchema = SchemaFactory.createForClass(BilleteraModel)