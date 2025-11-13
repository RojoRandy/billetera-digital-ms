import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class CantidadBilleteraException extends RpcException {
  public static nonNegativeAllowed(): CantidadBilleteraException {
    return new this(ErrorResponseDto.create({
      message: 'La cantidad no puede ser un valor negativo',
      httpStatus: HttpStatus.BAD_REQUEST
    }))
  }
}