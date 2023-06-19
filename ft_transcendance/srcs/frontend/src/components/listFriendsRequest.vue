<script setup lang="ts">
    import { useStore } from "vuex"
    import axios from 'axios'
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();
    
    const removeCapsule = (pending: any) => {
        const capsule = document.getElementById(`capsule-${pending.id}`);
        if (capsule) {
            capsule.remove();
        }
    }
    const friendsValidate = async (userId: number, decision: boolean) => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {
                id: userId,
                decision: decision
            };
            const response = await axios.post('/users/friend-accept', data, {headers})
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    function getMyFriends(){
        const me = store.getters.getMe;
        if (me)
            return me.pending;
    }
</script>

<template>
    <div v-for="(pending, index) in getMyFriends()" :key="index" :id="`capsule-${pending.id}`">
        <div>
            {{ pending.user_nickname}} vous demande en amis<!--trouver le tableau de friends-request?-->
        </div>
        <button class="navButton" @click="friendsValidate(pending.user_user_id, true); removeCapsule(pending)">
            oui je le veux
        </button>
        <button class="navButton" @click="friendsValidate(pending.user_user_id, false); removeCapsule(pending)">
            non je ne le veux pas
        </button>
    </div>
</template>

<style scoped lang="scss">
button{
    margin: 0.2em;
    width: auto;
    border-radius: 1px;
    background-color:aquamarine ;
}
</style>