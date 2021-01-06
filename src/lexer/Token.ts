import { TokenType } from './TokenType'

export class Token {
  constructor(private _type: TokenType, private _value: string) {}

  getType(): TokenType {
    return this._type
  }

  isVariable(): boolean {
    return this._type === TokenType.VARIABLE
  }

  isScalar(): boolean {
    return (
      this._type === TokenType.INTEGER ||
      this._type === TokenType.FLOAT ||
      this._type === TokenType.STRING ||
      this._type === TokenType.BOOLEAN
    )
  }

  toString(): string {
    return `type ${this._type}, value ${this._value}`
  }
}
