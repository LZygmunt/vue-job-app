<script setup lang="ts">
import { usePreferencesStore } from '#/store/preferences.ts'

import BaseModal from './BaseModal.vue'
import FormControl from './FormControl.vue'
import IconButton from './IconButton.vue'

const preferencesStore = usePreferencesStore()
const themeModeOptions = [
  { value: 'light', label: 'Jasny', icon: 'pi pi-sun' },
  { value: 'dark', label: 'Ciemny', icon: 'pi pi-moon' },
  { value: 'auto', label: 'Systemowy', icon: 'pi pi-desktop' },
] as const
</script>

<template>
  <BaseModal :contentProps="{ class: 'p-6 w-full min-w-2xl' }">
    <template #button="buttonProps">
      <IconButton
        class="text-2xl leading-none text-inherit"
        srText="Preferences"
        @click="buttonProps.onClick"
      >
        <i class="pi pi-cog" />
      </IconButton>
    </template>
    <template #header="headerProps">
      <span>Settings</span>
      <IconButton
        srText="Close"
        @click="headerProps.onClickCancel"
      >
        <i class="pi pi-times" />
      </IconButton>
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
