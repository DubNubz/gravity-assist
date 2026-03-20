<template>
  <div class="flex h-full min-h-[calc(100dvh-6rem)] w-full flex-col items-center justify-start p-4 md:p-8">
    <!-- Page header -->
    <div class="flex w-full flex-col items-center justify-center md:w-[25rem] lg:w-[30rem]">
      <h1 class="text-3xl font-bold transition duration-500">Fleet Builder</h1>
      <div class="fo-divider my-2 before:transition before:duration-500 after:transition after:duration-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
        <span class="flex items-center justify-center">
          <img class="size-12 select-none transition duration-500 dark:invert" src="/ui/fleetBuilder.svg" aria-hidden="true" />
        </span>
      </div>
    </div>

    <!-- Notice banner -->
    <Transition name="notice">
      <div
        v-if="notice"
        class="mb-4 w-full max-w-7xl rounded-xl border border-blue-300 bg-blue-100 px-4 py-2 text-sm text-blue-800 transition duration-500 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200"
      >
        {{ notice }}
      </div>
    </Transition>

    <!-- Main two-column layout -->
    <div class="flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-start">
      <!-- ── LEFT: Ship Library ── -->
      <aside class="w-full shrink-0 lg:sticky lg:top-4 lg:w-72 xl:w-80">
        <div class="rounded-2xl border border-neutral-300 bg-neutral-50/75 p-4 transition duration-500 dark:border-neutral-700 dark:bg-neutral-900/75">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="font-bold transition duration-500">Ship Library</h2>
            <!-- Owned / All toggle -->
            <div class="flex overflow-hidden rounded-lg border border-neutral-300 transition duration-500 dark:border-neutral-600">
              <button
                type="button"
                class="px-3 py-1 text-xs font-medium transition duration-200"
                :class="
                  ownedOnly
                    ? 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
                "
                @click="ownedOnly = true"
              >
                Owned
              </button>
              <button
                type="button"
                class="px-3 py-1 text-xs font-medium transition duration-200"
                :class="
                  !ownedOnly
                    ? 'bg-neutral-200 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
                "
                @click="ownedOnly = false"
              >
                All
              </button>
            </div>
          </div>

          <!-- Blueprint data notice -->
          <ClientOnly>
            <p v-if="ownedOnly && !hasBlueprintData" class="mb-3 rounded-lg bg-yellow-100 p-2 text-xs text-yellow-800 transition duration-500 dark:bg-yellow-900 dark:text-yellow-200">
              Load your
              <NuxtLink to="/modules/blueprint-tracker" class="font-semibold underline">Blueprint Tracker</NuxtLink>
              to filter by owned ships.
            </p>
          </ClientOnly>

          <!-- Type filter pills -->
          <div class="mb-3 flex flex-wrap gap-1">
            <button
              v-for="t in typeFilters"
              :key="t"
              type="button"
              class="rounded-full px-2 py-0.5 text-xs font-medium transition duration-200"
              :class="
                typeFilter === t
                  ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
              "
              @click="typeFilter = t"
            >
              {{ t }}
            </button>
          </div>

          <!-- Search -->
          <div class="fo-input-group mb-3 transition duration-500">
            <span class="fo-input-group-text transition duration-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <img class="size-4 select-none transition duration-500 dark:invert" src="/ui/search.svg" aria-hidden="true" />
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search ships…"
              class="fo-input border-neutral-300 bg-white text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
            />
          </div>

          <!-- Ship grid -->
          <div class="grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto pr-1">
            <p v-if="!userStore.shipData" class="col-span-2 text-sm italic transition duration-500 dark:text-neutral-500">Loading ships…</p>
            <p v-else-if="filteredLibraryShips.length === 0" class="col-span-2 text-sm italic transition duration-500 dark:text-neutral-500">No ships match your filters.</p>
            <FleetBuilderShipCard
              v-for="ship in filteredLibraryShips"
              :key="`${ship.id}-${ship.variant}`"
              :ship="ship"
              :owned-only="ownedOnly"
              :is-not-owned="isNotOwned(ship)"
              @select="addToDefaultRow(ship)"
            />
          </div>
        </div>
      </aside>

      <!-- ── RIGHT: Fleet Composer ── -->
      <div class="flex min-w-0 flex-1 flex-col gap-4">
        <!-- Fleet header bar -->
        <div class="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-300 bg-neutral-50/75 p-4 transition duration-500 dark:border-neutral-700 dark:bg-neutral-900/75">
          <!-- Fleet name -->
          <input
            v-model="fleetName"
            type="text"
            maxlength="60"
            placeholder="Fleet Name"
            class="fo-input min-w-0 flex-1 border-neutral-300 bg-white text-black placeholder-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
          />

          <!-- CP display -->
          <div class="flex items-center gap-2 text-sm font-medium">
            <span
              class="transition duration-500"
              :class="currentCP > maxCP ? 'text-red-600 dark:text-red-400' : currentCP > maxCP * 0.9 ? 'text-yellow-600 dark:text-yellow-400' : 'text-neutral-700 dark:text-neutral-300'"
            >
              {{ currentCP }}
            </span>
            <span class="text-neutral-400">/</span>
            <input
              v-model.number="maxCP"
              type="number"
              min="1"
              max="9999"
              class="fo-input w-20 border-neutral-300 bg-white text-center text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              title="Max Command Points"
            />
            <span class="text-neutral-500 dark:text-neutral-400">CP</span>
          </div>

          <!-- Mode badge -->
          <span
            class="rounded-lg px-2 py-1 text-xs font-medium transition duration-500"
            :class="ownedOnly ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'"
          >
            {{ ownedOnly ? "Owned" : "All" }}
          </span>

          <button
            type="button"
            class="fo-btn border-neutral-300 bg-neutral-200 text-sm text-black transition duration-200 hover:border-neutral-400 hover:bg-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
            @click="newFleet"
          >
            New
          </button>
          <button
            type="button"
            class="fo-btn flex items-center gap-1 border-green-300 bg-green-100 text-sm text-black transition duration-200 hover:border-green-400 hover:bg-green-200 dark:border-green-700 dark:bg-green-900 dark:text-white dark:hover:border-green-600 dark:hover:bg-green-800"
            @click="saveFleet"
          >
            <img class="size-4 select-none transition duration-500 dark:invert" src="/ui/save.svg" aria-hidden="true" />
            Save
          </button>
        </div>

        <!-- CP progress bar -->
        <div class="h-2 w-full overflow-hidden rounded-full bg-neutral-200 transition duration-500 dark:bg-neutral-700">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="currentCP > maxCP ? 'bg-red-500' : currentCP > maxCP * 0.9 ? 'bg-yellow-400' : 'bg-green-400'"
            :style="{ width: `${Math.min(100, (currentCP / maxCP) * 100)}%` }"
          ></div>
        </div>

        <!-- Fleet formation rows + Reinforcements -->
        <div class="flex flex-col gap-3 xl:flex-row xl:items-start">
          <!-- Back | Middle | Front -->
          <div class="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
            <FleetBuilderFleetRow
              v-for="row in (['Back', 'Middle', 'Front'] as const)"
              :key="row"
              :row-name="row"
              :entries="fleet.rows[row]"
              :ship-data="userStore.shipData ?? []"
              :blueprint-data="userStore.blueprintsAutosave"
              @remove="(entry) => removeFromFleet(row, entry)"
              @update-count="(entry, count) => updateCount(row, entry, count)"
              @drop-ship="handleDropShip"
            />
          </div>

          <!-- Reinforcements column -->
          <FleetBuilderReinforcementsRow
            class="xl:w-56 xl:shrink-0"
            :entries="reinforcements"
            :ship-data="userStore.shipData ?? []"
            :blueprint-data="userStore.blueprintsAutosave"
            @remove="removeFromReinforcements"
            @update-count="updateReinforcementCount"
            @drop-ship="handleReinforcementsDrop"
          />
        </div>

        <!-- Aircraft / hangar summary -->
        <ClientOnly>
          <FleetBuilderFleetStats
            :rows="fleet.rows"
            :reinforcements="reinforcements"
            :ship-data="userStore.shipData ?? []"
            :blueprint-data="userStore.blueprintsAutosave"
          />
        </ClientOnly>

        <div class="fo-divider before:transition before:duration-500 after:transition after:duration-500 dark:before:border-neutral-700 dark:after:border-neutral-700"></div>

        <!-- Saved fleets -->
        <ClientOnly>
          <FleetBuilderSavedFleets :fleets="savedFleets" :ship-data="userStore.shipData ?? []" @load="loadFleet" @delete="deleteFleet" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AllShip } from "~/utils/ships";
