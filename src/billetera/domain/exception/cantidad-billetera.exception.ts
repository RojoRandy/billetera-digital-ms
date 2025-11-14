import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class CantidadBilleteraException extends RpcException {
  public static nonNegativeAllowed(): CantidadBilleteraException {
    return new this(ErrorResponseDto.create({
      message: 'El saldo de la billetera no puede ser negativo',
      httpStatus: HttpStatus.BAD_REQUEST
    }))
  }
}