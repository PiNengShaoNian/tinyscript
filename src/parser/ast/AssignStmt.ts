import { parseFactor } from '../parseFactor'
import { ParseExcpetion } from '../util/ParseException'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Expr } from './Expr'
import { Stmt } from './Stmt'

export class AssignStmt extends Stmt {
  constructor(parent: ASTNode | null) {
    super(parent, ASTNodeTypes.DECLARE_STMT, 'assign')
  }

  static parse(parent: null | ASTNode, it: PeekTokenIterator): ASTNode | null {
    const stmt = new AssignStmt(parent)
    const token = it.peek()!
    const factor = parseFactor(it)

    if (!factor) {
      throw new ParseExcpetion(token)
    }

    stmt.addChild(factor)
    const lexeme = it.nextMatchValue('=')
    const expr = Expr.parse(parent, it)!
    stmt.addChild(expr)
    stmt.setLexeme(lexeme)

    return stmt
  }
}
