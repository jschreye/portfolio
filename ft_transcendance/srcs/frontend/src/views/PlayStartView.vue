<script setup lang="ts">
    import pong from "@/components/pong/pong.vue";
    import customPong from "@/components/pong/customPong.vue";
    import { useStore } from 'vuex';

    const store = useStore(); 
</script>

<template>
    <div class="game">
        <customPong v-if="store.getters.getPlayStart == false"/>
        <pong v-else/>
    </div>
</template>

<style scoped lang="scss">
.game{
    margin-top: 3rem;
}
</style>