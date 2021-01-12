import { ASTNodeTypes } from './ASTNodeTypes'
import { Expr } from './Expr'

export class CallExpr extends Expr {
  constructor() {
    super()
    this.type = ASTNodeTypes.CALL_EXPR
    this.label = 'call'
  }
}
