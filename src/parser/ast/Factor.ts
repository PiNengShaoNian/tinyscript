import { TokenType } from '../../lexer/TokenType'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export abstract class Factor extends Stmt {
  constructor(parent: ASTNode, it: PeekTokenIterator) {
    super(parent, null, null)

    const token = it.next()!
    const type = token.getType()
    if (type === TokenType.VARIABLE) {
      this.type = ASTNodeTypes.VARIABLE
    } else {
      this.type = ASTNodeTypes.SCALAR
    }
    this.label = token.getValue()
    this.lexeme = token
  }
}
