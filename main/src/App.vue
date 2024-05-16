<template>
  <header class="darkHeader" id="header">
    <div class="title">
      <img src="/radiant.svg" alt="Gravity Assist Icon" id="gravityAssistIcon">
      <h1 id="gravityAssistTitle">Gravity Assist</h1>
    </div>

    <nav class="navButtons">
      <RouterLink :to="{ path: '/home'}"
      class="navButton" id="homeButton"
      :class="{ activeHeaderButton: globalVariables.activeModule.value === 'Home' }"
      @click="changeModule('Home')">
      Home</RouterLink>

      <RouterLink :to="{ path: '/modules/color-generator'}"
      class="navButton"
      :class="{ activeHeaderButton: globalVariables.activeModule.value === 'Color Generator' }"
      @click="changeModule('Color Generator')">
      Color Generator</RouterLink>

      <!--<RouterLink :to="{ path: '/modules/fleet-builder'}"
      class="navButton"
      :class="{ activeHeaderButton: globalVariables.activeModule.value === 'Fleet Builder' }"
      @click="changeModule('Fleet Builder')">
      Fleet Builder</RouterLink>-->

      <RouterLink :to="{ path: '/modules/research-agreement-helper'}"
      class="navButton"
      :class="{ activeHeaderButton: globalVariables.activeModule.value === 'Research Agreement Helper' }"
      @click="changeModule('Research Agreement Helper')">
      Research Agreement Helper</RouterLink>

      <RouterLink :to="{ path: '/modules/equipment-encyclopedia'}"
      class="navButton"
      :class="{ activeHeaderButton: globalVariables.activeModule.value === 'Equipment Encyclopedia' }"
      @click="changeModule('Equipment Encyclopedia')">
      Equipment Encyclopedia</RouterLink>

      <RouterLink :to="{ path: '/modules/module-library'}"
      class="navButton" id="lastNavButton"
      :class="{ activeHeaderButton: globalVariables.activeModule.value === 'Module Library' }"
      @click="changeModule('Module Library')">
      Module Library</RouterLink>
      
    </nav>
  </header>

  <div class="view">
    <RouterView/>
  </div>

  <footer>
    <p id="version">Gravity Assist v{{ changelog[changelog.length - 1].version }} by DubNubz</p>
    <div class="links">
      <a href="https://discord.com/invite/9mJ9b2Bbzx" target="_blank"><img src="/discord_icon.png"
          alt="Link to the Radiant Gravity Discord server" id="discord_link"></a>
      <!-- github link -->
    </div>
  </footer>
</template>

<script setup lang="ts">

import { changelog } from './stores/changelog';
import { globalVariables } from './stores/global';

function changeModule (button: string) {
  globalVariables.activeModule.value = button;
}

/* github link
<a href="https://github.com/DubNubz/gravity-assist-app" target="_blank"><img src="/github_icon.png" alt="Link to the Gravity Assist GitHub repo" id="github_link"></a>
*/

</script>

<style scoped>

.title {
  background: linear-gradient(to right, rgba(26, 4, 37, 0.2), rgba(0, 0, 0, 0.2));
  border-radius: 5vh;
  padding: 2vh;
  margin-bottom: 3vh;
  margin-top: 3vh;
}

#gravityAssistTitle {
  margin-bottom: 0;
  margin-top: 0;
}

.links {
  margin-bottom: 1vh;
}

.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
}

.navButtons {
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  justify-content: space-evenly;
}

.navButton {
  background-color: var(--content);
  border: 0;
  height: 5vh;
  transition: all 0.5s;
  color: white;
  text-decoration: none;
  font-family: 'Kanit', sans-serif;
  text-align: center;
  font-size: 2vh;
  width: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5vh;
}

#lastNavButton {margin-bottom: 5vh}

.navButton:hover {
  transform: scale(1.05);
  background-color: var(--lightContent);
}

.activeHeaderButton {
  background-color: var(--lightContent);
  border: var(--deepGreen);
  border-width: 0.5vh;
  transform: scale(1.05);
}

img {
  height: 6vh;
  width: 6vh;
  margin: 0.2vw;
  margin-bottom: 0;
  background-color: var(--transparent);
  border-radius: 3vh;
}

#gravityAssistIcon,
#gravityAssistTitle {
  background-color: rgba(0, 0, 0, 0);
  display: inline-block;
  vertical-align: middle;
}

footer {
  background-color: var(--footer);
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100vw;
  height: 15vh;
  margin-top: 3vh;
}

header {
  display: flex;
  text-align: center;
  position: relative;
  top: 0;
  width: 100vw;
  height: fit-content;
  margin-bottom: 2vh;
  background: linear-gradient(to bottom, var(--darkHeader) 90%, rgba(0, 0, 0, 0));
  align-items: center;
  flex-direction: column;
}

#discord_link,
#github_link {
  height: 6vh;
  width: 6vh;
  margin: 0.2vw;
  margin-bottom: 0;
  background-color: var(--transparent);
  border-radius: 3vh;
}

#homeButton {
  width: 15vh;
}

@media screen and (max-width: 1000px) {
  #homeButton {
    width: 30vh;
  }
}

</style>