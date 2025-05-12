<script setup lang="ts">
import { type HTMLAttributes, toRefs, useSlots, useTemplateRef, watchEffect } from 'vue'

type BaseModalSectionProps = HTMLAttributes

interface BaseModalProps {
  teleportTarget?: string
  disableFooter?: boolean
  disableHeader?: boolean
  contentProps?: BaseModalSectionProps
  footerProps?: BaseModalSectionProps
  headerProps?: BaseModalSectionProps
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  teleportTarget: 'body',
})
const { disableFooter, disableHeader, teleportTarget, contentProps, headerProps, footerProps } =
  toRefs(props)
const slots = useSlots()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')

const onTriggerOpenDialog = () => {
  dialogRef.value?.showModal()
}

const onTriggerCloseDialog = () => {
  dialogRef.value?.close()
}
</script>

<template>
  <slot
    name="button"
    @click="onTriggerOpenDialog"
  />
  <Teleport :to="teleportTarget">
    <dialog
      ref="dialog"
      class="modal m-auto rounded-lg divide-y-2 divide-green-500 shadow-lg shadow-green-500/50 text-neutral-50 bg-green-700 border-1 border-green-500 dark:bg-neutral-900"
    >
      <div
        v-if="!disableHeader"
        class="modal__header p-3 grid grid-cols-[1fr_auto_1fr] gap-1 items-center justify-center text-green-500"
        v-bind="headerProps"
      >
        <slot
          name="header"
          @clickCancel="onTriggerCloseDialog"
        />
      </div>
      <div
        class="p-3"
        v-bind="contentProps"
      >
        <slot />
      </div>
      <div
        v-if="slots.footer && !disableFooter"
        class="p-3 flex gap-1 items-center justify-center"
        v-bind="footerProps"
      >
        <slot name="footer" />
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
@reference '#/assets/main.css';

.modal {
  .modal__header {
    & :last-child {
      @apply col-3 justify-self-end;
    }
    & :nth-last-child(2) {
      @apply col-2;
    }
  }
}
</style>
