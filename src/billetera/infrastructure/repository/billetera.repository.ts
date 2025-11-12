import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BilleteraRepository } from "src/billetera/domain/repository/billetera.repository";
import { BilleteraModel } from "../schema/billetera-model.schema";
import { Model } from "mongoose";
import { Billetera } from "src/billetera/domain/entity/billetera.entity";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { BilleteraRegistroException } from "src/billetera/domain/exception/billetera-registro.exception";
import { BilleteraActualizacionException } from "src/billetera/domain/exception/billetera-actualizacion.exception";
import { BilleteraNotFoundException } from "src/billetera/domain/exception/billetera-not-found.exception";

@Injectable()
export class BilleteraRepositoryImpl implements BilleteraRepository {
  constructor(
    @InjectModel(BilleteraModel.name)
    private billeteraModel: Model<BilleteraModel>
  ){}
  async create(billetera: Billetera): Promise<void> {
    const { id: _id, ...propsBilletera } = billetera.toPrimitives();

    const exists = await this.billeteraModel.countDocuments({ documento: propsBilletera.documento }).exec();
    if (exists > 0) {
      throw BilleteraRegistroException.alreadyExists(propsBilletera.documento)
    }

    try {
      const billeteraNueva = new this.billeteraModel({
        ...propsBilletera,
        _id
      });
      await billeteraNueva.save()
    } catch (error) {
      throw BilleteraRegistroException.unexpected()
    }
  }
  async updateCantidad(billetera: Billetera): Promise<void> {
    const { id: _id, documento, cantidad } = billetera.toPrimitives();

    const billeteraActualizar = await this.billeteraModel.findById(_id).exec();

    if (!billeteraActualizar) throw BilleteraActualizacionException.notFound(documento)

    try {
      await billeteraActualizar?.updateOne({
        cantidad
      })
    } catch (error) {
      throw BilleteraActualizacionException.unexpected()
    }
  }

  async findByDatosCliente(documento: DocumentoCliente, celular: CelularCliente): Promise<Billetera> {
    const billetera = await this.billeteraModel.findOne({
      documento: documento.value,
      celular: celular.value
    }).exec();

    if (!billetera) throw BilleteraNotFoundException.findByDatosCliente(documento.value, celular.value);

    return Billetera.fromPrimitives({
      id: billetera._id,
      documento: billetera.documento,
      celular: billetera.celular,
      cantidad: billetera.cantidad,
      createdAt: billetera.createdAt,
      updatedAt: billetera.updatedAt
    })
  }
}