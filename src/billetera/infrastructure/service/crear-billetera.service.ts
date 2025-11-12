import { Injectable } from "@nestjs/common";
import { BilleteraService } from "src/billetera/domain/service/billetera.service";
import { Cliente } from "src/cliente/domain/entity/cliente.entity";

@Injectable()
export class CrearBilleteraService implements BilleteraService {
  public async crearBilletera(cliente: Cliente): Promise<void> {
    
  }
}