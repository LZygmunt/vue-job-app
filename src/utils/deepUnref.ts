import { unref } from 'vue'
import type { DeepMaybeRefOrGetter } from '../utilityTypes.ts'

/**
 * Recursively unwraps reactive references (refs, computed properties, getters)
 * Note: The return type T matches the input type, but in practice
 * all reactive references are unwrapped to their raw values.
 *
 * @param input - The input value that may contain reactive references
 * @returns The unwrapped value with the same type structure as the input
 */
export function deepUnref<T>(input: T | DeepMaybeRefOrGetter<T>): T {
  const value = unref(input)

  if (value === null || value === undefined || typeof value !== 'object') {
    return value as T
  }

  if (typeof value === 'function') {
    return value as unknown as T
  }

  if (Array.isArray(value)) {
    return value.map(deepUnref) as unknown as T
  }

  if (
    value instanceof Date
    || value instanceof RegExp
    || value instanceof Map
    || value instanceof Set
    || value instanceof WeakMap
    || value instanceof WeakSet
    || value instanceof Promise
  ) {
    return value as T
  }

  const unwrappedObj = {} as { [K in keyof T]: T[K] }

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      unwrappedObj[key as keyof T] = deepUnref((value as any)[key])
    }
  }

  return unwrappedObj as T
}
