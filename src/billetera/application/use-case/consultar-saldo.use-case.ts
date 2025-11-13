import { Inject } from "@nestjs/common";
import { type BilleteraRepository, billeteraRepositoryDefinition } from "src/billetera/domain/repository/billetera.repository";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { BilleteraPresentation, BilleteraResponse } from "../presentation/billetera.presentation";


export class ConsultarSaldoUseCase {
  constructor(
      @Inject(billeteraRepositoryDefinition.name)
      private readonly billeteraRepository: BilleteraRepository
  ) {}

  public async execute(documento: DocumentoCliente, celular: CelularCliente): Promise<BilleteraResponse> {
    const billetera = await this.billeteraRepository.findByDatosCliente(
      documento, 
      celular
    );

    return BilleteraPresentation.fromBilletera(billetera).format()
  }
}