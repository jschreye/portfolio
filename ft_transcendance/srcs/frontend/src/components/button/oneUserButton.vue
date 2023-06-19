<script setup lang="ts">
    import router from '@/router'
    import getAvatar from '../../getAvatar'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import axios from 'axios';

    const store = useStore();
    
    const userContext = store.getters.getUserContext;
    const chanContext = store.getters.getChanContext;
    let length = 0;
    
    onMounted(async () => {
        await fetchData();
    });

    function click(data: any){
        store.commit('setOneUser', data);
        router.push('/Profile/user');
    }

    async function fetchData(){
        if(store.getters.getWhat === 'all'){
            const user = store.getters.getAllUsers.allUsers;
            const length = user.length;
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
            store.commit('setUsers', store.getters.getAllUsers.allUsers);
        }
        else if(store.getters.getWhat === 'friends'){
            const user = store.getters.getAllUsers.myFriends;
            if (user.length){
                length = user.length;
            }
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
            store.commit('setUsers', store.getters.getAllUsers.myFriends);
        }
        else if (store.getters.getWhat === 'UsersInChan'){
            const user = store.getters.getUsers;
            if(user){
                for (let index = 0; index < user.length; index++) {
                    await pushAvatarUrl(user[index].user_user_id)
                }
            }
        }
    }

    async function pushAvatarUrl(userId: any){
        try {
            const url = await getAvatar(store, userId);
            store.commit('setArrayAvatar', { item: url, index: userId});
        } 
        catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    const muted = async (userId: number) =>{
        try {            
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {
                otherId: userId,
                chanelId: chanContext.chanel_chat_id,
            }
            const response = await axios.post(`/chat/mute`, data,  {headers})
            if (response.data.muted == false){
                router.push('/chat')
                alert(response.data.message);
            }
            else{
                router.push('/chat')
                alert(response.data.message);
            }
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

    const banned = async (userId: number) =>{
        try {            
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {
                otherId: userId,
                chanelId: chanContext.chanel_chat_id,
            }
            const response = await axios.post(`/chat/bann`, data,  {headers})
            if (response.data.ban == false){
                router.push('/chat')
                alert(response.data.message);
            }
            else{
                router.push('/chat')
                alert(response.data.message);
            }
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
        
    const kick = async (userId: number) =>{
        try {            
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {
                otherId: userId,
                chanelId: chanContext.chanel_chat_id,
            }
            const response = await axios.post(`/chat/kick`, data,  {headers})
            if (response.data.kick == false){
                router.push('/chat')
                alert(response.data.message);
            }
            else{
                router.push('/chat')
                alert(response.data.message);
            }
        } catch (error: any) {
            store.commit('setError', error);
            router.push('/error');
        }
    } 

    const admin = async (userId: number) =>{
        try {            
            if (!userContext.owner || !userContext.admin){
                alert("YOU ARE NOT OWNER OR ADMIN")
                return ;
            }
            else{
                const headers = { Authorization: `Bearer ${store.getters.getToken}` };
                const data = {
                    otherId: userId,
                    chanelId: chanContext.chanel_chat_id,
                }
               const response = await axios.post(`/chat/admin`, data,  {headers})
                if (response.data.admin == false){
                    router.push('/chat')
                    alert(response.data.message);
                }
                else{
                    router.push('/chat')
                    alert(response.data.message);
                }
            }
        } catch (error:any) {
            store.commit('setError', error);
            router.push('/error');
        }
    }

</script>

<template>
    <div class="card" v-for="(data ,index) in store.getters.getUsers" :key="index" >
        <div class="avatar">
            <button 
                class="img"
                @click="click(data)"
                v-if="store.getters.getArrayAvatar(data.user_user_id)"
                :style="{ 'background-image': 'url(' + store.getters.getArrayAvatar(data.user_user_id) + ')'}">
                <img :src="store.getters.getArrayAvatar(data.user_user_id)" />
            </button>
            <div class="name">
                {{ data.user_nickname }}
            </div>
        </div>
        <div class="ownerButton" v-if="userContext.owner || userContext.admin">
            <button class="navButton" @click="kick(data.user_user_id)">
                kick
            </button>
            <button class="navButton" @click="muted(data.user_user_id)">
                mute
            </button>
            <button class="navButton" @click="banned(data.user_user_id)">
                ban
            </button>
            <button class="navButton" @click="admin(data.user_user_id)">
                admin
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.img{
  max-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: none;
  margin: 5px;
}
img{
    display: none;
}
.card{
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 0.5rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 10rem;
    max-height: 10rem;
    min-height: 7rem;
    margin: 0.3rem;
}
.avatar{
    display: flex;
    align-items: center;
    justify-content:space-evenly;
    word-wrap: break-word;
}
.ownerButton{
    display: flex;
    justify-content: center;
    border-top: 1px solid #06FFFF;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
}
.card:hover {
    opacity: 1;
}
button{
    font-size: xx-small;
}
</style>