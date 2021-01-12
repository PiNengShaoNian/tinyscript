import { parseFactor } from '../parseFactor'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'

export class FunctionArgs extends ASTNode {
  constructor() {
    super()
    this.label = 'args'
  }

  static parse(it: PeekTokenIterator) {
    const args = new FunctionArgs()

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
