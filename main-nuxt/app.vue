<template>
  <div class="holder">
    <header>
      <div class="menuBurger">
        <button @click="showSideMenu = !showSideMenu">
          <img src="/ui/burger.svg" alt="Click to open the navigation menu">
        </button>
      </div>

      <SideMenu class="hideMobile" />
      <div style="width: 0; height: 0;" class="hideMobile"></div>
  
      <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
        <div class="title">
          <img src="/ui/radiant.svg" alt="Gravity Assist Icon">
          <h1>Gravity Assist</h1>
        </div>
      </div>
    </header>

    <Transition name="sideMenuTransition">
      <button v-if="showSideMenu" @click="showSideMenu = false" class="sideMenuBackground">
        <SideMenu />
      </button>
    </Transition>
  
    <div class="pageHolder">
      <div style="width: 0; height: 0;" class="hideMobile"></div>
      <NuxtPage />
    </div>
  
    <footer>
      <div style="width: 0; height: 0;" class="hideMobile"></div>
      <div class="footer">
        <h3>Gravity Assist v{{ changelog[changelog.length - 1].version }} by DubNubz</h3>
        <a href="https://discord.com/invite/9mJ9b2Bbzx" target="_blank">
          <img src="/ui/discord_icon.png" alt="Link to the Radiant Gravity Discord server">
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

const showSideMenu = ref(false);

onMounted(async () => {
  await useFetch('/api/data');
  const data = await useFetch('/api/data');
  shipDataStore().shipData = data.data.value as Ship[];
})

useSeoMeta({
    colorScheme: "dark",
    ogImage: "/ui/radiant.svg"
});

useHead({
  link: [{
    rel: "preload",
    as: "image",
    href: "/ships/constantineTheGreat.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/eternalStorm.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/spearOfUranus.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/st59.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/thunderboltStar.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/ediacaran.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/fsv830.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/cv3000.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/eternalHeavens.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/marshalCrux.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/solarWhale.png"
  }, {
    rel: "preload",
    as: "image",
    href: "/ships/eternalStorm.png"
  }]
});

</script>

<style lang="scss" scoped>

.pageHolder {
  height: 100%;
  width: 100vw;
  display: grid;
  grid-template-columns: 32em calc(100svw - 32em);
}

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
  display: grid;
  grid-template-columns: 32em calc(100vw - 32em);
  bottom: 0;
  width: 100vw;
  height: 10em;
  margin-top: 5em;

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
  }
  
  img {
    width: 5em;
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
  display: grid;
  grid-template-columns: 32em calc(100svw - 32em);
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

@media screen and (min-width: 801px) {
  .menuBurger {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  .pageHolder {
    grid-template-columns: 27em calc(100svw - 27em);
  }

  header {
    grid-template-columns: 27em calc(100svw - 27em);
  }

  footer {
    grid-template-columns: 27em calc(100svw - 27em);
  }
}

@media screen and (max-width: 800px) {
  .pageHolder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hideMobile {
    display: none;
  }

  header {
    display: flex;

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
    display: flex;
    align-items: center;
    justify-content: center;

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
