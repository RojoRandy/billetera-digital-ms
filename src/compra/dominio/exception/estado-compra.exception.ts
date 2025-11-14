import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class EstadoCompraException extends RpcException {
  public static invalid(): EstadoCompraException {
    return new this(ErrorResponseDto.create({
      message: 'El estado de la compra es invalido',
      httpStatus: HttpStatus.BAD_REQUEST
    }))
  }
}