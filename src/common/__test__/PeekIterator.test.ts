import { arrayToGenerator } from '../arrayToGenerator'
import { PeekIterator } from '../PeekIterator'

describe('PeekIterator', () => {
  test('test_peek', () => {
    const it = new PeekIterator(arrayToGenerator('abcdefg'))
    expect(it.next()).toBe('a')
    expect(it.next()).toBe('b')
    expect(it.next()).toBe('c')
  })
})
