import { Inject } from "@nestjs/common";
import { type ClienteRepository, clienteRepositoryDefinition } from "src/cliente/domain/repository/cliente.repository";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { ClientePresentation, ClienteResponse } from "../presentation/cliente.presentation";

export class ConsultarClienteUseCase {
  constructor(
    @Inject(clienteRepositoryDefinition.name)
    private readonly clienteRepository: ClienteRepository
  ) {}

  public async execute(documento: DocumentoCliente): Promise<ClienteResponse> {
    const cliente = await this.clienteRepository.findByDocumento(documento);

    return ClientePresentation.fromCliente(cliente).format()
  }
}