import type { FleetEntry, FleetRow, SavedFleet } from "~/utils/fleetBuilder";
import { FLEET_SHIP_TYPES, emptyFleetRows, emptyReinforcements, getFleetCommandPoints, loadSavedFleets, persistSavedFleets } from "~/utils/fleetBuilder";
import { getRandomCharacters } from "~/utils/functions";

useSeoMeta({
  title: "Fleet Builder | Gravity Assist",
  description: "Build and save Infinite Lagrange fleet compositions. Track command points, hangar capacity, and fleet formation rows."
});

const userStore = useUserStore();

// ── Library ────────────────────────────────────────────────────────────────
const ownedOnly = ref(true);
const typeFilter = ref<string>("All");
const searchQuery = ref("");

const typeFilters = computed(() => ["All", ...FLEET_SHIP_TYPES]);
const hasBlueprintData = computed(() => Boolean(userStore.blueprintsAutosave?.length));

function isNotOwned(ship: AllShip): boolean {
  if (!userStore.blueprintsAutosave) return false;
  const bp = userStore.blueprintsAutosave.find((s) => s.id === ship.id && s.variant === ship.variant);
  return bp ? !bp.unlocked : false;
}

const filteredLibraryShips = computed<AllShip[]>(() => {
  if (!userStore.shipData) return [];

  let ships = userStore.shipData.filter((s) => (FLEET_SHIP_TYPES as readonly string[]).includes(s.type));

  if (ownedOnly.value && hasBlueprintData.value) {
    ships = ships.filter((s) => !isNotOwned(s));
  }

  if (typeFilter.value !== "All") {
    ships = ships.filter((s) => s.type === typeFilter.value);
  }

  const q = searchQuery.value.toLowerCase().trim();
  if (q) {
    ships = ships.filter((s) => s.name.toLowerCase().includes(q) || s.variantName.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
  }

  return ships;
});

// ── Fleet ──────────────────────────────────────────────────────────────────
const fleetName = ref("New Fleet");
const maxCP = ref(320);
const fleet = reactive<Pick<SavedFleet, "rows">>({ rows: emptyFleetRows() });
const reinforcements = ref<FleetEntry[]>(emptyReinforcements());

const currentCP = computed(() => getFleetCommandPoints(fleet.rows, userStore.shipData ?? []));

function addToDefaultRow(ship: AllShip) {
  addToFleet(ship, ship.row as FleetRow);
}

function addToFleet(ship: AllShip, row: FleetRow) {
  const existing = fleet.rows[row].find((e) => e.shipId === ship.id && e.variant === ship.variant);
  if (existing) {
    if (existing.count >= ship.serviceLimit) {
      showNotice(`${ship.name} (${ship.variant}) is already at its service limit of ${ship.serviceLimit}.`);
      return;
    }
    existing.count++;
  } else {
    fleet.rows[row].push({ shipId: ship.id, variant: ship.variant, count: 1 });
  }
  if (currentCP.value > maxCP.value) {
    showNotice(`Fleet exceeds the ${maxCP.value} CP limit (${currentCP.value} CP used).`);
  }
}

function removeFromFleet(row: FleetRow, entry: FleetEntry) {
  const idx = fleet.rows[row].findIndex((e) => e.shipId === entry.shipId && e.variant === entry.variant);
  if (idx !== -1) fleet.rows[row].splice(idx, 1);
}

function updateCount(row: FleetRow, entry: FleetEntry, count: number) {
  const e = fleet.rows[row].find((e) => e.shipId === entry.shipId && e.variant === entry.variant);
  if (!e) return;
  const ship = userStore.shipData?.find((s) => s.id === entry.shipId && s.variant === entry.variant);
  e.count = Math.max(1, Math.min(count, ship?.serviceLimit ?? count));
}

function moveShipBetweenRows(shipId: number, variant: string, sourceRow: FleetRow, targetRow: FleetRow) {
  const sourceList = fleet.rows[sourceRow];
  const idx = sourceList.findIndex((e) => e.shipId === shipId && e.variant === variant);
  if (idx === -1) return;
  const [entry] = sourceList.splice(idx, 1);

  const existing = fleet.rows[targetRow].find((e) => e.shipId === shipId && e.variant === variant);
  if (existing) {
    const ship = userStore.shipData?.find((s) => s.id === shipId && s.variant === variant);
    if (ship && existing.count + entry.count <= ship.serviceLimit) {
      existing.count += entry.count;
    } else {
      sourceList.splice(idx, 0, entry);
      showNotice(`Can't move — service limit would be exceeded.`);
    }
  } else {
    fleet.rows[targetRow].push(entry);
  }
}

function moveShipFromRowToReinforcements(shipId: number, variant: string, sourceRow: FleetRow) {
  const sourceList = fleet.rows[sourceRow];
  const idx = sourceList.findIndex((e) => e.shipId === shipId && e.variant === variant);
  if (idx === -1) return;
  const [entry] = sourceList.splice(idx, 1);
  const existing = reinforcements.value.find((e) => e.shipId === shipId && e.variant === variant);
  if (existing) {
    existing.count += entry.count;
  } else {
    reinforcements.value.push(entry);
  }
}

function moveShipFromReinforcementsToRow(shipId: number, variant: string, targetRow: FleetRow) {
  const idx = reinforcements.value.findIndex((e) => e.shipId === shipId && e.variant === variant);
  if (idx === -1) return;
  const [entry] = reinforcements.value.splice(idx, 1);
  const existing = fleet.rows[targetRow].find((e) => e.shipId === shipId && e.variant === variant);
  if (existing) {
    const ship = userStore.shipData?.find((s) => s.id === shipId && s.variant === variant);
    if (ship && existing.count + entry.count <= ship.serviceLimit) {
      existing.count += entry.count;
    } else {
      reinforcements.value.splice(idx, 0, entry);
      showNotice(`Can't move — service limit would be exceeded.`);
    }
  } else {
    fleet.rows[targetRow].push(entry);
  }
}

function handleDropShip(data: { type: string; shipId: number; variant: string; sourceRow?: string; targetRow: string }) {
  if (data.type === "library") {
    const ship = userStore.shipData?.find((s) => s.id === data.shipId && s.variant === data.variant);
    if (ship) addToFleet(ship, data.targetRow as FleetRow);
  } else if (data.type === "fleet" && data.sourceRow && data.sourceRow !== data.targetRow) {
    if (data.sourceRow === "Reinforcements") {
      moveShipFromReinforcementsToRow(data.shipId, data.variant, data.targetRow as FleetRow);
    } else {
      moveShipBetweenRows(data.shipId, data.variant, data.sourceRow as FleetRow, data.targetRow as FleetRow);
    }
  }
}

// ── Reinforcements ─────────────────────────────────────────────────────────
function addToReinforcements(ship: AllShip) {
  const existing = reinforcements.value.find((e) => e.shipId === ship.id && e.variant === ship.variant);
  if (existing) {
    if (existing.count >= ship.serviceLimit) {
      showNotice(`${ship.name} (${ship.variant}) is already at its service limit of ${ship.serviceLimit}.`);
      return;
    }
    existing.count++;
  } else {
    reinforcements.value.push({ shipId: ship.id, variant: ship.variant, count: 1 });
  }
}

function removeFromReinforcements(entry: FleetEntry) {
  const idx = reinforcements.value.findIndex((e) => e.shipId === entry.shipId && e.variant === entry.variant);
  if (idx !== -1) reinforcements.value.splice(idx, 1);
}

function updateReinforcementCount(entry: FleetEntry, count: number) {
  const e = reinforcements.value.find((e) => e.shipId === entry.shipId && e.variant === entry.variant);
  if (!e) return;
  const ship = userStore.shipData?.find((s) => s.id === entry.shipId && s.variant === entry.variant);
  e.count = Math.max(1, Math.min(count, ship?.serviceLimit ?? count));
}

function handleReinforcementsDrop(data: { type: string; shipId: number; variant: string; sourceRow?: string; targetRow: "Reinforcements" }) {
  if (data.type === "library") {
    const ship = userStore.shipData?.find((s) => s.id === data.shipId && s.variant === data.variant);
    if (ship) addToReinforcements(ship);
  } else if (data.type === "fleet" && data.sourceRow && data.sourceRow !== "Reinforcements") {
    moveShipFromRowToReinforcements(data.shipId, data.variant, data.sourceRow as FleetRow);
  }
}

function newFleet() {
  fleet.rows = emptyFleetRows();
  reinforcements.value = emptyReinforcements();
  fleetName.value = "New Fleet";
  maxCP.value = 320;
}

// ── Saved fleets ───────────────────────────────────────────────────────────
const savedFleets = ref<SavedFleet[]>([]);
onMounted(() => (savedFleets.value = loadSavedFleets()));

function saveFleet() {
  const name = fleetName.value.trim() || "Unnamed Fleet";
  const existingIdx = savedFleets.value.findIndex((f) => f.name === name);

  const saved: SavedFleet = {
    id: existingIdx !== -1 ? savedFleets.value[existingIdx].id : getRandomCharacters(10),
    name,
    maxCommandPoints: maxCP.value,
    ownedOnly: ownedOnly.value,
    rows: JSON.parse(JSON.stringify(fleet.rows)),
    reinforcements: JSON.parse(JSON.stringify(reinforcements.value)),
    savedAt: new Date().toISOString().slice(0, 10)
  };

  if (existingIdx !== -1) {
    savedFleets.value.splice(existingIdx, 1, saved);
    showNotice(`Fleet "${name}" updated.`);
  } else {
    savedFleets.value.unshift(saved);
    showNotice(`Fleet "${name}" saved.`);
  }
  persistSavedFleets(savedFleets.value);
}

function loadFleet(saved: SavedFleet) {
  fleetName.value = saved.name;
  maxCP.value = saved.maxCommandPoints;
  ownedOnly.value = saved.ownedOnly;
  fleet.rows = JSON.parse(JSON.stringify(saved.rows));
  reinforcements.value = JSON.parse(JSON.stringify(saved.reinforcements ?? []));
  showNotice(`Fleet "${saved.name}" loaded.`);
}

function deleteFleet(id: string) {
  const idx = savedFleets.value.findIndex((f) => f.id === id);
  if (idx !== -1) {
    const name = savedFleets.value[idx].name;
    savedFleets.value.splice(idx, 1);
    persistSavedFleets(savedFleets.value);
    showNotice(`Fleet "${name}" deleted.`);
  }
}

// ── Notice ─────────────────────────────────────────────────────────────────
const notice = ref("");
let noticeTimeout: ReturnType<typeof setTimeout> | null = null;

function showNotice(msg: string) {
  notice.value = msg;
  if (noticeTimeout) clearTimeout(noticeTimeout);
  noticeTimeout = setTimeout(() => (notice.value = ""), 3500);
}
</script>

<style lang="scss" scoped>
.notice-enter-active,
.notice-leave-active {
  transition: all 0.3s ease-in-out;
}
.notice-enter-from,
.notice-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
