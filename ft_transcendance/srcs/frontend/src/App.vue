<script setup lang="ts">
  import navBar from "./components/navBar.vue"
  import notif from "./components/notif.vue"
  import { RouterView } from "vue-router"
  import  { useStore} from 'vuex'
    
  const store = useStore();
  //localStorage.clear();
  //store.replaceState({});
  
  function getToken() {
    const token = store.getters.getToken;
    if (token)
      return token;
  }

  if (getToken()){
    store.dispatch('initWebSocket');
    if (!store.getters.getWebSocket){
      store.dispatch('initWebSocket');
    }
  }
  
</script>

<template>
  <div class="mainDiv">
    <header v-if="getToken()">
        <navBar />
        <notif v-if="store.getters.getNameNotif"/>
    </header>
    <main>
        <RouterView />
    </main>
    <footer v-if="getToken()">
      <a href="https://42lausanne.ch/"> 42 Lausanne</a>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.mainDiv{
  overflow: hidden;
  position: relative;
  display: flex;
	flex-direction: column;
	align-items: center;
  min-height: 100%;
  color: rgb(122, 122, 122);
}
header{
  position: absolute;
  height: auto;
}

main{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
}

footer {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
}

a{
  text-align: center;
  color: #71c0d4;
  text-decoration: none;
}

</style>