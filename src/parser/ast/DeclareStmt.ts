import { parseFactor } from '../parseFactor'
import { ParseExcpetion } from '../util/ParseException'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Expr } from './Expr'
import { Stmt } from './Stmt'

export class DeclareStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.DECLARE_STMT, 'declare')
  }

  static parse(it: PeekTokenIterator): ASTNode | null {
    const stmt = new DeclareStmt()
    it.nextMatchValue('var')
    const token = it.peek()!
    const factor = parseFactor(it)

    if (!factor) {
      throw new ParseExcpetion(token)
    }

    stmt.addChild(factor)
    const lexeme = it.nextMatchValue('=')
    const expr = Expr.parse(it)!
    stmt.addChild(expr)
    stmt.setLexeme(lexeme)

    return stmt
  }
}
