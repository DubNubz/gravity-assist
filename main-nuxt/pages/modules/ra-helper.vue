<template>
    <div class="holder">
        <div class="navButtonHolder">
            <button>
                <img src="/openBook.svg" alt="Click to freely browse through all Research Agreement paths">
                <h3>Browse</h3>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.holder {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.navButtonHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100em;

    button {


        img {
            width: 6em;
        }
    }
}

</style>