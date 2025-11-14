import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CompraRepository } from "src/compra/dominio/repository/compra.repository";
import { CompraModel } from "../schema/compra-model.schema";
import { Model } from "mongoose";
import { Compra } from "src/compra/dominio/entity/compra.entity";
import { CompraRegistroException } from "src/compra/dominio/exception/compra-registro.exception";
import { IdSesionCompra } from "src/compra/dominio/value-object/id-sesion-compra.value-object";
import { CompraNotFoundException } from "src/compra/dominio/exception/compra-not-found.exception";
import { CompraActualizacionException } from "src/compra/dominio/exception/compra-actualizacion.exception";
import { EstadoCompraEnum } from "src/compra/dominio/value-object/estado-compra.value-object";

@Injectable()
export class CompraRepositoryImpl implements CompraRepository {
  constructor(
    @InjectModel(CompraModel.name)
    private compraModel: Model<CompraModel>
  ){}

  async findByCompraPendiente(idSesion: IdSesionCompra): Promise<Compra> {
    const compra = await this.compraModel.findOne({
      idSesion: idSesion.value,
      estado: EstadoCompraEnum.PENDIENTE
    }).exec()

    if (!compra) throw CompraNotFoundException.findByIdSesion();

    return Compra.fromPrimitives({
      idSesion: compra.idSesion,
      documento: compra.documento,
      total: compra.total,
      token: compra.token,
      estado: compra.estado,
      createdAt: compra.createdAt,
      updatedAt: compra.updatedAt
    })
  }

  async create(compra: Compra): Promise<void> {
    try {
      const compraNueva = new this.compraModel({
        ...compra.toPrimitives()
      })
      await compraNueva.save()
    } catch (error) {
      throw CompraRegistroException.unexpected()
    }
  }

  async updateEstado(compra: Compra): Promise<void> {
    const {idSesion, estado} = compra.toPrimitives()

    const compraActualizar = await this.compraModel.findOne({
      idSesion
    }).exec()

    if (!compra) throw CompraNotFoundException.findByIdSesion();
    
    try {
      await compraActualizar?.updateOne({
        estado
      })
    } catch (error) {
      throw CompraActualizacionException.unexpected()
    }
  }
}