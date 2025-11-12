import { RpcException } from "@nestjs/microservices";
import { ClienteId } from "../value-object/cliente-id.value-object";
import { DocumentoCliente } from "../value-object/documento-cliente.value-object";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";
import { HttpStatus } from "@nestjs/common";


export class ClienteNotFoundException extends RpcException {
  public static findById(id: ClienteId): ClienteNotFoundException {
    return new this(ErrorResponseDto.create({
      message: `Cliente con id ${id.value} no encontrado.`,
      httpStatus: HttpStatus.NOT_FOUND
    }));
  }
  public static findByDocumento(documento: DocumentoCliente): ClienteNotFoundException {
    return new this(ErrorResponseDto.create({
      message: `Cliente con documento ${documento} no encontrado.`,
      httpStatus: HttpStatus.NOT_FOUND
    }));
  }
}