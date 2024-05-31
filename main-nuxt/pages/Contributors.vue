<template>
    <div class="holder">
        <h1>Contributors</h1>
        
        <div class="crowdsourceCard">
            <h2 style="color: var(--gold);">Module Crowdsourcing</h2>
            <h3 v-for="credit in credits.filter((credit) => credit.title == 'Module Crowdsourcing')"><span>{{ credit.name }}</span>: {{ credit.specific }}</h3>
        </div>

        <div class="cardHolder">
            <div class="card" v-for="credit in credits.filter((credit) => credit.title != 'Module Crowdsourcing')">
                <h2>{{ credit.title }}</h2>
                <h3 v-for="name in credit.name">{{ name }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

useHead({
    title: "Contributors - Gravity Assist",
    meta: [{ name: "description", content: "View a list of all contributors that have helped shape Gravity Assist!" }]
})

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    color: transparent;
    background: var(--godlyText);
    background-clip: text;
    width: fit-content;
}

.crowdsourceCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(100, 100, 100, 0.35);
    padding: 3em;
    border-radius: 3em;
    width: 50em;
    margin-bottom: 3em;
    text-align: center;

    h3 {
        margin: 0.35em;

        span {
            color: var(--cyan);
        }
    }
}

.cardHolder {
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    align-items: center;
    justify-content: center;
    align-items: stretch;
    gap: 5em;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: rgb(36, 36, 36);
    padding: 3em;
    border-radius: 3em;
    width: 30em;
    filter: grayscale(0.2);

    h2 {
        color: var(--gold);
    }

    h3 {
        color: var(--cyan);
        margin: 0.35em;
    }
}

@media screen and (max-width: 800px) {
    .crowdsourceCard {
        width: 90svw;
        padding: 2svw;
        border-radius: 2.5svh;
    }

    .cardHolder {
        gap: 3em;
    }

    .card {
        width: 90svw;
        padding: 2svw;
        border-radius: 2.5svh;
    }
}

</style>