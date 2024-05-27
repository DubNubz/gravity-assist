<template>
    <div>
        <h1>Error: redirect to "/home" failed</h1>
    </div>
</template>

<script setup lang="ts">

onMounted(() => {
    useRouter().push("/home");
});

</script>

<style scoped>

</style>