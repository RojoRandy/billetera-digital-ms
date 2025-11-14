import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CompraDocument = HydratedDocument<CompraModel>;

@Schema({
  collection: 'compra',
  timestamps: true
})
export class CompraModel {
  @Prop({ required:true, unique: true })
  idSesion: string;

  @Prop({ required: true })
  documento: string;

  @Prop({ required: true })
  total: number;

  @Prop()
  token: string;
  
  @Prop({ required: true })
  estado: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CompraSchema = SchemaFactory.createForClass(CompraModel)