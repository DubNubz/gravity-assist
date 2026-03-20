<template>
  <div>
    <div class="mb-3 flex items-center gap-2">
      <h3 class="text-sm font-bold uppercase tracking-wide transition duration-500 dark:text-neutral-300">Saved Fleets</h3>
      <span class="inline-flex items-center justify-center rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 transition duration-500 dark:bg-neutral-700 dark:text-neutral-300">
        {{ fleets.length }}
      </span>
    </div>

    <div v-if="fleets.length" v-auto-animate class="flex flex-col gap-2">
      <div
        v-for="fleet in fleets"
        :key="fleet.id"
        class="flex items-center gap-3 rounded-xl border border-neutral-300 bg-neutral-100/75 p-3 transition duration-200 hover:bg-neutral-200/50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      >
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate text-sm font-bold transition duration-500">{{ fleet.name }}</p>
            <span
              v-if="fleet.ownedOnly"
              class="shrink-0 rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 transition duration-500 dark:bg-green-900 dark:text-green-200"
            >
              Owned
            </span>
            <span v-else class="shrink-0 rounded bg-neutral-200 px-1.5 py-0.5 text-xs font-medium text-neutral-700 transition duration-500 dark:bg-neutral-700 dark:text-neutral-300">All</span>
          </div>
          <p class="text-xs transition duration-500 dark:text-neutral-500">
            {{ getFleetCP(fleet) }} / {{ fleet.maxCommandPoints }} CP · {{ countShips(fleet) }} ships · {{ formatDate(fleet.savedAt, "numeric") }}
          </p>
        </div>

        <button
          type="button"
          class="fo-btn h-7 min-h-7 shrink-0 rounded-lg border-blue-300 bg-blue-100 px-3 text-xs text-black transition duration-200 hover:border-blue-400 hover:bg-blue-200 dark:border-blue-700 dark:bg-blue-900 dark:text-white dark:hover:border-blue-600 dark:hover:bg-blue-800"
          title="Load fleet"
          @click="emit('load', fleet)"
        >
          Load
        </button>

        <button
          type="button"
          class="fo-btn h-7 min-h-7 shrink-0 rounded-lg border-red-300 bg-red-100 px-3 text-xs text-black transition duration-200 hover:border-red-400 hover:bg-red-200 dark:border-red-700 dark:bg-red-900 dark:text-white dark:hover:border-red-600 dark:hover:bg-red-800"
          title="Delete fleet"
          @click="emit('delete', fleet.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <p v-else class="text-sm italic transition duration-500 dark:text-neutral-600">No saved fleets yet. Build a fleet and click Save.</p>
  </div>
</template>

<script setup lang="ts">
import type { SavedFleet } from "~/utils/fleetBuilder";
import { FLEET_ROWS, getFleetCommandPoints } from "~/utils/fleetBuilder";

const props = defineProps<{
  fleets: SavedFleet[];
  shipData: import("~/utils/ships").AllShip[];
}>();

const emit = defineEmits<{
  load: [fleet: SavedFleet];
  delete: [id: string];
}>();

function getFleetCP(fleet: SavedFleet): number {
  return getFleetCommandPoints(fleet.rows, props.shipData);
}

function countShips(fleet: SavedFleet): number {
  return FLEET_ROWS.reduce((sum, row) => sum + fleet.rows[row].reduce((s, e) => s + e.count, 0), 0);
}
</script>
