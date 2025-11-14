import { TokenCompra } from "./token-compra.value-object";

export class TokenOpcional {
  private constructor(private readonly token: TokenCompra | null) {}

  public static crear(): TokenOpcional {
    return new TokenOpcional(TokenCompra.create())
  }

  public static crearVacio(): TokenOpcional {
    return new TokenOpcional(null);
  }

  public existe(): boolean {
    return this.token !== null
  }
}