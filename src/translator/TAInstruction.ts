import { TAInstructionType } from './TAInstructionType'
import { Symbol } from './symbol/Symbol'

export class TAInstruction {
  constructor(
    private arg1: Symbol | null,
    private arg2: Symbol | null,
    private op: string,
    private result: Symbol,
    private type: TAInstructionType
  ) {}

  getResult() {
    return this.result
  }

  setResult(result: Symbol) {
    this.result = result
  }

  setArg1(arg: Symbol) {
    this.arg1 = arg
  }

  setArg2(arg: Symbol) {
    this.arg2 = arg
  }

  getArg1() {
    return this.arg1
  }

  getArg2() {
    return this.arg2
  }

  getOp() {
    return this.op
  }

  getType() {
    return this.type
  }

  toString(): string {
    switch (this.type) {
      case TAInstructionType.ASSIGN:
        if (this.arg2)
          return `${this.result} = ${this.arg1} ${this.op} ${this.arg2}`
        else {
          return `${this.result} = ${this.arg1}`
        }
      case TAInstructionType.IF:
        return `IF ${this.arg1} ELSE ${this.arg2}`
      case TAInstructionType.GOTO:
        return `GOTO ${this.arg1}`
      case TAInstructionType.LABEL:
        return this.arg1 + ':'
      case TAInstructionType.RETURN:
        return 'RETURN ' + this.arg1
      case TAInstructionType.PARAM:
        return 'PARAM ' + this.arg1 + ' ' + this.arg2
      case TAInstructionType.CALL:
        return `CALL ${this.arg1}`
    }

    throw new Error('Unknown instruction type')
  }
}
