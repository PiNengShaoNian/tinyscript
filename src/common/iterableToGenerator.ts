export function* iterableToGenerator<T>(arr: Iterable<T>) {
  for (const v of arr) {
    yield v
  }
}
