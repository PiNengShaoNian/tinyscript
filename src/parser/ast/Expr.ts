import { ASTNode } from './ASTNode'
import { Stmt } from './Stmt'

export class Expr extends Stmt {
  constructor(parent: ASTNode | null) {
    super(parent)
  }
}
