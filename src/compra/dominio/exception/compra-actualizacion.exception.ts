import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class CompraActualizacionException extends RpcException {
  public static unexpected(): CompraActualizacionException {
    return new this(ErrorResponseDto.create({
      message: 'Ocurrió un error inesperado al actualizar el estado de la compra.',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }));
  }
}