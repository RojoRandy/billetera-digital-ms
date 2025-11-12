import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";

export class EmailException extends RpcException {
  public static invalid(email: string): EmailException {
    return new this(ErrorResponseDto.create({
      message: `El email '${email}' no es válido.`,
      httpStatus: HttpStatus.BAD_REQUEST
    }));
  }
}