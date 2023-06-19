<script  setup lang="ts">
    import capsuleUser from '@/components/capsuleUser.vue';
    import friendRequest from "@/components/button/friendRequest.vue";
    import sendMsg from '@/components/button/sendMsg.vue';
    import playInvit from '@/components/button/playInvit.vue';
    import bloquer from '@/components/button/bloquer.vue';
    import matchHistory from '@/components/matchHistory.vue';

</script>

<template>
    <div class="main">
        <div class="card">
            <div>
                <capsuleUser />
            </div>
            <div class="userButton">
                <friendRequest />
                <sendMsg />
                <playInvit />
                <bloquer />
            </div>
        </div>
        <div class="matchHistory">
            <matchHistory />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main{
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
    max-height: 300px;
    margin: 5px;
    overflow: auto;
}
.userButton {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    justify-content:space-evenly;
    padding-top: 0.5rem;
    border-top: 1px solid #06FFFF;
}

.card {
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 1rem;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 450px;
    min-width: 340px;
}

.card:hover {
    opacity: 1;
}
@media screen and (max-width: 500px) {
  .matchHistory{
    max-height: 200px;
    overflow: auto;
  }
}
.matchHistory::-webkit-scrollbar{
  display: none;
}
</style>