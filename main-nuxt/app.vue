<template>
  <div class="holder">
    <head>
      <link rel="icon" href="/ui/radiant.svg">
    </head>

    <header>
      <div class="menuBurger">
        <button @click="showSideMenu = !showSideMenu">
          <img src="/ui/burger.svg" alt="Click to open the navigation menu">
        </button>
      </div>
  
      <div class="title">
        <img src="/ui/radiant.svg" alt="Gravity Assist Icon">
        <h1>Gravity Assist</h1>
      </div>
    </header>

    <Transition name="sideMenuTransition">
      <button v-if="showSideMenu" @click="showSideMenu = false" class="sideMenuBackground">
        <div class="sideMenu">
          <NuxtLink to="/home" class="sideMenuButton" :class="{ active: route.path == '/home' }" style="margin-top: 3em;">
            <img src="/ui/home.svg" alt="Click to go back to the original landing page">
            <h3>Home</h3>
          </NuxtLink>
          <NuxtLink to="/modules/color-generator" class="sideMenuButton" :class="{ active: route.path == '/modules/color-generator' }">
            <img src="/ui/paint.svg" alt="Click to go to the Color Generator page">
            <h3>Color Generator</h3>
          </NuxtLink>
          <NuxtLink to="/modules/research-agreement-helper" class="sideMenuButton" :class="{ active: route.path == '/modules/research-agreement-helper' }">
            <img src="/ui/atom.svg" alt="Click to go to the Research Agreement Helper page">
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
            <img src="/ui/blueprint.svg" alt="Click to go to the Fleet Builder page">
            <h3>Fleet Builder</h3>
          </NuxtLink>
        </div>
      </button>
    </Transition>
  
    <NuxtPage />
  
    <footer>
      <div class="footerButtons">
        <NuxtLink to="/contributors" class="linkButton creditsButton">
          <img src="/ui/credits.svg" alt="View a list of all contributors to this project">
          <h3>Contributors</h3>
        </NuxtLink>
        <NuxtLink to="/changelog" class="linkButton loadButton">
          <img src="/ui/changes.svg" alt="View a list of all changes made to this project">
          <h3>Changelog</h3>
        </NuxtLink>
      </div>
      <h3>Gravity Assist v{{ changelog[changelog.length - 1].version }} by DubNubz</h3>
      <a href="https://discord.com/invite/9mJ9b2Bbzx" target="_blank">
        <img src="/ui/discord_icon.png" alt="Link to the Radiant Gravity Discord server">
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const showSideMenu = ref(false);

</script>

<style lang="scss" scoped>

.holder {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer {
  background-color: rgb(36, 36, 36);
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25em;
  margin-top: 5em;
  
  img {
    width: 6em;
    margin-bottom: 0;
    background-color: transparent;
  }

  .footerButtons {
    width: 75em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
  }
  
  .linkButton {
    width: 45%;
    font-size: var(--p);
    height: 6em;
    border-radius: 1.5em;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    background-color: rgb(220, 220, 220);
  
    h3 {
      margin: 0;
      text-align: center;
      width: fit-content;
      height: fit-content;
      font-size: var(--h3);
    }
  
    img {
      width: 4.5em;
      height: 4.5em;
      background-color: transparent;
    }
  }
}

header {
  display: flex;
  text-align: center;
  position: relative;
  top: 0;
  width: 100vw;
  height: fit-content;
  margin-bottom: 2em;
  align-items: center;
  flex-direction: column;

  .title {
    background: linear-gradient(to bottom right, rgb(65, 9, 40), rgb(47, 11, 65));
    border-radius: 5em;
    padding-left: 3em;
    padding-right: 3em;
    margin-top: 2em;
    gap: 1.5em;
    height: 12em;
    display: flex;
    align-items: center;
    justify-content: center;
  
    h1 {
      margin-bottom: 0;
      margin-top: 0;
    }
  
    img {
      width: 10em;
    }
  
    h1, img {
      background-color: transparent;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.menuBurger {
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.35s ease-in-out;
  z-index: 51000;

  button {
    background-color: transparent;
    border: 0;
  }

  img {
    width: 7em;
  }
}

.sideMenuBackground {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
  border: 0;
  z-index: 50000;
}

.sideMenu {
  background-color: rgb(36, 36, 36);
  width: 35em;
  height: calc(100% - 7em);
  position: fixed;
  top: 7em;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-right-radius: 3em;

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
  }

  .active {
    background-color: rgba(100, 100, 100, 0.25);
  }
}

.sideMenuTransition-enter-active, .sideMenuTransition-leave-active {
    transition: all 0.5s ease-in-out;
    
    .sideMenu {
        transition: all 0.25s ease-in-out;
    }
}

.sideMenuTransition-enter-from, .sideMenuTransition-leave-to {
    opacity: 0;

    .sideMenu {
        transform: translate(-30px);
        opacity: 0.001;
    }
}

@media screen and (max-width: 1200px) {
  footer .footerButtons {
    width: 60em;
  }
}

@media screen and (max-width: 800px) {
  header {
    .title {
      padding-left: 0;
      padding-right: 0;
      border-radius: 5svw;
      gap: 0;
      height: 8svh;
      padding: 3svw;

      h1 {
        display: none;
        font-size: 0;
      }

      img {
        width: 10svh;
      }
    }
  }

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

  footer {
    .footerButtons {
      width: 90svw;
    }

    .linkButton {
      width: 40%;

      h3 {
        display: none;
        font-size: 0;
      }
    }
  } 
}

@media (hover: hover) and (pointer: fine) {
  .linkButton:hover {
    background-color: rgb(255, 255, 255);
  }

  .sideMenuButton:hover {
    background-color: rgba(100, 100, 100, 0.35);
  }

  .menuBurger:hover {
    transform: scale(1.2);
  }
}

</style>
