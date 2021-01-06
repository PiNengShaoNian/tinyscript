export function* arrayToGenerator<T>(arr: Iterable<T>) {
  for (const v of arr) {
    yield v
  }
}
