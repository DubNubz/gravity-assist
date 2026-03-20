<template>
  <div
    class="flex min-h-[12rem] flex-col gap-2 rounded-2xl border-2 p-3 transition duration-200"
    :class="
      isDragOver
        ? 'border-blue-400 bg-blue-50/50 dark:border-blue-600 dark:bg-blue-950/30'
        : 'border-neutral-300 bg-neutral-50/50 dark:border-neutral-700 dark:bg-neutral-900/50'
    "
    @dragover.prevent="isDragOver = true"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <!-- Header -->
    <div class="mb-1 flex items-center gap-2">
      <h3 class="text-sm font-bold uppercase tracking-wide transition duration-500 dark:text-neutral-300">Reinforcements</h3>
      <span
        v-if="entries.length"
        class="inline-flex items-center justify-center rounded-full bg-neutral-200 px-1.5 py-0.5 text-xs font-medium text-neutral-600 transition duration-500 dark:bg-neutral-700 dark:text-neutral-300"
      >
        {{ totalShips }}
      </span>
      <span class="ml-auto text-[10px] italic opacity-40 transition duration-500">no CP</span>
    </div>

    <!-- Ship cards -->
    <div v-if="entries.length" v-auto-animate class="grid grid-cols-2 gap-2">
      <FleetBuilderFleetShipCard
        v-for="entry in entries"
        :key="`${entry.shipId}-${entry.variant}`"
        :ship="getShip(entry)!"
        :entry="entry"
        row-name="Reinforcements"
        :is-not-owned="isNotOwned(entry)"
        @remove="emit('remove', entry)"
        @update-count="(count) => emit('updateCount', entry, count)"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed transition duration-200"
      :class="isDragOver ? 'border-blue-400 dark:border-blue-600' : 'border-neutral-300 dark:border-neutral-700'"
    >
      <img class="size-8 select-none opacity-20 transition duration-500 dark:invert" src="/ships/classes/fighter.svg" aria-hidden="true" />
      <p class="text-xs opacity-40 transition duration-500">Drop fighters &amp; corvettes here</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AllShip } from "~/utils/ships";
import type { FleetEntry } from "~/utils/fleetBuilder";
import type { BlueprintAllShip } from "~/utils/blueprints";

const props = defineProps<{
  entries: FleetEntry[];
  shipData: AllShip[];
  blueprintData: BlueprintAllShip[] | undefined;
}>();

const emit = defineEmits<{
  remove: [entry: FleetEntry];
  updateCount: [entry: FleetEntry, count: number];
  dropShip: [data: { type: string; shipId: number; variant: string; sourceRow?: string; targetRow: "Reinforcements" }];
}>();

function getShip(entry: FleetEntry): AllShip | undefined {
  return props.shipData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
}

function isNotOwned(entry: FleetEntry): boolean {
  if (!props.blueprintData) return false;
  const bp = props.blueprintData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
  return bp ? !bp.unlocked : false;
}

const totalShips = computed(() => props.entries.reduce((sum, e) => sum + e.count, 0));

const isDragOver = ref(false);

function onDragLeave(event: DragEvent) {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
    isDragOver.value = false;
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = false;
  const raw = event.dataTransfer?.getData("text/plain");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    emit("dropShip", { ...data, targetRow: "Reinforcements" });
  } catch {
    // ignore malformed data
  }
}
</script>
