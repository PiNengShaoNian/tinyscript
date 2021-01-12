import { ASTNode } from './ast/ASTNode'
import { ASTNodeTypes } from './ast/ASTNodeTypes'
import { Expr } from './ast/Expr'
import { PeekTokenIterator } from './util/PeekTokenIterator'

export const parseCallExpr = (
  factor: ASTNode,
  it: PeekTokenIterator
): ASTNode => {
  const expr = new Expr(ASTNodeTypes.CALL_EXPR, null)
  expr.setLabel('call')
  expr.addChild(factor)
  it.nextMatchValue('(')
  let p
  while ((p = Expr.parse(it)) != null) {
    expr.addChild(p)

    if (it.peek()?.getValue() !== ')') {
      it.nextMatchValue(',')
    }
  }

  it.nextMatchValue(')')

  return expr
}
