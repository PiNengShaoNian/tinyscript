import { Token } from '../../lexer/Token'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Factor } from './Factor'

export class Variable extends Factor {
  constructor(token: Token) {
    super(token)
    this.type = ASTNodeTypes.VARIABLE
  }
}
