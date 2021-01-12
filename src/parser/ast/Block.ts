import { parseStmt } from '../parseStmt'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Block extends Stmt {
  constructor() {
    super(ASTNodeTypes.BLOCK, 'block')
  }

  static parse(it: PeekTokenIterator): ASTNode | null {
    it.nextMatchValue('{')
    const block = new Block()
    let stmt: ASTNode | null = null
    while ((stmt = parseStmt(it)) !== null) {
      block.addChild(stmt)
    }
    it.nextMatchValue('}')

    return block
  }
}
