import { Inject } from "@nestjs/common";
import { CompraCreada } from "../event/compra-creada.event";
import { type CompraRepository, compraRepositoryDefinition } from "../repository/compra.repository";
import { type ClienteRepository, clienteRepositoryDefinition } from "src/cliente/domain/repository/cliente.repository";
import { mailerDefinition } from "src/shared/domain/service/mailer.service";
import { MailerService } from "src/shared/infrastructure/mail/service/mailer.service";
import { compraTokenTemplate } from "src/shared/infrastructure/mail/templates/compra-token.template";


export class EnviarCorreoCliente {
	public constructor(
		@Inject(compraRepositoryDefinition.name)
		private readonly compraRepository: CompraRepository,
		@Inject(clienteRepositoryDefinition.name)
		private readonly clienteRepository: ClienteRepository,
		@Inject(mailerDefinition.name)
		private readonly mailerService: MailerService
	){}

	public async execute(compraCreada: CompraCreada): Promise<void> {
		const compra = await this.compraRepository.findByCompraPendiente(compraCreada.compra.idSesion!);

		const cliente = await this.clienteRepository.findByDocumento(compra.documento);

		await this.mailerService.sendEmail(
			cliente.email.value,
			'Billetera Digital - Compra Realizada',
			compraTokenTemplate(compra.obtenerToken())
		)
	}
}