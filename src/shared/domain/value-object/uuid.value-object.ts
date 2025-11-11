import { v4 as uuidv4, validate } from 'uuid';
import { UUIDException } from "../exception/uuid.excpetions";
import { ValueObject } from "./value-object";

export class Uuid extends ValueObject<string> {
  public constructor(value: string) {
    super(value);
    this.isValid(value);
  }

  public static create(): Uuid {
    return new this(uuidv4())
  }

  public static fromString(value: string): Uuid {
    return new this(value);
  }

  private isValid(value: string): void {
    if (!validate(value)) {
      throw UUIDException.invalid(value)
    }
  }
}