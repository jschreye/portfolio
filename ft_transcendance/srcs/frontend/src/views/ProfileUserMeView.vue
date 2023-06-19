<script  setup lang="ts">
    import FormModifProfil from "../components/form/formModifProfil.vue";
    import capsuleUser from '@/components/capsuleUser.vue';
    import doubleAuth from '../components/button/doubleAuth.vue'
    import listFriendsRequest from "@/components/listFriendsRequest.vue";
    import matchHistory from '@/components/matchHistory.vue';
    import { useStore } from "vuex"
    import { onMounted} from 'vue';
    import axios from "axios";
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const store = useStore();
    onMounted(async () => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.get("/users/me", {headers});
            store.commit('setMe', response.data);
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    });

</script>

<template>
    <div class="all">
        <div class="ProfileUser">
            <div class="form">
                <FormModifProfil />
            </div>
            <div class="caps">
                <capsuleUser />
            </div>
            <div class="doubleAuth">
                <doubleAuth />
            </div>
        </div>
        <div class="listFriendsRequest">
            <listFriendsRequest />
        </div>
        <div class="matchHistory">
            <matchHistory />
        </div>
    </div>
</template>

<style scoped lang="scss">
.all{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
}
.matchHistory{
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 450px;
    min-width: 340px;
    max-height: 200px;
    margin: 5px;
    overflow: auto;
}
.listFriendsRequest{
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 450px;
    min-width: 340px;
    max-height: 200px;
    margin: 5px;
    overflow: auto;
}
.ProfileUser{
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 450px;
    min-width: 340px;
}
.caps{
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    margin-top: 1em;
}
@media screen and (max-width: 500px) {
  .ProfileUser {
    height: 300px;
    overflow: auto;
  }
  .matchHistory{
    max-height: 100px;
    overflow: auto;
  }
  .listFriendsRequest{
    max-height: 100px;
    overflow: auto;
  }
}
.ProfileUser::-webkit-scrollbar{
  display: none;
}
.matchHistory::-webkit-scrollbar{
  display: none;
}
.listFriendsRequest::-webkit-scrollbar{
  display: none;
}

</style>