import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class DeclareStmt extends Stmt {
  constructor(parent: ASTNode) {
    super(parent, ASTNodeTypes.DECLARE_STMT, 'declare')
  }
}
