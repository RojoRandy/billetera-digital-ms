import { RpcException } from "@nestjs/microservices";
import { DocumentoCliente } from "../value-object/documento-cliente.value-object";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";
import { HttpStatus } from "@nestjs/common";

export class ClienteRegistroException extends RpcException {
  public static alreadyExists(documento: DocumentoCliente): ClienteRegistroException {
    return new this(ErrorResponseDto.create({
      message: `El cliente con documento ${documento.value} ya está registrado.`,
      httpStatus: HttpStatus.CONFLICT
    }));
  }
  public static unexpected(): ClienteRegistroException {
    return new this(ErrorResponseDto.create({
      message: 'Ocurrió un error inesperado al registrar el cliente.',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }));
  }
}