
export class CelularClienteException extends Error {
  public static invalid(): CelularClienteException {
    return new this('El número de celular no es válido');
  }
}