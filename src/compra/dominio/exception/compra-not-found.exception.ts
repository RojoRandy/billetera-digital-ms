import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";
import { HttpStatus } from "@nestjs/common";


export class CompraNotFoundException extends RpcException {
  public static findByIdSesion(): CompraNotFoundException {
    return new this(ErrorResponseDto.create({
      message: `No se encontro la compra`,
      httpStatus: HttpStatus.NOT_FOUND
    }));
  }
}