import { NumberValueObject } from "src/shared/domain/value-object/number.value-object";
import { CantidadBilleteraException } from "../exception/cantidad-billetera.exception";


export class CantidadBilletera extends NumberValueObject {
  public constructor(private readonly cantidad: number) {
    super(cantidad);
    this.isValid()
  }

  public static fromNumber(cantidad: number): CantidadBilletera {
    return new this(cantidad);
  }

  public sumar(otraCantidad: CantidadBilletera): CantidadBilletera {
    const nuevoValor = this.value + otraCantidad.value;

    return new CantidadBilletera(nuevoValor);
  }

  private isValid(): void {
    if (this.cantidad < 0) throw CantidadBilleteraException.nonNegativeAllowed();
  }
}