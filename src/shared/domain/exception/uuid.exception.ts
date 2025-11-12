import { RpcException } from "@nestjs/microservices";

export class UUIDException extends RpcException {
  public static invalid(uuid: string): UUIDException {
    return new this(`El UUID '${uuid}' no es válido.`);
  }
}