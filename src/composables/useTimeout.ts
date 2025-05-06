import { type MaybeRefOrGetter, ref, toValue } from 'vue'

import type { Optional } from '@tanstack/vue-query'

interface TimeoutOptions {
  delay: MaybeRefOrGetter<number>
  condition: (timeoutId?: number | null) => boolean
  effect?: () => void
}

export const useTimeout = (defaultOptions: TimeoutOptions) => {
  const timeoutId = ref<number | null>(null)

  const resetTimeout = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = null
  }

  const updateTimeout = (options?: Partial<TimeoutOptions>) => {
    const { condition, effect, delay } = defaultOptions
    return setTimeout(() => {
      if (condition(timeoutId.value)) {
        timeoutId.value = updateTimeout({
          condition: options?.condition ?? defaultOptions.condition,
          effect: options?.effect ?? defaultOptions.effect,
          delay: options?.delay ?? defaultOptions.delay,
        })

        return
      }

      effect?.()
      resetTimeout()
    }, toValue(delay))
  }

  const startTimeout = (options: Optional<TimeoutOptions, 'delay'>) => {
    resetTimeout()
    const { condition, effect, delay } = options
    setTimeout(
      () => {
        if (condition(timeoutId.value)) {
          return
        }
        effect?.()
        timeoutId.value = updateTimeout()
      },
      toValue(delay) ?? 0,
    )
  }

  return {
    timeoutId,
    updateTimeout,
    startTimeout,
    resetTimeout,
  }
}
