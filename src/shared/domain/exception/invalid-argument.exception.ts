import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class InvalidArgumentException extends RpcException {
  public static mustBeDefined(): InvalidArgumentException {
    return new this(ErrorResponseDto.create({
      message: 'El valor debe estar definido',
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
  public static mustBeString(value: string): InvalidArgumentException {
    return new this(ErrorResponseDto.create({
      message: `El valor debe ser string, recibido: ${value}`,
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
  public static mustBeNumber(value: number): InvalidArgumentException {
    return new this(ErrorResponseDto.create({
      message: `El valor debe ser number, recibido: ${value}`,
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
  public static mustBeBoolean(value: boolean): InvalidArgumentException {
    return new this(ErrorResponseDto.create({
      message: `El valor debe ser boolean, recibido: ${value}`,
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
}