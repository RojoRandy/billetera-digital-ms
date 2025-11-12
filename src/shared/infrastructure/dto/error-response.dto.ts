import { HttpStatus } from "@nestjs/common";

export class ErrorResponseDto {
  private constructor(
    public httpStatus: HttpStatus,
    public message: string,
    public timestamp: Date,
    public succcess: boolean = false
  ){}

  public static create({
    httpStatus,
    message
  }: {
    httpStatus: HttpStatus,
    message: string
  }): ErrorResponseDto {
    return new this(
      httpStatus,
      message,
      new Date()
    )
  }
}