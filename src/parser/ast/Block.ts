import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Block extends Stmt {
  constructor(parent: ASTNode) {
    super(parent, ASTNodeTypes.BLOCK, 'block')
  }
}
