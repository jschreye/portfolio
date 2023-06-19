<script setup lang="ts">
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    const router = useRouter();
    const store = useStore();
    let checkCode = '';
    const chanContext = store.getters.getChanContext;

  const checkCodeChan = async () => {
        if (checkCode.length == 4)
        {
            try {
                const headers = { Authorization: `Bearer ${store.getters.getToken}` };
                const data = {
                  checkCode: checkCode,
                  chanId: chanContext.chanel_chat_id,
                }
                const response = await axios.post("/chat/code", data, {headers});
                if(response.data === true){
                    router.push("/chat");
                }
                else{
                    alert('PWD invalid');
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
      <input class="navButton" type="text" name="codeChat" autocomplete="off"
        minlength="4" placeholder="code"
        v-model="checkCode" @keyup="checkCodeChan">
    </form>
</template>

<style scoped lang="scss">
input{
    border: 1px solid #06FFFF;
    color: white;
    border-radius: 3px;
}
</style>