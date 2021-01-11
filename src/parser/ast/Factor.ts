import { Token } from '../../lexer/Token'
import { Stmt } from './Stmt'

export class Factor extends Stmt {
  constructor(token: Token) {
    super()

    this.lexeme = token
    this.label = token.getValue()
  }
}
