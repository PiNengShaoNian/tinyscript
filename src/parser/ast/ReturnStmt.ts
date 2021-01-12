import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Expr } from './Expr'
import { Stmt } from './Stmt'

export class ReturnStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.RETURN_STMT, 'return')
  }

  static parse(it: PeekTokenIterator): ASTNode {
    const lexeme = it.nextMatchValue('return')
    const expr = Expr.parse(it)!
    const stmt = new ReturnStmt()
    stmt.setLexeme(lexeme)
    stmt.addChild(expr)

    return stmt
  }
}
