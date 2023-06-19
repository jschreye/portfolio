<script setup lang="ts">
    import oneUserButton from "../components/button/oneUserButton.vue"
    import formChangePwdChat from '../components/form/formChangePwdChat.vue'
    import chatPrompt from "@/components/chat/chatPrompt.vue";
    import chatHistory from "@/components/chat/chatHistory.vue"
    import { onMounted, ref, onUnmounted } from 'vue';
    import { useStore } from "vuex"
    import axios from 'axios';
import router from "@/router";

    const store = useStore();
    const chatMessages = ref<any[]>([]);
    const socket = store.getters.getWebSocket;
    const componentKey = ref(0);
    const userBlocked = store.getters.getUserBlocked;
    store.commit("setBool", false);

    function addMessage(message: any) {
      chatMessages.value.push(message);
      const lastMessageAnchor = document.getElementById('to-last-message');
      if(lastMessageAnchor){
        lastMessageAnchor.scrollIntoView({ behavior: 'smooth' });

        const url = new URL(window.location.href);
        url.hash = lastMessageAnchor.id;
        history.replaceState(null, '', url.toString());
      }
    }

    onMounted(async () => {
      if (store.getters.getWebSocket){
        try {
          const headers = { Authorization: `Bearer ${store.getters.getToken}`};
          const response = await axios.get(`/chat/users/${store.getters.getChanContext.chanel_chat_id}`, {headers});
          store.commit('setWhat', 'UsersInChan');
          store.commit("setUsers", response.data.users);
          const chatHistory = await axios.get(`/chat/history/${store.getters.getChanContext.chanel_chat_id}`,  {headers});
          store.commit("setChatHistory", chatHistory.data.history);
          store.getters.getWebSocket.on('join', (message: any) => {
            addMessage(message);
          });
          store.getters.getWebSocket.emit('join', `${store.getters.getChanContext.chanel_chat_id}`, true);
          store.getters.getWebSocket.on('chat', (message: any) => {
            let i = 0
              for (i ; i < userBlocked.length;)
              {
                if (userBlocked[i].blocked_user_id != message.sender_user_id)
                  i++;
                else
                  break;
              }
              if (i == userBlocked.length)
              {
                addMessage(message);
              }
          });
          store.getters.getWebSocket.on('notifChat', async (msg: string, message: string)  => {
            if (msg == 'users'){
              const response = await axios.get(`/chat/users/${store.getters.getChanContext.chanel_chat_id}`, {headers});
              store.commit('setWhat', 'UsersInChan');
              store.commit("setUsers", response.data.users);
              forceRender();
            }
            else if (msg == 'userContext'){
              const response1 = await axios.get(`/chat/update/${store.getters.getChanContext.chanel_chat_id}`, {headers});
              store.commit('setUserContext', response1.data.userContext);
              store.commit('setWhat', 'UsersInChan');
              if (response1.data.isKicked == true){
                alert("You got kicked from this channel");
                router.push('/dashBoardChat')
                return ;
              }
              else if (response1.data.isBanned == true){
                alert("You got banned from this channel");
                router.push('/dashBoardChat')
                return ;
              }
              forceRender();
            }
            else if(msg == 'privContext'){
              alert(message);
              router.push('/dashBoardChat')
              return ;
            }
            else if (msg == 'deleteChan'){
              alert(message);
              router.push('/dashBoardChat')
              return ;
            }
            
          })
        } catch (error) {
          store.commit('setError', error);
          router.push('/error');
        }
      }
    });

    onUnmounted(async () => {
      try {        
        store.getters.getWebSocket.emit('join', `${getChanelId()}`, false);
        store.getters.getWebSocket.off('join');
        store.getters.getWebSocket.off('chat');
        store.getters.getWebSocket.off('notifChat')
      } catch (error) {
        store.commit('setError', error);
        router.push('/error');
      }
    });

    const forceRender = () => {
      componentKey.value += 1;
    }

    const getChanelId = () => {
      if(store.getters.getChanContext){
        return store.getters.getChanContext.chanel_chat_id;
      }
      else{
        return [];
      }
    }

    const getChanelName = () => {
      if(store.getters.getChanContext){
        return store.getters.getChanContext.chanel_name;
      }
      else{
        return [];
      }
    }
    const getOwner = () => {
      if(store.getters.getUserContext){
        return store.getters.getUserContext.owner;
      }
      else{
        return [];
      }
    }
</script>

<template>
  <div class="chatView">
    <div class="title">
      <div class="tilte-tilte">
        <h1> {{ getChanelName() }} </h1>
        <formChangePwdChat v-if="getOwner()"/>
      </div>
      <div class="userButton">
        <oneUserButton :key="componentKey" v-if="store.getters.getWhat === 'UsersInChan'"/>
      </div>
    </div>
  
    <div class="chat-container">
      <div class="chat-history">
        <chatHistory />
        <div class="msg" v-for="(msg, index) in chatMessages" :key="index">
          <div v-if="typeof msg === 'object' && msg.messages_text" class="chat-messages" :class="{ 'chat-myMsg': msg.sender_user_id === store.getters.getId, 'chat-hisMsg': msg.sender_user_id != store.getters.getId}">
            <div id="name">
              {{ msg.sender_nickname }}
            </div>
            <div id="corp">
              <div id="msg">
                {{ msg.messages_text }}
              </div>
              <div id="date">
                {{ msg.messages_createdAtTime }}
              </div>
            </div>
          </div>
        </div>
        <!-- bottom -->
      <a id="to-last-message"></a>
      </div>
      <a href="#to-last-message"></a>
      <div id="prompt-container">
        <chatPrompt />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chatView{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chat-history{
  margin-top: auto;
  overflow: auto;
  scroll-behavior: reverse;
  max-height: 500px;
}
.chat-history::-webkit-scrollbar{
  display: none;
}
.chat-container {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: rgba(123, 211, 211, 0.098);
  box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
  border-radius: 10px;
  overflow-y: auto;
  height: 500px;
  max-height: 500px;
  min-width: 360px;
  max-width: 400px;
  margin: 1rem;
}
.chat-container:hover {
  opacity: 1;
}

#prompt-container {
  border-top: 1px solid rgba(79, 200, 209, 0.94);
  padding-top: 5px;
  min-height: 3rem;
}
.chat-messages {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  margin: 2px;
  height: auto;
}
.chat-myMsg{
  width: auto;
  max-width: 360px;
  float: right;
}
.chat-hisMsg{
  width: auto;
  max-width: 360px;
  float: left;
}
#name{
  text-decoration: underline;
  font-size:smaller;
  color: rgb(225, 117, 22);
}
#corp{
  display: flex;
  flex-direction: row;
  margin-top: 0.3rem;
}
#msg{
  width: auto;
  max-width: 360px;
  word-wrap: break-word;
  overflow: hidden;
  color: white;

}
#date{
    height: 0.7rem;
    width: 2.5rem;
    font-size: x-small;
    color: rgb(5, 245, 221);
    display: flex;
    justify-content: end;
    align-items: end;
    margin-top: auto;
}

@media screen and (max-width: 500px) {
  .chat-container {
    height: 350px;
    max-height: 500px;
    min-width: 350px;
    max-width: 350px;
  }
}
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.tilte-tilte{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: auto;
}
.userButton{
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-width: 11rem;
  height: 8rem;
}
h1{
  font-size: xx-large;
  min-height: 2rem;
}
.userButton::-webkit-scrollbar{
  display: none;
}

</style>