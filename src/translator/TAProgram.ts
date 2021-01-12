import { StaticSymbolTable } from './symbol/StaticSymbolTable'
import { SymbolTable } from './symbol/SymbolTable'
import { TAInstruction } from './TAInstruction'

export class TAProgram {
  private instructions: TAInstruction[] = []
//   private labelCounter = 0
  private staticSymbolTable = new StaticSymbolTable()

  add(code: TAInstruction): void {
    this.instructions.push(code)
  }

  getInstructions(): TAInstruction[] {
    return this.instructions
  }

  toString() {
    return this.instructions.join('\n')
  }

  setStaticSymbols(symbolTable: SymbolTable) {
    for (const symbol of symbolTable.getSymbols()) {
      this.staticSymbolTable.add(symbol)
    }

    for (const child of symbolTable.getChildren()) {
      this.setStaticSymbols(child)
    }
  }
}
