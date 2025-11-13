import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class BilleteraRegistroException extends RpcException {
  public static alreadyExists(documento: string): BilleteraRegistroException {
    return new this(ErrorResponseDto.create({
      message: `La billetera con documento ${documento} ya está registrada.`,
      httpStatus: HttpStatus.CONFLICT
    }))
  }
  public static unexpected(): BilleteraRegistroException {
    return new this(ErrorResponseDto.create({
      message: 'Ocurrió un error inesperado al registrar la billetera.',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }));
  }
}