import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class CompraRegistroException extends RpcException {
  public static unexpected(): CompraRegistroException {
    return new this(ErrorResponseDto.create({
      message: 'Ocurrió un error inesperado al registrar la compra.',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }));
  }
}