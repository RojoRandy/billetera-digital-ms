import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class NombresClienteException extends RpcException {
  public static tooShort(): NombresClienteException {
    return new this(ErrorResponseDto.create({
      message: 'El nombre es demasiado corto, debe tener al menos 3 caracteres.',
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }

  public static tooLong(): NombresClienteException {
    return new this(ErrorResponseDto.create({
      message: 'El nombre es demasiado largo, debe tener como máximo 50 caracteres.',
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
}