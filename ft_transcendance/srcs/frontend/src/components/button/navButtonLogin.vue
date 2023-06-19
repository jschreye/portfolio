<script setup lang="ts">


</script>

<template>
    <div>
        <div id="logo"></div>
        <button class="navButton">
            <span id="login">
                Login
            </span>
        </button>
    </div>
</template>

<style scoped lang="scss">

div{
    display: flex;
    flex-direction: column;
    align-items:center ;
}
.navButton:hover{
	border: 1px solid aqua;
	border-radius: 3px;   
}

#login{
    cursor: pointer;
    text-decoration: underline;
}

#logo{
    background-image: url('../../assets/drawing.svg');
    height: 9em;
    width: 100%;
    background-size: cover;
    background-position: center;
    margin: 10px;
    max-width: 250px;
    max-height: 400px;
}

</style>