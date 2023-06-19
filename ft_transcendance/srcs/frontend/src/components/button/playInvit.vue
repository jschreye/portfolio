<script setup lang="ts">
    import router from "@/router";
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;  
    const socket = store.getters.getWebSocket;

    const play = async () =>{
        try {            
            socket.emit('notif', store.getters.getOneUser.user_user_id, "invite");
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
</script>

<template>
    <button class="navButton" @click="play()">
        play
    </button>
</template>

<style scoped lang="scss">

</style>