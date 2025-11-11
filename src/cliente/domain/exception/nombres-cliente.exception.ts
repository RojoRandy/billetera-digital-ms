
export class NombresClienteException extends Error {
  public static tooShort(): NombresClienteException {
    return new this('El nombre es demasiado corto, debe tener al menos 3 caracteres.');
  }

  public static tooLong(): NombresClienteException {
    return new this('El nombre es demasiado largo, debe tener como máximo 50 caracteres.');
  }
}