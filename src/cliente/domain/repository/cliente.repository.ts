import { Cliente } from "../entity/cliente.entity";
import { ClienteId } from "../value-object/cliente-id.value-object";
import { DocumentoCliente } from "../value-object/documento-cliente.value-object";

export interface ClienteRepository {
  create(cliente: Cliente): Promise<void>;
  findById(id: ClienteId): Promise<Cliente>;
  findByDocumento(documento: DocumentoCliente): Promise<Cliente>;
  findAll(): Promise<Cliente[]>;
}

export const clienteRepositoryDefinition = {
  name: "ClienteRepository"
}