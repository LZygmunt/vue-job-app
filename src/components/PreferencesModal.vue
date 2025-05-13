<script setup lang="ts">
import { usePreferencesStore } from '#/store/preferences.ts'

import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import FormControl from './FormControl.vue'

const preferencesStore = usePreferencesStore()
const themeModeOptions = [
  { value: 'light', label: 'Jasny', icon: 'pi pi-sun' },
  { value: 'dark', label: 'Ciemny', icon: 'pi pi-moon' },
  { value: 'auto', label: 'Systemowy', icon: 'pi pi-desktop' },
] as const
</script>

<template>
  <BaseModal :contentProps="{ class: 'bg-gray-100 dark:bg-gray-500/20 p-6 w-full min-w-2xl' }">
    <template #button="buttonProps">
      <BaseButton
        class="icon-button icon-button--lg"
        @click="buttonProps.onClick"
      >
        <i class="pi pi-cog" />
      </BaseButton>
    </template>
    <template #header="headerProps">
      <span>Settings</span>
      <BaseButton
        class="icon-button icon-button--close"
        @click="headerProps.onClickCancel"
      >
        <i class="pi pi-times" />
      </BaseButton>
    </template>
    <template #default>
      <div class="flex flex-col gap-2 w-full">
        <FormControl
          v-model="preferencesStore.themeMode"
          label="Theme mode"
          name="themeMode"
          type="toggle"
          variant="inline"
          :options="themeModeOptions"
          @update:modelValue="preferencesStore.toggleThemeMode"
        />
        <FormControl
          v-model="preferencesStore.minimizeTimeout"
          label="Minimize pagination timeout"
          name="minimizeTimeout"
          type="number"
          variant="inline"
          @update:modelValue="preferencesStore.changeMinimizeTimeout"
        />
        <FormControl
          v-model="preferencesStore.maximizeTimeout"
          label="Maximize pagination timeout"
          name="maximizeTimeout"
          type="number"
          variant="inline"
          @update:modelValue="preferencesStore.changeMaximizeTimeout"
        />
        <FormControl
          v-model="preferencesStore.resetClickRegisterTimeout"
          label="Reset registration click on pagination timeout"
          name="resetClickRegisterTimeout"
          type="number"
          variant="inline"
          @update:modelValue="preferencesStore.changeResetClickRegisterTimeout"
        />
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
@reference '#/assets/main.css';

.icon-button {
  @apply p-[0.5em]
  leading-none
  rounded-full
  bg-transparent
  dark:text-green-500
  aspect-square
  transition-transform
  duration-200
  ease-in-out
  w-[1em]
  box-content
  text-inherit;

  &.icon-button--lg {
    @apply text-2xl;
  }

  &:not([disabled]) {
    @apply hover:rotate-90 hover:bg-green-800 hover:dark:text-green-400 hover:dark:bg-neutral-800;
  }
}
</style>
