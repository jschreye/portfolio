<script setup lang="ts">
    import userButtonAll from "../components/button/userButtonAll.vue"
    import userButtonFriends from "../components/button/userButtonFriends.vue"
    import oneUserButton from "../components/button/oneUserButton.vue"
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'

    const router = useRouter();
    const store = useStore();

    function clickCheckWhat(what: string){
        if(what == 'all'){
            store.commit('setWhat', what);
        }
        else if(what == 'friends'){
            store.commit('setWhat', what);
        }
    }
        
    onMounted(async () => {
        try {
            store.commit('setUserContext', []);
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.get("/users/all", {headers});
            store.commit('setAllUsers', response.data);

        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    });

</script>

<template>
    <div id="mainUsers">
        <div class="navUser">
            <userButtonAll @click="clickCheckWhat('all')"/>
            <userButtonFriends @click="clickCheckWhat('friends')"/>
        </div>
        <div class="userDisplay">
            <oneUserButton v-if="store.getters.getWhat == 'all'"/>
            <oneUserButton v-if="store.getters.getWhat == 'friends'"/>
        </div>
    </div>
  </template>

<style scoped lang="scss">
#mainUsers{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
}
.navUser{
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    height: 1.25rem;
}
.userDisplay{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 500px;
    max-height: 500px;
    overflow: auto;
}
.userDisplay::-webkit-scrollbar{
  display: none;
}
</style>