import { ClienteId } from "../value-object/cliente-id.value-object";
import { DocumentoCliente } from "../value-object/documento-cliente.value-object";


export class ClienteNotFoundException extends Error {
  public static findById(id: ClienteId): ClienteNotFoundException {
    return new this(`Cliente con id ${id.value} no encontrado.`);
  }
  public static findByDocumento(documento: DocumentoCliente): ClienteNotFoundException {
    return new this(`Cliente con documento ${documento} no encontrado.`);
  }
}