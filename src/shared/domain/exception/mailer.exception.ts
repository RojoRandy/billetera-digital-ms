import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorResponseDto } from "src/shared/infrastructure/dto/error-response.dto";


export class MailerServiceException extends RpcException {
  public static sendingEmailError(): MailerServiceException {
    return new this(ErrorResponseDto.create({
      message: 'Fallo el servicio de envió de correo',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR
    }))
  }
}