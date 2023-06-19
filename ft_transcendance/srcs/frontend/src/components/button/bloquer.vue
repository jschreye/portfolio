<script setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import {  onMounted, onUnmounted } from 'vue'

    const router = useRouter();
    const store = useStore();
    const user = store.getters.getOneUser;
    let blocked = store.getters.getUserBlocked;

    onMounted(async () => {
        for(let i = 0; i < blocked.length; i++){
            if(blocked[i].blocked_user_id == user.user_user_id){
                store.commit('setBlockBool', true);
                break;
            }
            else{
                store.commit('setBlockBool', false);
            }
        }
    });
    
    const bloquer = async () =>{
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {otherId: user.user_user_id,};
            const response = await axios.post(`/chat/block`, data, {headers});
            store.commit('setUserBlocked', response.data);
            if(store.getters.getBlockBool == true){
                store.commit('setBlockBool', false);
            }
            else{
                store.commit('setBlockBool', true);
            }
            alert(response.data.message);
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
</script>

<template>
    <button class="navButton" @click="bloquer()">
        <div v-if="store.getters.getBlockBool == true">
            debloquer
        </div>
        <div v-else>
            bloquer
        </div>
    </button>
</template>

<style scoped lang="scss">

</style>