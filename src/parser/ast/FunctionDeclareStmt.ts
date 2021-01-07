import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class FunctionDeclareStmt extends Stmt {
  constructor(parent: ASTNode) {
    super(parent, ASTNodeTypes.FUNCTION_DECLEAR_STMT, 'func')
  }
}
