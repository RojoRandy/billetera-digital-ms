import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class BilleteraActualizacionException extends RpcException {
  public static notFound(documento: string): BilleteraActualizacionException {
    return new this(ErrorResponseDto.create({
      message: `No se encontro la billetera con documento ${documento}`,
      httpStatus: HttpStatus.NOT_FOUND
    }))
  }
  public static unexpected(): BilleteraActualizacionException {
    return new this(ErrorResponseDto.create({
      message: 'Ocurrió un error inesperado al actualizar la billetera.',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }));
  }
}