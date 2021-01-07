import { AlphabetHelper } from '../common/AlphabetHelper'
import { PeekIterator } from '../common/PeekIterator'
import { Keywords } from './Keywords'
import { LexicalException } from './LexicalException'
import { TokenType } from './TokenType'

export class Token {
  constructor(private _type: TokenType, private _value: string) {}

  getType(): TokenType {
    return this._type
  }

  getValue(): string {
    return this._value
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

  isNumber(): boolean {
    return this._type === TokenType.FLOAT || this._type === TokenType.INTEGER
  }

  isOperator(): boolean {
    return this._type === TokenType.OPERATOR
  }

  isValue(): boolean {
    return this.isScalar() || this.isVariable()
  }

  static makeVarOrKeyword(it: PeekIterator<string>): Token {
    let s = ''

    while (it.hasNext()) {
      const lookahead = it.peek()!
      if (AlphabetHelper.isLiteral(lookahead)) {
        s += lookahead
      } else break
      it.next()
    }

    if (Keywords.isKeyword(s)) {
      return new Token(TokenType.KEYWORD, s)
    }

    if (s === 'true' || s === 'false') {
      return new Token(TokenType.BOOLEAN, s)
    }

    return new Token(TokenType.VARIABLE, s)
  }

  static makeString(it: PeekIterator<string>): Token {
    let s = ''
    let state = 0

    while (it.hasNext()) {
      const char = it.next()!
      switch (state) {
        case 0:
          if (char === '"') {
            state = 1
          } else {
            state = 2
          }
          s += char
          break
        case 1:
          if (char === '"') {
            return new Token(TokenType.STRING, s + char)
          } else {
            s += char
          }
          break
        case 2:
          if (char === "'") {
            return new Token(TokenType.STRING, s + char)
          } else {
            s += char
          }
          break
      }
    }

    throw new LexicalException('Unexpected error')
  }

  static makeOp(it: PeekIterator<string>): Token {
    let state = 0

    while (it.hasNext()) {
      const lookahead = it.next()

      switch (state) {
        case 0:
          switch (lookahead) {
            case '+':
              state = 1
              break
            case '-':
              state = 2
              break
            case '*':
              state = 3
              break
            case '/':
              state = 4
              break
            case '>':
              state = 5
              break
            case '<':
              state = 6
              break
            case '=':
              state = 7
              break
            case '!':
              state = 8
              break
            case '&':
              state = 9
              break
            case '|':
              state = 10
              break
            case '^':
              state = 11
              break
            case '%':
              state = 12
              break
            case ',':
              return new Token(TokenType.OPERATOR, ',')
            case ';':
              return new Token(TokenType.OPERATOR, ';')
          }
          break
        case 1:
          if (lookahead === '+') {
            return new Token(TokenType.OPERATOR, '++')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '+=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '+')
          }
        case 2:
          if (lookahead === '-') {
            return new Token(TokenType.OPERATOR, '--')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '-=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '-')
          }
        case 3:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '*=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '*')
          }
        case 4:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '/=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '/')
          }
        case 5:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '>=')
          } else if (lookahead === '>') {
            return new Token(TokenType.OPERATOR, '>>')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '>')
          }
        case 6:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '<=')
          } else if (lookahead === '<') {
            return new Token(TokenType.OPERATOR, '<<')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '<')
          }
        case 7:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '==')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '=')
          }
        case 8:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '!=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '!')
          }
        case 9:
          if (lookahead === '&') {
            return new Token(TokenType.OPERATOR, '&&')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '&=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '&')
          }
        case 10:
          if (lookahead === '|') {
            return new Token(TokenType.OPERATOR, '||')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '|=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '|')
          }
        case 11:
          if (lookahead === '^') {
            return new Token(TokenType.OPERATOR, '^^')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '^=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '^')
          }
        case 12:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '%=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '%')
          }
      }
    }

    throw new LexicalException('Unexpected error')
  }

  static makeNumber(it: PeekIterator<string>): Token {
    let s = ''
    let state = 0

    while (it.hasNext()) {
      const lookahead = it.peek()!

      switch (state) {
        case 0:
          if (lookahead === '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '+' || lookahead === '-') {
            state = 3
          } else if (lookahead === '.') {
            state = 5
          }
          break
        case 1:
          if (lookahead === '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 4
          } else {
            return new Token(TokenType.INTEGER, s)
          }
          break
        case 2:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 4
          } else {
            return new Token(TokenType.INTEGER, s)
          }
          break
        case 3:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 4
          } else {
            throw new LexicalException(lookahead)
          }
          break
        case 4:
          if (lookahead === '.') {
            throw new LexicalException(lookahead)
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else {
            return new Token(TokenType.FLOAT, s)
          }
          break
        case 5:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else {
            throw new LexicalException(lookahead)
          }
          break
        case 20:
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 20
          } else if (lookahead === '.') {
            throw new LexicalException(lookahead)
          } else {
            return new Token(TokenType.FLOAT, s)
          }
          break
      }

      it.next()
      s += lookahead
    }

    throw new LexicalException('Unexpected error')
  }

  toString(): string {
    return `type ${this._type}, value ${this._value}`
  }
}
