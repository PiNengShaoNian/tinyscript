import { parseStmt } from '../parseStmt'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Block extends Stmt {
  constructor(parent: ASTNode | null) {
    super(parent, ASTNodeTypes.BLOCK, 'block')
  }

  static parse(parent: null | ASTNode, it: PeekTokenIterator): ASTNode | null {
    it.nextMatchValue('{')
    const block = new Block(parent)
    let stmt: ASTNode | null = null
    while ((stmt = parseStmt(parent, it)) !== null) {
      block.addChild(stmt)
    }
    it.nextMatchValue('}')

    return block
  }
}
