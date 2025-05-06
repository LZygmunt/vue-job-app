<script setup lang="ts">
import { toRefs, useTemplateRef, watchEffect } from 'vue'

interface BaseModalProps {
  teleportTarget?: string
  disableFooter?: boolean
  disableHeader?: boolean
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  teleportTarget: 'body',
})
const { disableFooter, disableHeader, teleportTarget } = toRefs(props)

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')

const onTriggerOpenDialog = () => {
  dialogRef.value?.showModal()
}

const onTriggerCloseDialog = () => {
  dialogRef.value?.close()
}

watchEffect(() => {
  dialogRef.value?.showModal()
})
</script>

<template>
  <slot
    name="button"
    @click="onTriggerOpenDialog"
  />
  <Teleport :to="teleportTarget">
    <dialog ref="dialog">
      <div
        v-if="!disableHeader"
        class="header"
      >
        <slot
          name="header"
          @clickCancel="onTriggerCloseDialog"
        />
      </div>
      <slot />
      <div
        v-if="!disableFooter"
        class="footer"
      >
        <slot name="footer" />
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
@reference '#/assets/main.css';

dialog {
  @apply m-auto
  rounded-lg
  divide-y-2
  divide-green-500
  shadow-lg
  shadow-green-500/50
  text-neutral-50
  bg-green-700
  border-1
  border-green-500
  dark:bg-neutral-700;

  & > * {
    @apply px-4 py-2;
  }

  .header {
    @apply grid grid-cols-[1fr_auto_1fr];

    & :last-child {
      @apply col-3 justify-self-end;
    }
    & :nth-last-child(2) {
      @apply col-2;
    }
  }

  .footer {
    @apply flex place-content-center;
  }

  .header,
  .footer {
    @apply gap-1 dark:bg-neutral-900;
  }
}
</style>
