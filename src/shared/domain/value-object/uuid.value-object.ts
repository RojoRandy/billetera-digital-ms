import { randomUUID } from "crypto";
import { UUIDException } from "../exception/uuid.excpetions";
import { ValueObject } from "./value-object";

export class Uuid extends ValueObject<string> {
  private uuidRegex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  public constructor(value: string) {
    super(value);
    this.isValid(value);
  }

  public static create(): Uuid {
    return new this(randomUUID().toString())
  }

  public static fromString(value: string): Uuid {
    return new this(value);
  }

  private isValid(value: string): void {
    if (!new RegExp(this.uuidRegex).test(value)) {
      throw UUIDException.invalid(value)
    }
  }
}