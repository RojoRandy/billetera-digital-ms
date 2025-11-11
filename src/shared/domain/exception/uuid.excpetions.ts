
export class UUIDException extends Error {
  public static invalid(uuid: string): UUIDException {
    return new this(`The UUID '${uuid}' is not valid.`);
  }
}