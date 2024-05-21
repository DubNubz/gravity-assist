<template>
    <div class="holder">
        <div class="description">
            <h3>by <a href="https://discord.com/invite/9mJ9b2Bbzx">DubNubz</a></h3>
            <h3>Did you know: <span>{{ fact }}</span></h3>
        </div>

        <LatestChange />
    </div>
</template>

<script setup lang="ts">

const fact = facts[getRandomIntInclusive(0, facts.length - 1)];

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70vw;

    h3 {
        color: white;
        text-align: center;
        margin: 0.25em;
        width: 70%;

        a {
            color: var(--deepGreen);
        }

        span {
            color: var(--gold);
            font-size: 0.75em;
        }
    }
}

.linkButton {
    margin-top: 3em;
    width: 35em;
    font-size: var(--p);
    height: 6em;
    border-radius: 1.5em;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    filter: grayscale(0.33);
    background-color: var(--deepGreen);
  
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

@media (hover: hover) and (pointer: fine) {
    .linkButton:hover {
        filter: grayscale(0);
    }
}

</style>