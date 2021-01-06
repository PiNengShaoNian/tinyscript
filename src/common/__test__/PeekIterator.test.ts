import { iterableToGenerator } from '../iterableToGenerator'
import { PeekIterator } from '../PeekIterator'

describe('PeekIterator', () => {
  test('test_peek', () => {
    const it = new PeekIterator(iterableToGenerator('abcdefg'))
    expect(it.next()).toBe('a')
    expect(it.next()).toBe('b')
    expect(it.next()).toBe('c')
    expect(it.peek()).toBe('d')
    expect(it.peek()).toBe('d')

    expect(it.next()).toBe('d')
    expect(it.next()).toBe('e')
  })

  test('test_lookahead2', () => {
    const it = new PeekIterator(iterableToGenerator('abcdefg'))
    expect(it.next()).toBe('a')
    expect(it.peek()).toBe('b')
    expect(it.peek()).toBe('b')
    expect(it.peek()).toBe('b')
    expect(it.next()).toBe('b')
    expect(it.next()).toBe('c')

    it.putBack()
    it.putBack()

    expect(it.next()).toBe('b')
    expect(it.next()).toBe('c')
  })

  test('test_endToken', () => {
    const str = 'abcdefg'
    const it = new PeekIterator(iterableToGenerator(str), '\0')

    for (let i = 0; i < 8; ++i) {
      if (i == 7) {
        expect(it.next()).toBe('\0')
      } else {
        expect(it.next()).toBe(str[i])
      }
    }
  })
})
