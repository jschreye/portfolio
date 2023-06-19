<script  setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();

    onMounted(async () => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.get(`/users/match-history/${store.getters.getOneUser.user_user_id}`, {headers});
            store.commit('setMatchHistory', response.data);
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    });
</script>

<template>
    <h1>Match history</h1>
    <div class="info" v-for="(match, index) in store.getters.getMatchHistory" :key="index">
        Partie: {{ index + 1}} du {{ match.match_date }}<br/> {{ match.player1_nickname }} vs {{ match.player2_nickname }} <br/>score: {{ match.match_score }}      
    </div>
</template>

<style scoped lang="scss">
.info{
    border: 1px solid rgba(79, 200, 209, 0.94);
    border-radius: 3px;
    padding: 5px;
    width: 11rem;
    margin: 2px;
}
</style>