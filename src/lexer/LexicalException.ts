export class LexicalException extends Error {
  constructor(msg: string) {
    if (msg.length === 1) {
      msg = `Unexpected character ${msg}`
    }
    super(msg)
  }
}
