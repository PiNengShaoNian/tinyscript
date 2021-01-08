import { Token } from '../../lexer/Token'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Factor } from './Factor'

export class Scalar extends Factor {
  constructor(token: Token) {
    super(token)
    this.type = ASTNodeTypes.SCALAR
  }
}
