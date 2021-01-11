import { parseFactor } from '../parseFactor'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Block } from './Block'
import { FunctionArgs } from './FunctionArgs'
import { Stmt } from './Stmt'
import { Variable } from './Variable'

export class FunctionDeclareStmt extends Stmt {
  constructor(parent: ASTNode | null) {
    super(parent, ASTNodeTypes.FUNCTION_DECLEAR_STMT, 'func')
  }

  static parse(parent: ASTNode | null, it: PeekTokenIterator): ASTNode | null {
    it.nextMatchValue('func')
    const func = new FunctionDeclareStmt(parent)
    const lexeme = it.peek()!
    func.setLexeme(lexeme)
    const functionVariable = parseFactor(it)!
    func.addChild(functionVariable)
    it.nextMatchValue('(')
    const args = FunctionArgs.parse(parent, it)
    it.nextMatchValue(')')
    func.addChild(args)

    const block = Block.parse(parent, it)!
    func.addChild(block)

    return func
  }

  getArgs(): ASTNode {
    return this.getChild(1)
  }

  getFunctionVariable(): Variable {
    return this.getChild(0)
  }

  getBlock(): ASTNode {
    return this.getChild(2)
  }
}
