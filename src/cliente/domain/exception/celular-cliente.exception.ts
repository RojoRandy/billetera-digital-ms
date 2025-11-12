import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class CelularClienteException extends RpcException {
  public static invalid(): CelularClienteException {
    return new this(ErrorResponseDto.create({
      message: 'El número de celular no es válido',
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
}