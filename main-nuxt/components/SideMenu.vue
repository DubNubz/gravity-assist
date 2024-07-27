<template>
    <div class="sideMenu">
        <NuxtLink to="/home" class="sideMenuButton" :class="{ active: route.path == '/home' }" style="margin-top: 3em;">
        <img :src="'/ui/home.svg'" alt="Click to go back to the original landing page">
        <h3>Home</h3>
        </NuxtLink>
        <NuxtLink to="/modules/color-generator" class="sideMenuButton" :class="{ active: route.path == '/modules/color-generator' }">
        <img :src="'/ui/paint.svg'" alt="Click to go to the Color Generator page">
        <h3>Color Generator</h3>
        </NuxtLink>
        <NuxtLink to="/modules/research-agreement-helper" class="sideMenuButton" :class="{ active: route.path == '/modules/research-agreement-helper' }">
        <img :src="'/ui/atom.svg'" alt="Click to go to the Research Agreement Helper page">
        <h3>RA Helper</h3>
        </NuxtLink>
        <NuxtLink to="/modules/module-library" class="sideMenuButton" :class="{ active: route.path == '/modules/module-library' }">
        <img src="/ui/openBook.svg" alt="Click to go to the Module Library page">
        <h3>Module Library</h3>
        </NuxtLink>
        <NuxtLink to="/modules/equipment-encyclopedia" class="sideMenuButton" :class="{ active: route.path == '/modules/equipment-encyclopedia' }">
        <img src="/ui/wrench.svg" alt="Click to go to the Equipment Encyclopedia page">
        <h3>Equipment Library</h3>
        </NuxtLink>
        <NuxtLink to="/modules/fleet-builder" class="sideMenuButton" :class="{ active: route.path == '/modules/fleet-builder' }">
        <img :src="'/ui/blueprint.svg'" alt="Click to go to the Fleet Builder page">
        <h3>Fleet Builder</h3>
        </NuxtLink>
        <div style="margin-top: auto; margin-bottom: auto;"></div>
        <NuxtLink to="/contributors" class="sideMenuButton" :class="{ active: route.path == '/modules/contributors' }">
        <img :src="'/ui/alt/whiteCredits.svg'" alt="Click to go to the Contributors page">
        <h3>Contributors</h3>
        </NuxtLink>
        <NuxtLink to="/changelog" class="sideMenuButton" :class="{ active: route.path == '/modules/changelog' }" style="margin-bottom: 3em;">
        <img :src="'/ui/alt/whiteChanges.svg'" alt="Click to go to the Changelog page">
        <h3>Changelog</h3>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">

const route = useRoute();

</script>

<style lang="scss" scoped>

.sideMenu {
  background-color: rgb(36, 36, 36);
  width: 32em;
  height: calc(100% - 7em);
  position: fixed;
  top: 7em;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-right-radius: 3em;
  z-index: 50;

  .sideMenuButton {
    color: white;
    display: flex;
    width: 90%;
    gap: 3em;
    border-radius: 2em;
    padding-left: 1em;
    transition: all 0.15s ease-in-out;

    img {
      width: 6em;
    }

    h3 {
        text-align: center;
    }
  }

  .active {
    background-color: rgba(100, 100, 100, 0.25);
  }
}

@media screen and (min-width: 801px) {
    .sideMenu {
        position: fixed;
        top: 0;
        height: 100vh;
        border-top-right-radius: 0;
    }
}

@media screen and (max-width: 1000px) {
    .sideMenu {
        width: 27em;
    }
}

@media screen and (max-width: 800px) {
  .sideMenu {
    width: 100svw;
    border-top-right-radius: 0;

    .sideMenuButton {
      gap: 3svw;

      img {
        width: 6svh;
      }

      h3 {
        margin-top: 2.5svh;
        margin-bottoM: 2.5svh;
      }
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .sideMenuButton:hover {
    background-color: rgba(100, 100, 100, 0.35);
  }
}

</style>