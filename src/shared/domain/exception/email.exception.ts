
export class EmailException extends Error {
  public static invalid(email: string): EmailException {
    return new this(`El email '${email}' no es válido.`);
  }
}