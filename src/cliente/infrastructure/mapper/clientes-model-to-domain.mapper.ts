import { Cliente } from "src/cliente/domain/entity/cliente.entity";
import { ClienteModel } from "../schema/cliente-model.schema";


export class ClientesModelToDomainMapper {
  public static execute (clientes: ClienteModel[]): Cliente[] {
    return clientes.map((cliente) => {
      return Cliente.fromPrimitives({
        id: cliente._id.toString(),
        documento: cliente.documento,
        nombres: cliente.nombres,
        email: cliente.email,
        celular: cliente.celular,
        updatedAt: cliente.updatedAt,
        createdAt: cliente.createdAt,
      })
    })
  }
}