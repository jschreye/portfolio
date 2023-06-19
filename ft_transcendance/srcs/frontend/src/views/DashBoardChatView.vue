<script setup lang="ts">
    import formChanCode from "@/components/form/formChanCode.vue"
    import { useStore } from "vuex"
    import { onMounted, ref, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    
    const store = useStore();
    const router = useRouter();
    const componentKey = ref(0);
    const socket = store.getters.getWebSocket;
    
    onMounted(() => {
        getDashboard();
       // if (!store.getters.getWebSocket)
         //   store.dispatch("initWebSocket");
        if (store.getters.getWebSocket){
            store.getters.getWebSocket.on('dash', async (message: any) => {
                try{
                    const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
                    const response = await axios.get('/chat/all', {headers});
                    store.commit('setChans', response.data);
                    store.commit('setChanId', 0);
                    forceRender();
                }catch (error: any){
                    store.commit('setError', error);
                    router.push('/error');
                }
            });
            store.getters.getWebSocket.emit('dash', 'depart');
        }
    });
    
    const getDashboard = async () => {
        try {
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const response1 = await axios.get("/users/all", {headers});
            store.commit('setAllUsers', response1.data);
            const response = await axios.get('/chat/all', {headers});
            store.commit('setChans', response.data);
            store.commit('setChanId', 0);
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    const  clickChan = async (chan: any) =>{
        try {
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const response = await axios.get(`/chat/join/${chan.chanel_chat_id}`, {headers});
            store.commit('setChanContext', chan);
            store.commit('setUserContext', response.data);
            const UserContext = store.getters.getUserContext;
            if (UserContext.banned){
                alert("YOU ARE BANNED");
                return ;
            }
            if(UserContext.pwd == true){
                store.commit('setChanId', chan.chanel_chat_id);
            }
            else{
                router.push("/chat");
            }
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error'); 
        }
    }

    const forceRender = () => {
      componentKey.value += 1;
    }

    const quitChan = async (chan :any) =>{
        try {            
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const data = {
                chanelId: chan.chanel_chat_id,
            }
            const response = await axios.post(`/chat/quit`, data, {headers});
            store.commit('setChans', response.data);
        } 
        catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
    
    function createChan(){
        router.push('/CreateChan');
    }

    function createPrivChan(){
        router.push('CreatePrivChan')
    }
    
    function createPrivMsg(){
        router.push('/users');
    }

    const getMyChan = () => {
      if(store.getters.getChans){
        return store.getters.getChans.Mychanels;
      }
      else{
        return [];
      }
    }

    const getChan = () => {
      if(store.getters.getChans){
        return store.getters.getChans.chanels;
      }
      else{
        return [];
      }
    }

    const getPwd = () => {
      if(store.getters.getUserContext){
        return store.getters.getUserContext.pwd;
      }
      else{
        return [];
      }
    }

    const getPrivChan = () => {
      if(store.getters.getChans){
        return store.getters.getChans.privMsg;
      }
      else{
        return [];
      }
    }

    onUnmounted(async () => {
        if (store.getters.getWebSocket){
            try {        
                store.getters.getWebSocket.off('dash') //a voir si obligatoire
            } catch (error) {
                store.commit('setError', error);
                router.push('/error');
            }
        }
    });

</script>

<template>
    <div  class="dashboard">
        <div class="dashboard__section__createChan">
                <button class="navButton" @click="createChan()">
                    create room
                </button>
                <button class="navButton" @click="createPrivChan()">
                    creat private room
                </button>
                <button class="navButton" @click="createPrivMsg()">
                    creat private message
                </button>
        </div>
        <div class="dashboard__section">
            <div class="display">
                <h1>My channel</h1>
                <div class="liste-chan" v-for="(chanPublicJoined, index) in getMyChan()" :key="index">
                    <button :key="componentKey" class="navButton" @click="clickChan(chanPublicJoined)">
                        {{ chanPublicJoined.chanel_name }}
                    </button>
                    <button class="navButton" @click="quitChan(chanPublicJoined)">
                        quit room
                    </button>
                </div>
            </div>
            <div class="display">
                <h1>Other channel</h1>
                <div class="liste-chan" v-for="(chanPublicNotJoined, index) in getChan()" :key="index">
                    <button :key="componentKey" class="navButton" @click="clickChan(chanPublicNotJoined)">
                        {{ chanPublicNotJoined.chanel_name }}
                    </button>
                    <formChanCode v-if="getPwd() == true && store.getters.getChanId == chanPublicNotJoined.chanel_chat_id" />
                </div>
            </div>
            <div class="display">
                <h1>PrivMsg</h1>
                <div class="liste-chan" v-for="(chanPrivate, index) in getPrivChan()" :key="index">
                    <button :key="componentKey" class="navButton" @click="clickChan(chanPrivate)">
                        {{ chanPrivate.users_nickname }}
                    </button>
                    <button class="navButton" @click="quitChan(chanPrivate)">
                        quit room
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dashboard{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-top: 3rem;
}
.dashboard__section__createChan{
    display: flex;
    justify-content: space-evenly;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
}
.dashboard__section{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.display{
    display: flex;
    flex-direction: column;
    overflow: scroll;
    margin: 0.5rem;
    margin-top: 1rem;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    min-height: 30rem;
    max-height: 30rem;
}
.display::-webkit-scrollbar {
    display: none;
}
.liste-chan{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    min-height: 2rem;
}
h1{
    margin-bottom: 1rem;
    min-height: 2rem;
}
button{
    margin: 0.2rem;
    border-radius: 2px;
    width: auto;
    background-color:aquamarine ;
}
@media screen and (max-width: 700px) {
    .dashboard__section {
        flex-direction:column;
        overflow-y: scroll;
        height: 500px;
    }
    .dashboard__section::-webkit-scrollbar {
        display: none;
    }
}

</style>