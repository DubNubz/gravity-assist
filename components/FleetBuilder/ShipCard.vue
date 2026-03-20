<template>
  <div
    class="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition duration-200 select-none"
    :class="
      isNotOwned && ownedOnly
        ? 'border-neutral-200 bg-neutral-50/50 opacity-50 dark:border-neutral-800 dark:bg-neutral-950/50'
        : 'border-neutral-300 bg-neutral-100/75 hover:border-neutral-400 hover:bg-neutral-200/75 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600 dark:hover:bg-neutral-800'
    "
    :draggable="!(isNotOwned && ownedOnly)"
    @click="emit('select')"
    @dragstart="onDragStart"
  >
    <!-- Ship image -->
    <div class="relative flex items-center justify-center overflow-hidden bg-neutral-200/50 transition duration-500 dark:bg-neutral-800/50" style="height: 80px">
      <img :src="ship.img" :alt="ship.name" class="h-full w-full object-contain p-1 transition duration-200 group-hover:scale-105" loading="lazy" />
      <!-- Not-owned lock badge -->
      <div v-if="isNotOwned && !ownedOnly" class="absolute right-1 top-1">
        <img class="size-3.5 select-none opacity-60 dark:invert" src="/ui/lock.svg" aria-hidden="true" />
      </div>
    </div>

    <!-- Info row -->
    <div class="flex items-center gap-2 px-2 py-1.5">
      <!-- Class icon (secondary) -->
      <img class="size-4 shrink-0 select-none opacity-60 transition duration-500 dark:invert" :src="`/ships/classes/${ship.type.toLowerCase()}.svg`" :alt="ship.type" />

      <div class="min-w-0 flex-1">
        <p class="truncate text-xs font-bold leading-tight transition duration-500">
          {{ ship.name }}<span v-if="ship.hasVariants" class="font-normal opacity-60"> ({{ ship.variant }})</span>
        </p>
        <p class="truncate text-[10px] leading-tight opacity-50 transition duration-500">{{ ship.commandPoints }} CP · Lim {{ ship.serviceLimit }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AllShip } from "~/utils/ships";

const props = defineProps<{
  ship: AllShip;
  ownedOnly: boolean;
  isNotOwned: boolean;
}>();

const emit = defineEmits<{
  select: [];
}>();

function onDragStart(event: DragEvent) {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({
      type: "library",
      shipId: props.ship.id,
      variant: props.ship.variant
    })
  );
  event.dataTransfer.effectAllowed = "copy";
}
</script>
