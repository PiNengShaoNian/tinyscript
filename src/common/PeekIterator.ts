import { LinkedList } from '../lib/LinkedList'

export class PeekIterator<T> {
  private it: IterableIterator<T>
  private stackPutBacks = new LinkedList<T>()
  private queueCache = new LinkedList<T>()
  private endToken: T | null

  private static readonly CACHE_SIZE = 10

  constructor(stream: IterableIterator<T>, endToken: T | null = null) {
    this.it = stream
    this.endToken = endToken
  }

  peek(): T | null {
    if (!this.stackPutBacks.isEmpty()) {
      return this.stackPutBacks.first()!
    }

    const val = this.next()
    this.putBack()
    return val
  }

  putBack() {
    if (!this.queueCache.isEmpty()) {
      this.stackPutBacks.addFirst(this.queueCache.removeLast()!)
    }
  }

  hasNext(): boolean {
    return !!this.endToken || !!this.peek()
  }

  next(): T | null {
    let val: T

    if (!this.stackPutBacks.isEmpty()) {
      val = this.stackPutBacks.removeFirst()!
    } else {
      val = this.it.next().value

      if (val === undefined) {
        const temp: T = this.endToken!
        this.endToken = null
        val = temp
      }
    }

    while (this.queueCache.size() > PeekIterator.CACHE_SIZE - 1) {
      this.queueCache.removeFirst()
    }

    this.queueCache.addLast(val)

    return val
  }
}
