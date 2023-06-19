<script  setup lang="ts">
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();
</script>

<template>
    <h1>{{ store.getters.getError }}</h1>
</template>

<style scoped lang="scss">

</style>