import { Cliente } from "src/cliente/domain/entity/cliente.entity";

export interface BilleteraService {
  crearBilletera(cliente: Cliente): Promise<void>
}

export const billeteraServiceDefinition = {
  name: 'BilleteraService'
}