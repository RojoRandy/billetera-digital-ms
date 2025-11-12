import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cliente } from "src/cliente/domain/entity/cliente.entity";
import { ClienteRepository } from "src/cliente/domain/repository/cliente.repository";
import { ClienteId } from "src/cliente/domain/value-object/cliente-id.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { ClienteModel } from "../schema/cliente-model.schema";
import { ClienteNotFoundException } from "src/cliente/domain/exception/cliente-not-found.exception";
import { ClientesModelToDomainMapper } from "../mapper/clientes-model-to-domain.mapper";
import { ClienteRegistroException } from "src/cliente/domain/exception/cliente-registro.exception";

@Injectable()
export class ClienteRepositoryImpl implements ClienteRepository {

  constructor(
    @InjectModel(ClienteModel.name)
    private clienteModel: Model<ClienteModel>
  ) {}

  async create(cliente: Cliente): Promise<void> {
    const {id: _id, ...propsCliente} = cliente.toPrimitives();

    const exists = await this.clienteModel.countDocuments({documento: cliente.documento.value}).exec();
    if (exists > 0) {
      throw ClienteRegistroException.alreadyExists(cliente.documento);
    }

    try {
      const clienteNuevo = new this.clienteModel({
        ...propsCliente,
        _id,
      })
      await clienteNuevo.save();
    } catch (error) {
      throw ClienteRegistroException.unexpected();
    }
  }

  async findById(id: ClienteId): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id.value).exec();

    if(!cliente) throw ClienteNotFoundException.findById(id);

    return Cliente.fromPrimitives({
      id: cliente._id,
      documento: cliente.documento,
      nombres: cliente.nombres,
      email: cliente.email,
      celular: cliente.celular,
      updatedAt: cliente.updatedAt,
      createdAt: cliente.createdAt,
    })
  }

  async findByDocumento(documento: DocumentoCliente): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({
      documento: documento.value
    }).exec();

    if(!cliente) throw ClienteNotFoundException.findByDocumento(documento);

    return Cliente.fromPrimitives({
      id: cliente._id,
      documento: cliente.documento,
      nombres: cliente.nombres,
      email: cliente.email,
      celular: cliente.celular,
      updatedAt: cliente.updatedAt,
      createdAt: cliente.createdAt,
    })
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteModel.find().exec();

    return ClientesModelToDomainMapper.execute(clientes);
  }
}