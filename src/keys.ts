import type { InjectionKey } from 'vue'

import type { DeepMaybeRefOrGetter } from './utilityTypes.ts'

export interface PaginationTimeouts {
  minimizeTimeout?: number
  maximizeTimeout?: number
  resetClickRegisterTimeout?: number
}

export const PaginationTimeoutsKey = Symbol('PaginationTimeoutsKey') as InjectionKey<
  DeepMaybeRefOrGetter<PaginationTimeouts>
>
