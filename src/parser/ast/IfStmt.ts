import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class IfStmt extends Stmt {
  constructor(parent: ASTNode) {
    super(parent, ASTNodeTypes.IF_STMT, 'if')
  }
}
