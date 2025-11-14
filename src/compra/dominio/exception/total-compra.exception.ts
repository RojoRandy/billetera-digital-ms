import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class TotalCompraException extends RpcException {
  public static nonNegativeAllowed(): TotalCompraException {
    return new this(ErrorResponseDto.create({
      message: 'El total no puede ser un valor negativo',
      httpStatus: HttpStatus.BAD_REQUEST
    }))
  }
}