<script setup lang="ts">
    import { useStore } from "vuex"

    const store = useStore();

</script>

<template>
    <div class="chat" v-for="(msg, index) in store.getters.getChatHistory" :key="index">
        <div v-if="msg.messages_text" class="chat-messages" :class="{ 'chat-myMsg': msg.sender_user_id === store.getters.getId, 'chat-hisMsg': msg.sender_user_id != store.getters.getId}">
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
</template>

<style scoped lang="scss">

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
    color: white;
    word-wrap: break-word;
    overflow: hidden;
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
</style>