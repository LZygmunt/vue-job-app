import { ref } from 'vue'

import { type BasicColorSchema, useColorMode } from '@vueuse/core'
import { defineStore } from 'pinia'

import { MAXIMIZE_TIMEOUT, MINIMIZE_TIMEOUT, RESET_CLICK_TIMESTAMP_TIMEOUT } from '#/constans.ts'

export const usePreferencesStore = defineStore('preferences', () => {
  const themeMode = useColorMode({
    attribute: 'theme',
    storageKey: 'vue-jobs-theme-mode',
    emitAuto: true,
  })

  const minimizeTimeout = ref(MINIMIZE_TIMEOUT)
  const maximizeTimeout = ref(MAXIMIZE_TIMEOUT)
  const resetClickRegisterTimeout = ref(RESET_CLICK_TIMESTAMP_TIMEOUT)

  const toggleThemeMode = (newMode: BasicColorSchema) => {
    themeMode.value = newMode
  }

  const changeMinimizeTimeout = (newValue: number) => {
    minimizeTimeout.value = newValue
  }

  const changeMaximizeTimeout = (newValue: number) => {
    maximizeTimeout.value = newValue
  }

  const changeResetClickRegisterTimeout = (newValue: number) => {
    resetClickRegisterTimeout.value = newValue
  }

  return {
    themeMode,
    minimizeTimeout,
    maximizeTimeout,
    resetClickRegisterTimeout,
    toggleThemeMode,
    changeMinimizeTimeout,
    changeMaximizeTimeout,
    changeResetClickRegisterTimeout,
  }
})

export type PreferencesStore = ReturnType<typeof usePreferencesStore>
