import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'

export type ExtractValues<TObj> = TObj[keyof TObj]

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type DeepMaybeRefOrGetter<T> = T extends Function | Ref<unknown> | ComputedRef<unknown>
  ? T
  : [T] extends [object]
    ? MaybeRefOrGetter<{ [K in keyof T]: DeepMaybeRefOrGetter<T[K]> }>
    : MaybeRefOrGetter<T>

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type NestMaybeRefOrGetter<T> = T extends Function | Ref<unknown> | ComputedRef<unknown>
  ? T
  : [T] extends [object]
    ? { [K in keyof T]: DeepMaybeRefOrGetter<T[K]> }
    : MaybeRefOrGetter<T>

type UnwrapMaybeRefOrGetter<T> =
  T extends Ref<infer U> ? U : T extends ComputedRef<infer U> ? U : T extends () => infer U ? U : T

export type UnwrapDeepMaybeRefOrGetter<T> =
  UnwrapMaybeRefOrGetter<T> extends object
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      T extends Function | Ref<unknown> | ComputedRef<unknown>
      ? UnwrapMaybeRefOrGetter<T>
      : {
          [K in keyof UnwrapMaybeRefOrGetter<T>]: UnwrapDeepMaybeRefOrGetter<
            UnwrapMaybeRefOrGetter<T>[K]
          >
        }
    : UnwrapMaybeRefOrGetter<T>
