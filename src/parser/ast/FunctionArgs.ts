import { parseFactor } from '../parseFactor'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'

export class FunctionArgs extends ASTNode {
  constructor(parent: ASTNode | null) {
    super(parent)
    this.label = 'args'
  }

  static parse(parent: ASTNode | null, it: PeekTokenIterator) {
    const args = new FunctionArgs(parent)

    while (it.peek()!.isVariable()) {
      const variable = parseFactor(it)!
      args.addChild(variable)

      if (it.peek()?.getValue() !== ')') {
        it.nextMatchValue(',')
      }
    }

    return args
  }
}
