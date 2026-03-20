<template>
  <div v-if="hasAnyCapacity" class="rounded-2xl border border-neutral-300 bg-neutral-100/75 p-4 transition duration-500 dark:border-neutral-700 dark:bg-neutral-900">
    <!-- Header with toggle -->
    <button type="button" class="flex w-full items-center justify-between gap-2 transition duration-200" @click="isExpanded = !isExpanded">
      <h3 class="text-sm font-bold uppercase tracking-wide transition duration-500 dark:text-neutral-300">Hangar Capacity</h3>
      <img
        class="size-4 shrink-0 select-none transition-transform duration-300 dark:invert"
        :class="isExpanded ? 'rotate-90' : 'rotate-0'"
        src="/ui/arrowRight.svg"
        aria-hidden="true"
      />
    </button>

    <!-- Summary chips (always visible) -->
    <div class="mt-3 flex flex-wrap gap-2">
      <div v-if="totalCapacity.largeFighters > 0" class="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 transition duration-500 dark:border-neutral-700 dark:bg-neutral-800">
        <img class="size-4 select-none transition duration-500 dark:invert" src="/ships/classes/fighter.svg" alt="Large Fighter" />
        <div>
          <p class="text-[10px] font-medium leading-none transition duration-500 dark:text-neutral-400">Large Fighters</p>
          <p class="text-base font-bold leading-tight transition duration-500">{{ totalCapacity.largeFighters }}</p>
        </div>
      </div>
      <div v-if="totalCapacity.mediumFighters > 0" class="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 transition duration-500 dark:border-neutral-700 dark:bg-neutral-800">
        <img class="size-4 select-none transition duration-500 dark:invert" src="/ships/classes/fighter.svg" alt="Medium Fighter" />
        <div>
          <p class="text-[10px] font-medium leading-none transition duration-500 dark:text-neutral-400">Medium Fighters</p>
          <p class="text-base font-bold leading-tight transition duration-500">{{ totalCapacity.mediumFighters }}</p>
        </div>
      </div>
      <div v-if="totalCapacity.smallFighters > 0" class="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 transition duration-500 dark:border-neutral-700 dark:bg-neutral-800">
        <img class="size-4 select-none transition duration-500 dark:invert" src="/ships/classes/fighter.svg" alt="Small Fighter" />
        <div>
          <p class="text-[10px] font-medium leading-none transition duration-500 dark:text-neutral-400">Small Fighters</p>
          <p class="text-base font-bold leading-tight transition duration-500">{{ totalCapacity.smallFighters }}</p>
        </div>
      </div>
      <div v-if="totalCapacity.corvettes > 0" class="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 transition duration-500 dark:border-neutral-700 dark:bg-neutral-800">
        <img class="size-4 select-none transition duration-500 dark:invert" src="/ships/classes/corvette.svg" alt="Corvette" />
        <div>
          <p class="text-[10px] font-medium leading-none transition duration-500 dark:text-neutral-400">Corvettes</p>
          <p class="text-base font-bold leading-tight transition duration-500">{{ totalCapacity.corvettes }}</p>
        </div>
      </div>
    </div>

    <!-- Per-ship breakdown (collapsible) -->
    <Transition name="expand">
      <div v-if="isExpanded" class="mt-4 flex flex-col gap-3">
        <div
          v-for="info in shipHangarInfos"
          :key="`${info.ship.id}-${info.ship.variant}`"
          class="rounded-xl border border-neutral-200 bg-white p-3 transition duration-500 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <!-- Ship header -->
          <div class="mb-2 flex items-center gap-2">
            <img :src="info.ship.img" :alt="info.ship.name" class="h-8 w-8 shrink-0 object-contain" loading="lazy" />
            <div class="min-w-0">
              <p class="flex items-baseline gap-1 text-xs font-bold leading-tight text-neutral-900 transition duration-500 dark:text-neutral-100">
                <span class="truncate">{{ info.ship.name }}</span>
                <span v-if="info.ship.hasVariants" class="shrink-0 font-normal opacity-60">({{ info.ship.variant }})</span>
              </p>
              <p v-if="info.count > 1" class="text-[10px] opacity-50">× {{ info.count }}</p>
            </div>
          </div>

          <!-- Slot rows per aircraft type -->
          <div class="flex flex-col gap-1.5">
            <div v-if="info.totalLarge > 0" class="flex items-center gap-2">
              <span class="w-24 shrink-0 text-[10px] text-neutral-500 dark:text-neutral-400">Large Fighters</span>
              <div class="flex flex-wrap gap-0.5">
                <div
                  v-for="i in slotBoxCount(info.totalLarge)"
                  :key="i"
                  class="h-2.5 w-2.5 rounded-sm transition duration-200"
                  :class="i <= scaledFilled(info.filledLarge, info.totalLarge) ? 'bg-indigo-400 dark:bg-indigo-500' : 'border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700'"
                />
              </div>
              <span class="ml-auto shrink-0 text-[10px] font-medium text-neutral-600 dark:text-neutral-400">{{ info.filledLarge }}/{{ info.totalLarge }}</span>
            </div>
            <div v-if="info.totalMedium > 0" class="flex items-center gap-2">
              <span class="w-24 shrink-0 text-[10px] text-neutral-500 dark:text-neutral-400">Medium Fighters</span>
              <div class="flex flex-wrap gap-0.5">
                <div
                  v-for="i in slotBoxCount(info.totalMedium)"
                  :key="i"
                  class="h-2.5 w-2.5 rounded-sm transition duration-200"
                  :class="i <= scaledFilled(info.filledMedium, info.totalMedium) ? 'bg-blue-400 dark:bg-blue-500' : 'border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700'"
                />
              </div>
              <span class="ml-auto shrink-0 text-[10px] font-medium text-neutral-600 dark:text-neutral-400">{{ info.filledMedium }}/{{ info.totalMedium }}</span>
            </div>
            <div v-if="info.totalSmall > 0" class="flex items-center gap-2">
              <span class="w-24 shrink-0 text-[10px] text-neutral-500 dark:text-neutral-400">Small Fighters</span>
              <div class="flex flex-wrap gap-0.5">
                <div
                  v-for="i in slotBoxCount(info.totalSmall)"
                  :key="i"
                  class="h-2.5 w-2.5 rounded-sm transition duration-200"
                  :class="i <= scaledFilled(info.filledSmall, info.totalSmall) ? 'bg-sky-400 dark:bg-sky-500' : 'border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700'"
                />
              </div>
              <span class="ml-auto shrink-0 text-[10px] font-medium text-neutral-600 dark:text-neutral-400">{{ info.filledSmall }}/{{ info.totalSmall }}</span>
            </div>
            <div v-if="info.totalCorvette > 0" class="flex items-center gap-2">
              <span class="w-24 shrink-0 text-[10px] text-neutral-500 dark:text-neutral-400">Corvettes</span>
              <div class="flex flex-wrap gap-0.5">
                <div
                  v-for="i in slotBoxCount(info.totalCorvette)"
                  :key="i"
                  class="h-2.5 w-2.5 rounded-sm transition duration-200"
                  :class="i <= scaledFilled(info.filledCorvette, info.totalCorvette) ? 'bg-violet-400 dark:bg-violet-500' : 'border border-neutral-300 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700'"
                />
              </div>
              <span class="ml-auto shrink-0 text-[10px] font-medium text-neutral-600 dark:text-neutral-400">{{ info.filledCorvette }}/{{ info.totalCorvette }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { AllShip, Fighter } from "~/utils/ships";
import type { SavedFleet, AircraftCapacity, FleetEntry } from "~/utils/fleetBuilder";
import type { BlueprintAllShip } from "~/utils/blueprints";
import { FLEET_ROWS, getShipAircraftCapacity, getFleetAircraftCapacity, fighterTypeToHangar } from "~/utils/fleetBuilder";

const props = defineProps<{
  rows: SavedFleet["rows"];
  reinforcements: FleetEntry[];
  shipData: AllShip[];
  blueprintData: BlueprintAllShip[] | undefined;
}>();

const isExpanded = ref(false);

/** Get blueprint-unlocked module systems for a ship (for supercapitals) */
function getBlueprintModules(shipId: number, variant: string): string[] | undefined {
  if (!props.blueprintData) return undefined;
  const bp = props.blueprintData.find((s) => s.id === shipId && s.variant === variant);
  if (!bp || !("modules" in bp)) return undefined;
  return (bp as any).modules.filter((m: any) => m.unlocked).map((m: any) => m.system) as string[];
}

/** Total hangar capacity from fleet rows + reinforcements */
const totalCapacity = computed<AircraftCapacity>(() => {
  // Fleet rows
  const rowCapacity = getFleetAircraftCapacity(props.rows, props.shipData, getBlueprintModules);
  // Reinforcements ships that have hangar capacity
  const rfCapacity: AircraftCapacity = { smallFighters: 0, mediumFighters: 0, largeFighters: 0, corvettes: 0 };
  for (const entry of props.reinforcements) {
    const ship = props.shipData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
    if (!ship) continue;
    const cap = getShipAircraftCapacity(ship, getBlueprintModules(entry.shipId, entry.variant));
    rfCapacity.smallFighters += cap.smallFighters * entry.count;
    rfCapacity.mediumFighters += cap.mediumFighters * entry.count;
    rfCapacity.largeFighters += cap.largeFighters * entry.count;
    rfCapacity.corvettes += cap.corvettes * entry.count;
  }
  return {
    smallFighters: rowCapacity.smallFighters + rfCapacity.smallFighters,
    mediumFighters: rowCapacity.mediumFighters + rfCapacity.mediumFighters,
    largeFighters: rowCapacity.largeFighters + rfCapacity.largeFighters,
    corvettes: rowCapacity.corvettes + rfCapacity.corvettes
  };
});

const hasAnyCapacity = computed(
  () => totalCapacity.value.largeFighters + totalCapacity.value.mediumFighters + totalCapacity.value.smallFighters + totalCapacity.value.corvettes > 0
);

/** Count aircraft in reinforcements by type */
const reinforcementAircraft = computed(() => {
  const counts = { largeFighters: 0, mediumFighters: 0, smallFighters: 0, corvettes: 0 };
  for (const entry of props.reinforcements) {
    const ship = props.shipData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
    if (!ship) continue;
    if (ship.type === "Fighter") {
      const key = fighterTypeToHangar((ship as Fighter).fighterType);
      counts[key] += entry.count;
    } else if (ship.type === "Corvette") {
      counts.corvettes += entry.count;
    }
  }
  return counts;
});

interface ShipHangarInfo {
  ship: AllShip;
  count: number;
  totalLarge: number;
  totalMedium: number;
  totalSmall: number;
  totalCorvette: number;
  filledLarge: number;
  filledMedium: number;
  filledSmall: number;
  filledCorvette: number;
}

/** Per-ship hangar info with filled slots from reinforcements */
const shipHangarInfos = computed<ShipHangarInfo[]>(() => {
  const infos: ShipHangarInfo[] = [];
  const remaining = { ...reinforcementAircraft.value };

  // Iterate all rows + reinforcements (reinforcement capital ships can have hangars too)
  const allEntries: FleetEntry[] = [
    ...FLEET_ROWS.flatMap((r) => props.rows[r]),
    ...props.reinforcements
  ];

  for (const entry of allEntries) {
    const ship = props.shipData.find((s) => s.id === entry.shipId && s.variant === entry.variant);
    if (!ship) continue;
    const cap = getShipAircraftCapacity(ship, getBlueprintModules(entry.shipId, entry.variant));
    const totalLarge = cap.largeFighters * entry.count;
    const totalMedium = cap.mediumFighters * entry.count;
    const totalSmall = cap.smallFighters * entry.count;
    const totalCorvette = cap.corvettes * entry.count;
    if (totalLarge + totalMedium + totalSmall + totalCorvette === 0) continue;

    const filledLarge = Math.min(totalLarge, remaining.largeFighters);
    remaining.largeFighters -= filledLarge;
    const filledMedium = Math.min(totalMedium, remaining.mediumFighters);
    remaining.mediumFighters -= filledMedium;
    const filledSmall = Math.min(totalSmall, remaining.smallFighters);
    remaining.smallFighters -= filledSmall;
    const filledCorvette = Math.min(totalCorvette, remaining.corvettes);
    remaining.corvettes -= filledCorvette;

    infos.push({ ship, count: entry.count, totalLarge, totalMedium, totalSmall, totalCorvette, filledLarge, filledMedium, filledSmall, filledCorvette });
  }

  return infos;
});

/** Number of visual slot boxes to show (max 20) */
function slotBoxCount(total: number): number {
  return Math.min(total, 20);
}

/** When total > 20, scale filled proportionally to fit the 20-box display */
function scaledFilled(filled: number, total: number): number {
  if (total <= 20) return filled;
  return Math.round((filled / total) * 20);
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition:
    opacity 0.25s ease,
    max-height 0.3s ease;
  max-height: 9999px;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
