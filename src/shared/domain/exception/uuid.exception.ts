
export class UUIDException extends Error {
  public static invalid(uuid: string): UUIDException {
    return new this(`El UUID '${uuid}' no es válido.`);
  }
}