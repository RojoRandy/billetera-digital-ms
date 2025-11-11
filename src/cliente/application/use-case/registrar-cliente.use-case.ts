import { Inject } from "@nestjs/common";
import { Cliente } from "src/cliente/domain/entity/cliente.entity";
import { type ClienteRepository, clienteRepositoryDefinition } from "src/cliente/domain/repository/cliente.repository";
import { CelularCliente } from "src/cliente/domain/value-object/celular-cliente.value-object";
import { DocumentoCliente } from "src/cliente/domain/value-object/documento-cliente.value-object";
import { EmailCliente } from "src/cliente/domain/value-object/email-cliente.value-object";
import { NombresCliente } from "src/cliente/domain/value-object/nombres-cliente.value-object";
import { type EventBus, eventBusDefinition } from "src/shared/domain/service/event-bus.service";

export class RegistrarClienteUseCase {
  constructor(
    @Inject(clienteRepositoryDefinition.name)
    private readonly clienteRepository: ClienteRepository,
    @Inject(eventBusDefinition.name)
    private readonly eventBus: EventBus,
  ) {}

  public async execute(
    documento: DocumentoCliente,
    nombres: NombresCliente,
    email: EmailCliente,
    celular: CelularCliente
  ): Promise<void> {
    const cliente = Cliente.create({
      documento,
      nombres,
      email,
      celular
    });

    await this.clienteRepository.create(cliente);
    this.eventBus.publish(cliente.pullEvents());
  }
}