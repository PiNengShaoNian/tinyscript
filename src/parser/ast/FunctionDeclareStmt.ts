import { parseFactor } from '../parseFactor'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Block } from './Block'
import { FunctionArgs } from './FunctionArgs'
import { Stmt } from './Stmt'
import { Variable } from './Variable'

export class FunctionDeclareStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.FUNCTION_DECLEAR_STMT, 'func')
  }

  static parse(it: PeekTokenIterator): ASTNode | null {
    it.nextMatchValue('func')
    const func = new FunctionDeclareStmt()
    const lexeme = it.peek()!
    func.setLexeme(lexeme)
    const functionVariable = parseFactor(it)!
    func.addChild(functionVariable)
    it.nextMatchValue('(')
    const args = FunctionArgs.parse(it)
    it.nextMatchValue(')')
    func.addChild(args)

    const block = Block.parse(it)!
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
