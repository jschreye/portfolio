<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';
    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;
    
    const confirmNotif = async () => {
        try {            
            if (store.getters.getMsg == "invite"){
                const userConfirmed = confirm("Voulez-vous jouer avec cette personne?")
                if(userConfirmed){
                    socket.emit('notif', store.getters.getNameNotif, "reponse", "positif");
                    store.commit('setName', store.getters.getNameNotif);
                    store.commit('setNameNotif', "");
                    store.commit('setAcceptPlay', true);
                    store.commit('setMatchmaking', false);
                    router.push('/Play/start');
                }
                else{
                    socket.emit('notif', store.getters.getNameNotif, "reponse", "negatif");
                    store.commit('setAcceptPlay', false);
                    store.commit('setNameNotif', "");
                    alert('You declined the invite');
                    return ;
                }
            }
            else if (store.getters.getMsg == "accepted"){
                store.commit('setName', store.getters.getNameNotif);
                store.commit('setNameNotif', "");
                store.commit('setMsg', null);
                store.commit('setMatchmaking', false);
                router.push('/Play/start');
            }
            else if (store.getters.getMsg == "refused"){
                store.commit('setNameNotif', "");
                return ;
            }
            else if (store.getters.getMsg == "offLine") {
                alert('The player is disconnected or offline')
                store.commit('setNameNotif', "");
                return ;
            }
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
</script>

<template>
    <button class="Button" @click="confirmNotif()">
        <p v-if="store.getters.getMsg == 'refused' && store.getters.getMsg != null">
            {{ store.getters.getNameNotif }} refused your invite
        </p>
        <p v-else-if="store.getters.getMsg != 'accepted' && store.getters.getMsg != 'offLine'">
            {{ store.getters.getNameNotif }} invites you to a party
        </p>
        <p v-else-if="store.getters.getMsg != 'accepted' && store.getters.getMsg == 'offLine'">
            {{ store.getters.getNameNotif }} You cannot play!
        </p>
        <p v-else="store.getters.getMsg == 'accepted' && store.getters.getMsg != null">
            {{ store.getters.getNameNotif }} accepted your invite
        </p>
    </button>
</template>

<style scoped lang="scss">
p{
    color: rgb(0, 255, 247);
}

.Button{
    width: auto;
    height: auto;
    background: none;
    background-color: none;
    border-radius: 3px;
    margin: 3px;
    border: none;
    float: right;
    animation: pulse 1s infinite;
    box-shadow: 0 0 30px rgba(0, 233, 177, 1);
}
.Button:hover{
	border: 1px solid aqua;
	border-radius: 3px;   
}

@keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(9, 176, 181, 0.7);
    }
    100% {
      box-shadow: 0 0 0 10px rgba(0, 233, 177, 0);
    }
  }

</style>