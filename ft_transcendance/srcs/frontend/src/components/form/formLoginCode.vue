<script setup lang="ts">
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { useStore } from "vuex"
  import getAvatar from '../../getAvatar'

  const router = useRouter();
  const store = useStore();
  let code = '';

  const checkCode = async () => {
    if (code.length == 6)
    {
      try {
        let nickname = store.getters.getNickname;
        const response = await axios.post("/2fa/authenticate", {code: code, nickname: nickname});
        if (response.status == 201){
          store.commit('setId', response.data.user.user_id);
          store.commit('setNickname', response.data.user.nickname);
          store.commit('setToken',  response.data.accessToken);
          let url = await getAvatar(store, response.data.user.user_id);
          store.commit('setAvatar', url);
          store.commit('setCode',  false);
          store.dispatch('initWebSocket');
          const headers = { Authorization: `Bearer ${store.getters.getToken}` };
          const res = await axios.get("/chat/blocked", {headers});
          store.commit('setUserBlocked', res.data);
          router.push("/");
        }
      } catch (error: any) {
        store.commit('setError', error);
        router.push('/error');
      }
    }
  }

</script>

<template>
    <form class="navButton">
        <input class="navButton" type="text" name="code" autocomplete="off"
        minlength="6" placeholder="code"
        v-model="code" @keyup="checkCode">
    </form>
</template>

<style scoped lang="scss">
input{
    border: 1px solid #06FFFF;
    border-radius: 3px;
}
</style>