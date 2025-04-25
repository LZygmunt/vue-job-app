import { isRef, unref } from 'vue'
import type { DeepMaybeRefOrGetter } from '../utilityTypes.ts'

export function deepUnref<T>(input: T | DeepMaybeRefOrGetter<T>): T {
  if (isRef(input)) {
    return deepUnref(unref(input)) as T
  }
  if (input instanceof Function) {
    return input as unknown as T
  }

  if (Array.isArray(input)) {
    return input.map((item) => deepUnref(item)) as unknown as T
  }

  if (input !== null && typeof input === 'object') {
    const unwrappedObj: Record<string, unknown> = {}
    for (const key in input) {
      unwrappedObj[key] = deepUnref((input as Record<string, unknown>)[key])
    }
    return unwrappedObj as T
  }

  return unref(input) as T
}
