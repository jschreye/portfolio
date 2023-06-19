<script setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();
    const maxImg = 1024
    let nickname = store.getters.getNickname;

    function getAvatarStore(){
        return store.getters.getAvatar;
    }
    const fileUpload = async (event: any) => {
        const file = event.target.files[0];
        if (file.size > maxImg * 1024) {
            alert("L'image sélectionnée est trop grande. Veuillez choisir une image plus petite.");
            event.target.value = ''; // Réinitialiser la valeur de l'entrée de fichier
            return;
        }
        const avatar = URL.createObjectURL(file);
        if (store.getters.getAvatar != avatar)
        {
            try {
                const formData = new FormData();
                formData.append("avatar", file);
                const headers = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${store.getters.getToken}`
                };
                const response = await axios.post('/profile/modify/avatar',
                formData,
                { headers }
                );
                if (response.status == 201)
                {
                    store.commit('setAvatar', avatar);
                }
            } catch (error: any) {
                store.commit('setError', error);
                router.push('/error');
            }
        }
    }
    const nicknameUpload = async () => {
        if (store.getters.getNickname != nickname){
            try {
                const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
                const data = {nickname: nickname};
                const response = await axios.post('profile/modify/nickname', data, {headers})
                if (response.data == "Your nickname is changed")
                {
                    alert(response.data)
                    store.commit('setNickname', nickname);
                    router.push('/Profile/me')
                }
                else{
                    alert(response.data.message)
                }
            } catch (error: any) {
                store.commit('setError', error);
                router.push('/error');
            }
        }
    }
</script>

<template>
        <form class="formModifProfile" @submit.prevent="nicknameUpload">
            <span>
                modif
            </span>
            <div>
                <label class="file-select">
                    <div class="select-button">
                        <img :src="getAvatarStore()" v-if="getAvatarStore()"/>
                    </div>
                    <input accept="image/.jpeg,image/.png" maxlength="500000" type="file" ref="file" @change="fileUpload($event)"/>
                </label>
            </div>
            <div class="submit">
                <input class="navButton" type="text" name="Nickname" placeholder="Nickname" autocomplete="off" minlength="3" maxlength="10" required v-model="nickname">
                <button class="navButton">
                    submit
                </button>
            </div>
        </form>
</template>

<style scoped lang="scss">
.formModifProfile{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
}
button{
    width: auto;
    border-radius: 1px;
    background-color:aquamarine ;
}
img{
    max-width: 100px;
    height: 100px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: none;
}
.file-select > input {
    display: none;
}
input{
    border: 1px solid #06FFFF;
    border-radius: 3px;
    color:aqua;
}
</style>