<script setup lang="ts">
    import navButtonLogo from "./button/navButtonLogo.vue"
    import navButtonUsers from "./button/navButtonUsers.vue"
    import navButtonProfile from "./button/navButtonProfile.vue"
    import navButtonChat from "./button/navButtonChat.vue"
    import navButtonPlay from "./button/navButtonPlay.vue"
    import navButtonLogout from "./button/navButtonLogout.vue"
</script>

<template>
    <nav class="nav">
        <div class="un">
            <navButtonLogo />
            <div>
                <navButtonPlay />
                <navButtonUsers />
                <navButtonChat />
            </div>
        </div>
        <div class="deux">
            <navButtonLogout />
            <navButtonProfile />
        </div>
    </nav>
</template>


<style scoped lang="scss">
.nav {
    display: flex;
    margin-top: 10px;
    padding: 20px;
}

.un{
    display: flex;
    align-items: center;
}
.deux{
    display: flex;
    align-items: center;
    justify-content: end;
}
</style>