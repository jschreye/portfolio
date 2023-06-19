<script setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();
    const user = store.getters.getOneUser;

    const friendRequest = async () => {
        try {            
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {id: user.user_user_id};
            const response = await axios.post('/users/friend-request', data, {headers})
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
</script>

<template>
    <button class="navButton" @click="friendRequest()">
        Friends request
    </button>
</template>

<style scoped lang="scss">

</style>