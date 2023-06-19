
<script setup lang="ts">
    import axios from "axios";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;

    function goMatchmaking(){
        store.commit('setMatchmaking', true);
        router.push('/Play/start');
    }

    const submit = async () => {
        try {            
            const headers = { Authorization: `Bearer ${store.getters.getToken}`};
            const response = await axios.get("/users/all", {headers});
            store.commit('setUsers', response.data.allUsers)
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    const play = async (userId: number) =>{
        try {
            socket.emit('notif', userId, "invite");
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
</script>

<template>
    <div class="playButtonContainer">
        <div class="playButton">
            <button class="playButton" id="InviteFriends" @click="goMatchmaking()">
                Matchmaking
            </button>
        </div>
        <button class="playButton" @click="submit">
            InviteFriends
        </button>
        <div class="playUsers">
            <div  v-for="(user, index) in store.getters.getUsers">
                <button class="playUsers" v-if="user.user_isActive == 1" @click="play(user.user_user_id)">
                    {{ user.user_nickname }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playButtonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh; /* Assure que le conteneur occupe la hauteur de la fenêtre */
}
.playButton {
    width: auto;
    margin: 10px;
    align-items: center;
    justify-content: center;
    color: darkcyan;
    background: none;
    border: none;
    font-size: large;
    letter-spacing: 1.5px;
    cursor: pointer;
}
.playButton:hover {
    color: #e6e6e6;
}
.playUsers{
    width: auto;
    margin: 3px;
    max-height: 200px;
    text-align: center;
    color: darkcyan;
    background: none;
    border: none;
    font-size: large;
    letter-spacing: 1.5px;
    cursor: pointer;
    overflow: auto;
}
.playUsers::-webkit-scrollbar{
    display: none;
}
.playUsers:hover {
    color: #e6e6e6;
}
</style>