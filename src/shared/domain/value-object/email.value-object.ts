import { EmailException } from "../exception/email.exception";
import { StringValueObject } from "./string.value-object";

export class EmailValueObject extends StringValueObject {
  private emailRegex = 
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  public constructor(value: string) {
    super(value);
    this.isValid(value);
  }

  public static fromString(value: string): EmailValueObject {
    return new this(value)
  }

  private isValid(value: string): void {
    if (!new RegExp(this.emailRegex).test(this.value)) throw EmailException.invalid(value)
  }
}