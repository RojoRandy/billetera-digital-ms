import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class BilleteraNotFoundException extends RpcException {
  public static findByDatosCliente(documento: string, celular: string): BilleteraNotFoundException {
    return new this(ErrorResponseDto.create({
      message: `Billetera con documento (${documento}) y celular (${celular}) no encontrada`,
      httpStatus: HttpStatus.NOT_FOUND
    }))
  }
}