import { ASTNode } from './ast/ASTNode'
import { ASTNodeTypes } from './ast/ASTNodeTypes'
import { Expr } from './ast/Expr'
import { Scalar } from './ast/Scalar'
import { PeekTokenIterator } from './util/PeekTokenIterator'

export class SimpleParser {
  static parse(it: PeekTokenIterator): ASTNode {
    const expr = new Expr(null)
    const scalar = new Scalar(expr, it)

    if (!it.hasNext()) {
      return scalar
    }

    expr.setLexeme(it.peek()!)
    it.nextMatchValue('+')
    expr.setLabel('+')
    expr.addChild(scalar)
    expr.setType(ASTNodeTypes.BINARY_EXPR)
    const rightNode = this.parse(it)
    expr.addChild(rightNode)
    return expr
  }
}
