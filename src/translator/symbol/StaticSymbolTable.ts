import { Symbol } from './Symbol'

export class StaticSymbolTable {
  private symbols: Symbol[] = []
  private offsetMap: Map<string, Symbol> = new Map()
  private offsetCounter = 0

  add(symbol: Symbol): void {
    const lexval = symbol.getLexeme()!.getValue()
    if (!this.offsetMap.has(lexval)) {
      this.offsetMap.set(lexval, symbol)
      symbol.setOffset(this.offsetCounter++)
      this.symbols.push(symbol)
    } else {
      const sameSymbol = this.offsetMap.get(lexval)!
      symbol.setOffset(sameSymbol.getOffset())
    }
  }

  size() {
    return this.symbols.length
  }

  toString(): string {
    let result = ''
    for (let i = 0; i < this.symbols.length; ++i) {
      result += i + ': ' + this.symbols[i].toString() + '\n'
    }
    return result
  }

  getSymbols(): Symbol[] {
    return this.symbols
  }
}
