import { ClienteCreado } from "../event/cliente-creado.event";
import { CrearBilleteraClienteUseCase } from "src/billetera/application/use-case/crear-billetera.use-case";

export class CrearBilleteraCliente {
  public constructor(
    private readonly crearBilleteraUseCase: CrearBilleteraClienteUseCase,
  ){}

  public async execute(clienteCreado: ClienteCreado): Promise<void> {
    const { documento, celular } = clienteCreado.cliente;
    await this.crearBilleteraUseCase.execute(documento!, celular!);
  }
}