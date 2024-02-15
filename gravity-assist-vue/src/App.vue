<template>
  <header class="darkHeader" id="header">
    <div class="title">
      <img src="/radiant1-removebg-preview.png" alt="Gravity Assist Icon" id="gravityAssistIcon">
      <h1 id="gravityAssistTitle">Gravity Assist</h1>
    </div>
    <div class="navButtons">
      <RouterLink :to="{ path: '/'}" class="navButton activeHeaderButton">Home</RouterLink>
      <RouterLink :to="{ path: '/modules/color-generator'}" class="navButton">Color Generator</RouterLink>
      <RouterLink :to="{ path: '/modules/research-agreement-helper'}" class="navButton">Research Agreement Helper</RouterLink>
      <RouterLink :to="{ path: '/modules/module-library'}" class="navButton">Module Library</RouterLink>
    </div>
  </header>

  <div class="view">
    <RouterView/>
  </div>

  <footer>
    <p id="version">Gravity Assist v{{ changelog[changelog.length - 1].version }} by DubNubz</p>
    <div class="links">
      <a href="https://discord.com/invite/9mJ9b2Bbzx" target="_blank"><img src="/discord_icon.png"
          alt="Link to the Radiant Gravity Discord server" id="discord_link"></a>
      <a href="https://github.com/DubNubz/gravity-assist-app" target="_blank"><img src="/github_icon.png"
          alt="Link to the Gravity Assist GitHub repo" id="github_link"></a>
    </div>
    This site is not affiliated to, associated with, or authorized by NetEase or Infinite Lagrange. 
    The use of any trademark is for reference purposes only and all rights belong to their respective owners.
  </footer>
</template>

<script setup>

import { changelog } from './stores/changelog';

</script>

<style scoped>

.view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navButtons {
  display: flex;
  flex-wrap: wrap;
  width: 70vw;
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
}

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
  height: 18vh;
  margin-top: 3vh;
}

header {
  display: flex;
  text-align: center;
  position: relative;
  top: 0;
  width: 100vw;
  height: 23vh;
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

@media screen and (max-width: 1520px) {
  header {
    height: 30vh;
  }
}

@media screen and (max-width: 816px) {
  header {
    height: 40vh;
  }
}

</style>