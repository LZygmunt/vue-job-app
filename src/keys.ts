import type { InjectionKey } from 'vue'

import type { NestMaybeRefOrGetter } from './utilityTypes.ts'

export interface PaginationTimeouts {
  minimizeTimeout?: number
  maximizeTimeout?: number
  resetClickRegisterTimeout?: number
}

export const PaginationTimeoutsKey = Symbol('PaginationTimeoutsKey') as InjectionKey<
  NestMaybeRefOrGetter<PaginationTimeouts>
>
