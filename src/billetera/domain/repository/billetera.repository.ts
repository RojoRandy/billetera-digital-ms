import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { Billetera } from "../entity/billetera.entity";
import { BilleteraId } from "../value-object/billetera-id.value-object";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";

export interface BilleteraRepository {
  create(billetera: Billetera): Promise<void>;
  update(billetera: Billetera): Promise<void>;
  findByDatosCliente(documento: DocumentoCliente, celular: CelularCliente): Promise<Billetera>;
}

export const billeteraRepositoryDefinition = {
  name: "BilleteraRepository"
}