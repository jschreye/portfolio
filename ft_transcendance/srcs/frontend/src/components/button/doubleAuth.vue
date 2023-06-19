<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted, onUnmounted, ref} from 'vue';
    import axios from 'axios'
    
    const router = useRouter();
    const store = useStore();
    const componentKey = ref(0);
    let checkCode = '';

    onMounted(async () => {
        if (store.getters.getDoubleAuth == false){
            try {                
                const headers = { Authorization: `Bearer ${store.getters.getToken}` };
                const data1 = {};
                const response = await axios.post("/2fa/generate", data1, {
                    headers,
                    responseType: 'arraybuffer'
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                const UrlQRcode =  URL.createObjectURL(blob);
                store.commit('setQrCode', UrlQRcode);
            } catch (error) {
                store.commit('setError', error);
                router.push('/error');
            }
        }
    });
        
    const doubleAuth = async () => {
        try {                
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {doubleAuth: false};
            const response = await axios.post('/2fa/change', data, {headers});
            store.commit('setDoubleAuth', response.data.doubleAuth);
            alert(response.data.message);
            if (response.data.doubleAuth == false){
                const headers = { Authorization: `Bearer ${store.getters.getToken}` };
                const data1 = {};
                const response = await axios.post("/2fa/generate", data1, {
                    headers,
                    responseType: 'arraybuffer'
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                const UrlQRcode =  URL.createObjectURL(blob);
                store.commit('setQrCode', UrlQRcode);
            }
            forceRender();
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    const checkCodeChan = async () => {
        if (checkCode.length == 6)
        {
            try {
                const headers = { Authorization: `Bearer ${store.getters.getToken}` };
                const data = {
                    doubleAuth: true,
                    code: checkCode,
                };
                const response = await axios.post('/2fa/change', data, {headers})
                store.commit('setDoubleAuth', response.data.doubleAuth);
                alert(response.data.message);
            } catch (error: any) {
                store.commit('setError', error);
                router.push('/error');
            }
        }
    }

    const forceRender = () => {
      componentKey.value += 1;
    }
</script>

<template>
    <div class="doubleAuthButton">
        <div v-if="store.getters.getDoubleAuth == false">
            <div>
                *Pour activer la double authentification veuillez installer Google auth et scanner le QRcode et entrer le code reçu
            </div>
            <img :src="store.getters.getQrCode" alt="qrcode">
            <form class="navButton">
                <input class="navButton" type="text" name="codeChat" autocomplete="off"
                minlength="6" placeholder="code" maxlength="6"
                v-model="checkCode" @keyup="checkCodeChan">
            </form>
        </div>
        <div v-else>            
            <button :key="componentKey" class="navButton" @click="doubleAuth()">
                desactive doubleAuth
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
img{
    max-width: 100px;
    height: 100px;
}
.doubleAuthButton{
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
}
button{
    border-radius: 1px;
    width: auto;
    background-color:aquamarine ;
}
input{
    border: 1px solid #06FFFF;
    border-radius: 3px;
}
</style>