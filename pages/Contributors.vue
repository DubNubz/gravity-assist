<template>
    <div class="holder">
        <h1 class="title">Contributors</h1>
        
        <div class="cardHolder">
            <div class="contributorCard" :color="getRandomItemFromArray(colors)" v-for="contributor in credits">
                <h2>{{ contributor.name }}</h2>
                <p class="date">First contribution: {{ contributor.dateAdded }}</p>
                <div class="divider"></div>
                <p style="margin-bottom: 0.75em;" v-for="contribution in contributor.specific">► {{ contribution }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

useSeoMeta({
    title: "Contributors - Gravity Assist",
    description: "View a list of all contributors that have helped shape Gravity Assist!"
})

const colors = ["red", "yellow", "green", "cyan", "pink"];

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    color: transparent;
    background: var(--godlyText);
    background-clip: text;
    width: fit-content;
}

.cardHolder {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 2em;
    width: 95em;
}

.contributorCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 40%;
    padding: 2em;
    border-radius: 2em;
    transition: all 0.15s;
    background-color: rgb(45, 45, 45);

    h2 {
        margin: 0;
        text-align: center;
    }

    p {
        margin: 0;
        text-align: center;
    }
}

.contributorCard[color="red"] {
    h2 {
        color: rgb(255, 20, 20);
    }
    .date {
        color: rgb(255, 87, 87);
    }
}
.contributorCard[color="yellow"] {
    h2 {
        color: rgb(255, 187, 0);
    }
    .date {
        color: rgb(255, 211, 92);
    }
}
.contributorCard[color="green"] {
    h2 {
        color: rgb(0, 255, 115);
    }
    .date {
        color: rgb(96, 255, 168);
    }
}
.contributorCard[color="cyan"] {
    h2 {
        color: rgb(0, 204, 255);
    }
    .date {
        color: rgb(90, 222, 255);
    }
}
.contributorCard[color="pink"] {
    h2 {
        color: rgb(255, 0, 221);
    }
    .date {
        color: rgb(255, 91, 233);
    }
}

.divider {
    width: 100%;
    height: 0.5em;
    background-color: rgba(100, 100, 100, 0.5);
    margin-top: 1.5em;
    margin-bottom: 1.5em;
}

@media screen and (max-width: 1400px) {
    .contributorCardHolder {
        width: 80em;
    }
}

@media screen and (max-width: 1200px) {
    .contributorCardHolder {
        width: 50em;
    }

    .contributorCard {
        width: 45em;
    }
}

@media screen and (max-width: 1000px) {
    .contributorCardHolder {
        width: 43em;
    }

    .contributorCard {
        width: 40em;
    }
}

@media screen and (max-width: 800px) {
    .contributorCardHolder {
        width: 90svw;
    }

    .contributorCard {
        width: 100%;
    }
}

@media (hover: hover) and (pointer: fine) {
    .contributorCard:hover {background-color: rgb(33, 33, 33)}
}

</style>