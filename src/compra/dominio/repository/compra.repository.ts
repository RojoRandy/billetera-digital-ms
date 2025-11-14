import { Compra } from "../entity/compra.entity";
import { IdSesionCompra } from "../value-object/id-sesion-compra.value-object";


export interface CompraRepository {
  create(compra: Compra): Promise<void>;
  findByCompraPendiente(idSession: IdSesionCompra): Promise<Compra>;
  updateEstado(compra: Compra): Promise<void>
}

export const compraRepositoryDefinition = {
  name: "CompraRepository"
}