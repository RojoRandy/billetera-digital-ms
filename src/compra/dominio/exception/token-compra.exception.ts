import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";


export class TokenCompraException extends RpcException {
  public static invalidToken(): TokenCompraException {
    return new this(ErrorResponseDto.create({
      message: `El token es invalido`,
      httpStatus: HttpStatus.BAD_REQUEST
    }))
  }
  public static tokenDoesNotMatches(): TokenCompraException {
    return new this(ErrorResponseDto.create({
      message: `El Código de Confirmación no coincide`,
      httpStatus: HttpStatus.BAD_REQUEST
    }))
  }
}