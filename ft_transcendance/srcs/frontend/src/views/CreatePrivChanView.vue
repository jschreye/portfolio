<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"

    const router = useRouter();
    const store = useStore();

    let newChanel = '';
    let TabUserId: {[Key: number]: number} = {};
    const submmit = async () => {
        try {
            let tab = Object.values(TabUserId);
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {protected: false, private: true, name: newChanel, tabUsersId: tab};
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

    function selectUser(userId: number, index: number){
        TabUserId[index] = userId;
    }

    const removeCapsule = (index: any) => {
        const capsule = document.getElementById(`capsule-${index}`);
        if (capsule) {
            capsule.remove();
        }
    }

    const getAllUsers = () => {
      if(store.getters.getAllUsers){
        return store.getters.getAllUsers.allUsers;
      }
      else{
        return [];
      }
    }
</script>

<template>
    <form class="disp" @submit.prevent="submmit">
        <label for="nameChat"></label>
        <input class="navButton" type="text" name="codeChat" autocomplete="off"
            placeholder="Name channel" v-model="newChanel" minlength="3" maxlength="10" required>
        <h1>Select users for invite on this room</h1>
        <div class="users">
            <div class="user" v-for="(user, index) in getAllUsers()" :key="index" :id="`capsule-${index}`">
                <div class="navButton" @click="selectUser(user.user_user_id, index); removeCapsule(index)">
                    {{ user.user_nickname }}
                </div>
            </div>
        </div>
        <button class="navButton">
            submit
        </button>
    </form>
</template>

<style scoped lang="scss">
.users{
    border: 1px solid #06FFFF;
    border-radius: 3px;
    max-width: 15rem;
    max-height: 20rem;
    overflow: auto;
}
.users::-webkit-scrollbar{
  display: none;
}
.navButton{
    width: auto;
}
.disp{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
}
.user{
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
    width: auto;
    text-align: center;
    border: 1px solid #06FFFF;
    border-radius: 3px;
}
h1{
    margin: 1rem;
    text-align: center;
}
</style>