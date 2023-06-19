<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"

    const router = useRouter();
    const store = useStore();

    let newChanel = '';
    let Pwd = '';
    let statuscode = false;

    const submmit = async () => {
        try {
            if (Pwd){
                statuscode = true;
            } 
            else{
                statuscode = false;
            }
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {protected: statuscode, private: false, name: newChanel, pwd: Pwd};
            const response = await axios.post('/chat/create', data,  {headers});
            if(response.data.isCreated == false){
                alert(response.data.msg);
                router.push('dashBoardChat')
                return;
            }
            store.commit("setChanContext", response.data.chanContext);
            const response1 = await axios.get(`/chat/join/${response.data.chanContext.chanel_chat_id}`, {headers});
            store.commit('setUserContext', response1.data);
            router.push('/chat');
            }
        catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

</script>


<template>
       <form class="disp"  @submit.prevent="submmit">
            <input class="navButton" type="text" name="codeChat" autocomplete="off"
            placeholder="Name channel" v-model="newChanel" minlength="3" maxlength="10" required>
            <input class="navButton" type="text" name="code" autocomplete="off"
            placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
            <button class="navButton">
                submit
            </button>
       </form>
</template>

<style scoped lang="scss">

.disp{
    display: flex;
    flex-direction: column;
    align-items: center;
}
button{
    margin-top: 1rem;
    border-radius: 1px;
    width: auto;
    background-color:aquamarine ;
}
input{
    margin: 1rem;
    width: auto;
    text-align: center;
    border: 1px solid #06FFFF;
    border-radius: 3px;
}

</style>