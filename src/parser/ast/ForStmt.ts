import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class ForStmt extends Stmt {
  constructor(parent: ASTNode) {
    super(parent, ASTNodeTypes.FOR_STMT, 'for')
  }
}
