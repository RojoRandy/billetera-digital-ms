
export class CelularClienteException extends Error {
  public static invalid(): CelularClienteException {
    return new CelularClienteException('El número de celular no es válido');
  }
}