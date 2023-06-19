<script setup lang="ts">
    import navButtonLogin from "../components/button/navButtonLogin.vue"
    import formLoginCode from '../components/form/formLoginCode.vue';
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import getAvatar from '../getAvatar'

    const router = useRouter();
    const store = useStore();
    let code: any = null;

    onMounted(() => {
        checkCode();
    });

    const welcome = async (code: any) => {
        try {
            const response = await axios.post('/auth/wellcome', {code: code});
            if (response.data.doubleAuth == true) {
                store.commit('setDoubleAuth', true);
                store.commit('setCode',  true);
                store.commit('setNickname', response.data.nickname);
            }
            else {
                store.commit('setDoubleAuth',  false);
                store.commit('setId', response.data.user.user_id);
                store.commit('setNickname', response.data.user.nickname);
                store.commit('setToken',  response.data.accessToken);
                let url = await getAvatar(store, response.data.user.user_id);
                store.commit('setAvatar', url);
                store.dispatch('initWebSocket');
                const headers = { Authorization: `Bearer ${store.getters.getToken}` };
                const res = await axios.get("/chat/blocked", {headers});
                store.commit('setUserBlocked', res.data);
                router.push('/');
            }

        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    const checkCode = async () => {
        await router.isReady();
        code = router.currentRoute.value.query.code;
        if (code) {
            welcome(code);
        }
    }

    async function clicklogin(){
        window.location.href = (import.meta.env.VITE_APP_API_42);
    }

    function getToken() {
        const token = store.getters.getToken;
        if (token)
        return token;
    }
</script>

<template>
    <div>
        <navButtonLogin v-if="!getToken()" @click="clicklogin()"/>
        <formLoginCode  v-if="store.getters.getCode == true"/>
        <div id="msg" v-if="getToken()">
           Bienvenu sur ft_trantran
        </div>
    </div>
</template>

<style scoped lang="scss">

div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5vh;
}

#msg{
    margin-top: 60px;
}

</style>