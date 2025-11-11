import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ClienteDocument = HydratedDocument<ClienteModel>;

@Schema({
  collection: 'clientes',
  timestamps: true,
})
export class ClienteModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, unique: true, required: true })
  _id: string;

  @Prop({ required: true, unique: true })
  documento: string;

  @Prop({ required: true, minLength: 3, maxlength: 50 })
  nombres: string;

  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true })
  celular: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ClienteSchema = SchemaFactory.createForClass(ClienteModel)