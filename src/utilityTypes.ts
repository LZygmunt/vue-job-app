import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'

export type ExtractValues<TObj> = TObj[keyof TObj]

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type DeepMaybeRefOrGetter<T> = T extends Function | Ref<unknown> | ComputedRef<unknown>
  ? T
  : [T] extends [object]
    ? { [K in keyof T]: DeepMaybeRefOrGetter<T[K]> }
    : MaybeRefOrGetter<T>
