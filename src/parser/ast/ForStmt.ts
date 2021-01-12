import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class ForStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.FOR_STMT, 'for')
  }
}
