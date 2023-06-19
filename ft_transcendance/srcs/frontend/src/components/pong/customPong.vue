<script setup lang="ts">
    import { useStore } from 'vuex';
    import PongPlayGame from "../pongPlayGame.vue";

    const store = useStore();

    function selectColor(optionColor: string){
        switch (optionColor) {
            case 'pink':
                store.commit('setColorRect1', '#7d4ffe');
                store.commit('setColorRect2', '#7d4ffe');
                store.commit('setColorBall', '#7d4ffe');
                store.commit('setColorBackGround', '#ff5efa');
                store.commit('setColorNet', '#7d4ffe');
                store.commit('setColorText', '#7d4ffe');
                store.commit('setPlayStart', true);
                break;
            case 'green':
                store.commit('setColorRect1', '#fcfe19');
                store.commit('setColorRect2', '#fcfe19');
                store.commit('setColorBall', '#fcfe19');
                store.commit('setColorBackGround', '#87ff00');
                store.commit('setColorNet', '#fcfe19');
                store.commit('setColorText', '#fcfe19');
                store.commit('setPlayStart', true);
                break;
            case 'normal':
                store.commit('setColorRect1', '#ffffff');
                store.commit('setColorRect2', '#ffffff');
                store.commit('setColorBall', '#ffffff');
                store.commit('setColorBackGround','#000000');
                store.commit('setColorNet', '#ffffff');
                store.commit('setColorText', '#ffffff');
                store.commit('setPlayStart', true);
                break;
            default:
                break;
        }
    }
</script>

<template>
    <div class="display">
        <legend>Select custom option:</legend>
        <div class="gameButton">   
            <button class="gameButton" @click="selectColor('pink')">
                pink
            </button>
            <button class="gameButton" @click="selectColor('green')">
                green
            </button>
            <button class="gameButton" @click="selectColor('normal')">
                normal
            </button>
        </div>
        <div>
            <PongPlayGame/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.display{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.gameButton{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    width: auto;
    flex-direction: column;
    margin: 10px;
    color: darkcyan;
    font-size: large;
    letter-spacing: 1.5px;
    cursor: pointer;
}
.gameButton:hover {
    color: #e6e6e6;
}
</style>