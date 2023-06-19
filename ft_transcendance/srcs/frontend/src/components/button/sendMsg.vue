<script setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();
    const user = store.getters.getOneUser;
    const SendMsg = async() =>{
        try{
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {direct: true, name: "", otherId: user.user_user_id};
            const response = await axios.post('/chat/create', data,  {headers});
            store.commit("setChanContext", response.data.chanContext);
            const response1 = await axios.get(`/chat/join/${response.data.chanContext.chanel_chat_id}`, {headers});
            store.commit('setUserContext', response1.data);
            router.push('/chat');
        }catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
</script>

<template>
    <button class="navButton" @click="SendMsg()">
        sendMsg
    </button>
</template>

<style scoped lang="scss">

</style>