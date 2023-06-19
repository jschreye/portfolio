<script setup lang="ts">
    import router from '@/router'
    
    function click(){
        router.push('/');
    }
</script>

<template>
        <button id="logo" class="navButton" @click="click">
        </button>
</template>

<style scoped lang="scss">

#logo{
    background-image: url('../../assets/42.png');
    height: 50px;
    width: 100px;
    background-size: cover;
    background-position: center;
    margin: 10px;
    max-width: 55px;
    max-height: 40px;
    min-width: 55px;
    min-height: 40px;
}
</style>