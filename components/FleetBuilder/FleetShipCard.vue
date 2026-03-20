<template>
  <div
    class="group flex flex-col overflow-hidden rounded-xl border transition duration-200 select-none"
    :class="
      isNotOwned
        ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950/50'
        : 'border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800'
    "
    :title="ship.name + (ship.hasVariants ? ` (${ship.variant})` : '')"
    draggable="true"
    @dragstart="onDragStart"
  >
    <!-- Ship image -->
    <div class="relative flex items-center justify-center bg-neutral-200/50 transition duration-500 dark:bg-neutral-700/50" style="height: 72px">
      <img :src="ship.img" :alt="ship.name" class="h-full w-full object-contain p-1" loading="lazy" />
      <!-- Remove button overlay -->
      <button
        type="button"
        class="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-md border border-neutral-300 bg-white/80 text-neutral-600 opacity-0 transition duration-150 hover:border-red-400 hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 dark:border-neutral-600 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
        title="Remove from fleet"
        @click.stop="emit('remove')"
      >
        <img class="size-3 select-none dark:invert" src="/ui/close.svg" aria-hidden="true" />
      </button>
      <!-- Not-owned indicator -->
      <div v-if="isNotOwned" class="absolute left-1 top-1">
        <img class="size-3.5 select-none opacity-60 dark:invert" src="/ui/lock.svg" aria-hidden="true" />
      </div>
    </div>

    <!-- Info + controls -->
    <div class="px-2 py-1.5">
      <p class="flex min-w-0 items-baseline gap-0.5 text-xs font-bold leading-tight text-neutral-900 transition duration-500 dark:text-neutral-100">
        <span class="truncate">{{ ship.name }}</span>
        <span v-if="ship.hasVariants" class="shrink-0 font-normal opacity-60">({{ ship.variant }})</span>
      </p>

      <div class="mt-1 flex items-center justify-between gap-1">
        <!-- CP only shown for non-aircraft ships -->
        <span v-if="ship.type !== 'Fighter' && ship.type !== 'Corvette'" class="text-[10px] opacity-60 transition duration-500">{{ ship.commandPoints * entry.count }} CP</span>
        <span v-else class="text-[10px] opacity-40 transition duration-500 italic">aircraft</span>

        <!-- Count controls (only if serviceLimit > 1) -->
        <div v-if="ship.serviceLimit > 1" class="flex items-center gap-0.5">
          <button
            type="button"
            class="flex h-4 w-4 items-center justify-center rounded border border-neutral-300 bg-white text-xs font-bold text-neutral-700 transition duration-150 hover:border-neutral-400 hover:bg-neutral-100 disabled:opacity-30 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
            :disabled="entry.count <= 1"
            @click.stop="emit('updateCount', entry.count - 1)"
          >
            −
          </button>
          <span class="w-4 text-center text-[10px] font-medium text-neutral-700 dark:text-neutral-200">{{ entry.count }}</span>
          <button
            type="button"
            class="flex h-4 w-4 items-center justify-center rounded border border-neutral-300 bg-white text-xs font-bold text-neutral-700 transition duration-150 hover:border-neutral-400 hover:bg-neutral-100 disabled:opacity-30 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
            :disabled="entry.count >= ship.serviceLimit"
            @click.stop="emit('updateCount', entry.count + 1)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AllShip } from "~/utils/ships";
import type { FleetEntry } from "~/utils/fleetBuilder";

const props = defineProps<{
  ship: AllShip;
  entry: FleetEntry;
  isNotOwned: boolean;
  rowName: "Front" | "Middle" | "Back" | "Reinforcements";
}>();

const emit = defineEmits<{
  remove: [];
  updateCount: [count: number];
}>();

function onDragStart(event: DragEvent) {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({
      type: "fleet",
      shipId: props.entry.shipId,
      variant: props.entry.variant,
      sourceRow: props.rowName
    })
  );
  event.dataTransfer.effectAllowed = "move";
}
</script>
