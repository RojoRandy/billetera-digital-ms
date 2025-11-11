
export class InvalidArgumentException extends Error {
  public static mustBeDefined(): InvalidArgumentException {
    return new this('El valor debe estar definido');
  }
  public static mustBeString(value: string): InvalidArgumentException {
    return new this(`El valor debe ser string, recibido: ${value}`);
  }
  public static mustBeNumber(value: number): InvalidArgumentException {
    return new this(`El valor debe ser number, recibido: ${value}`);
  }
  public static mustBeBoolean(value: boolean): InvalidArgumentException {
    return new this(`El valor debe ser boolean, recibido: ${value}`);
  }
}