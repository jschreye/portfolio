<script setup lang="ts">
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import axios from 'axios';
    import {  onUnmounted } from 'vue'
    const store = useStore();
    const router = useRouter();
    const userContext = store.getters.getUserContext;
    const chanContext = store.getters.getChanContext;
    let Pwd = '';
    
    const deleteChan = async () => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.delete(`/chat/del/${chanContext.chanel_chat_id}`,  {headers})
            router.push('/dashBoardChat')
            }catch (error: any) {
              store.commit('setError', error);
              router.push('/error');
            }
    }
    const submmit = async () => {
      if (!userContext.owner){
          alert("YOU ARE NOT A OWNER")
          return ;
      }
      try {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = { chanelId: chanContext.chanel_chat_id, pwd: Pwd};
        const response = await axios.post('/chat/pwd', data,  {headers})
        if(response.status == 201){
          store.commit("setBool", false)
        }
        }catch (error: any) {
          store.commit('setError', error);
          router.push('/error');
        }
  }
  function getBool(){
      store.commit("setBool", true)
      return store.getters.getBool;
  }

</script>

<template>
    <form @submit.prevent="submmit">
      <button class="navButton" @click.prevent="getBool">
        ADD/CHANGE/REMOVE PWD
      </button>
      <div v-if="store.getters.getBool">
        <input class="text" type="text" name="code" autocomplete="off"
        placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
        <button class="navButton" type="submit">
          submit
        </button>
      </div>
    </form>
    <button class="navButton" @click="deleteChan()">
      deleteChan
    </button>
</template>

<style scoped lang="scss">
button{
  width: auto;
  margin: 3px;
}
.text{
  text-align: center;
  background: none;
  width: 80px;
}
input{
    border: 1px solid #06FFFF;
    border-radius: 3px;
}
::placeholder{
  color:aqua;
}
</style>
