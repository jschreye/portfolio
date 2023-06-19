<template>
    <div class="centered-container">
        <div class="Player">
            <div class="Name">
                {{ store.getters.getNickname }}
            </div>
            <div :key="componentKey" class="Name">
                {{ store.getters.getName }}
            </div>
        </div>
        <div class="canva">
            <canvas id="pong" width="600" height="400"></canvas>
            <button class="navButton" @click="Quit()">
                leave game
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted, ref, onUnmounted } from 'vue';

    const store = useStore();
    const router = useRouter();
    const componentKey = ref(0);

    function Quit(){
        try {
            store.getters.getWebSocket.emit("game", store.getters.getRoom, "quit", store.getters.getName);
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
    }
    
    onMounted(async () => {
        if (store.getters.getWebSocket){       
            try {
                store.getters.getWebSocket.on('otherNick', (user1: string, user2: string) =>{
                    if (user1 == store.getters.getNickname){
                        store.commit('setName', user2);
                        forceRender();
                    }
                    else if (user2 == store.getters.getNickname){
                        store.commit('setName', user1);
                        forceRender();
                    }
                })    
                store.getters.getWebSocket.on("init" ,(ballx: number, bally: number, user1: number, user2: number, player1: string, player2: string) => {
                    store.commit("setBallX", ballx)
                    store.commit("setBallY", bally)
                    store.commit("setUser1", user1)
                    store.commit("setUser2", user2)   
                }); 
                store.getters.getWebSocket.emit("init")
                store.commit("setStatusCode", -1)
                store.getters.getWebSocket.on('startgame', (player: number, status: any, trigger: boolean, msg: string) => {
                    if(trigger == true){
                        store.commit("setStatusCode", status)
                        store.getters.getWebSocket.off("startgame");
                        store.getters.getWebSocket.off("player");
                        store.getters.getWebSocket.off("game");
                        store.getters.getWebSocket.off("init");
                        store.getters.getWebSocket.off("otherNick");
                        store.commit("setRoom", "");
                        store.commit("setName", "");
                        alert(msg);
                        
                        setTimeout(() =>{
                            router.push("/")
                        }, 1500);       
                    }
                    else if (status == false){
                        store.commit("setPlayer", player)
                        store.commit("setGoPlay", status)
                    }
                    else{
                        game();
                        store.commit("setGoPlay", status)
                        store.commit("setRoom", player)
                    }
                });
                store.getters.getWebSocket.emit('startgame', store.getters.getMatchmaking, store.getters.getName)
                store.commit('setNameNotif', "")
                store.getters.getWebSocket.on("game", (ballx: number, bally: number, user1: number, user2: number, score1: number, score2: number ) => {      
                       
                    if (store.getters.getPlayer == 1){
                        store.commit("setBallX", ballx)
                        store.commit("setBallY", bally)
                        store.commit("setUser2", user2)
                        store.commit("setScoreUser1", score1)
                        store.commit("setScoreUser2", score2)
                    }
                    else{
                        store.commit("setBallX", 600 - ballx)
                        store.commit("setBallY", bally)
                        store.commit("setUser2", user1)
                        store.commit("setScoreUser2", score1)
                        store.commit("setScoreUser1", score2)
                    }
                });
                store.getters.getWebSocket.emit('game', "départ")
            } catch (error) {
                store.commit('setError', error);
                router.push('/error');
            }
        }
    });
    
    const forceRender = () => {
      componentKey.value += 1;
    }
    /// FONCTION POUR LE PONG !!!!!!!!!
    function game(){
        const cvs = document.getElementById("pong") as HTMLCanvasElement;
        const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;
    function end(){
        if (store.getters.getId == store.getters.getStatusCode){
            drawText("YOU WIN", cvs.width/3, cvs.height/2, store.getters.getColorText)
        }
        else{
            drawText("YOU LOSE", cvs.width/3, cvs.height/2, store.getters.getColorText)
        }
    }
    const user1 = {
        x: 10,
        y: cvs.height/2 - 100/2,
        width: 10,
        height: 100,
        color: store.getters.getColorRect1,
        score: 0,
    }
    const user2 = {
        x: cvs.width - 20,
        y: cvs.height/2 - 100/2,
        width: 10,
        height: 100,
        color: store.getters.getColorRect2,
        score: 0,
    }
    const ball = {
        x: cvs.width/2,
        y: cvs.height/2,
        radius: 8,
        color: store.getters.getColorBall
    }
    const net = {
        x: cvs.width/2 - 1,
        y: 0,
        width: 2,
        height: 10,
        color: store.getters.getColorNet,
    }
    function drawNet(){
        for(let i = 0; i <= cvs.height; i += 15){
            drawRect(net.x, net.y + i, net.width, net.height, net.color);
        }
    }
    function drawRect(x: number, y: number, w: number, h: number, color: any){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
    drawRect(0, 0, cvs.width, cvs.height, store.getters.getColorBackGround)
    function drawCircle(x: number, y: number, r: number, color: string){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }
    function drawText(text: any, x: number, y: number, color: string){
        ctx.fillStyle = color;
        ctx.font = "45px fantasy";
        ctx.fillText(text, x, y);
    }
    function render(){
        user1.y = store.getters.getUser1;
        user2.y = store.getters.getUser2;
        ball.x = store.getters.getBallX;
        ball.y = store.getters.getBallY;
        user1.score = store.getters.getScoreUser1;
        user2.score = store.getters.getScoreUser2;
        drawRect(0, 0, cvs.width, cvs.height, store.getters.getColorBackGround);
        drawNet();
        drawText(user1.score, cvs.width/4, cvs.height/5, store.getters.getColorText);
        drawText(user2.score, 3*cvs.width/4, cvs.height/5, store.getters.getColorText);
        drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
        drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
        drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }
    document.addEventListener("keydown", function(event) 
    {
        let rect = cvs.getBoundingClientRect();
        const speed = cvs.height/20;
        user1.y = store.getters.getUser1;
        if (event.code == 'KeyW') // Touche "haut"
        { 
            if (user1.y > 0)
            {
                user1.y -= 10;
            }
        } 
        else if (event.code == 'KeyS') // Touche "bas"
        {
            if (user1.y < 300)
            {
                user1.y += 10;
            }
        }
        store.commit('setUser1', user1.y)
        
        if (store.getters.getRoom){
            store.getters.getWebSocket.emit('player', store.getters.getRoom , user1.y)
        }
    });
 
    function playgame(){
        if (store.getters.getStatusCode < 0){
            render();
        }
        else{
            end();
        }  
    }
    if (store.getters.getStatusCode == -1){
        const framePerSeconde = 50;
        let interval = setInterval(playgame, 1000/framePerSeconde)
        store.commit("setInterval", interval)
    }
}
onUnmounted (async () => {
    clearInterval(store.getters.getInterval);
    store.commit("setInterval", 0);
    store.commit('setPlayStart', false);
});
</script>


<style scoped lang="scss">
.Name{
    display: flex;
    justify-content: center;
    align-items: center;
}
.canva{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Player{
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.centered-container {
    position: absolute;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
#pong{
    width: 60%;
    height: auto;
    border: 1px solid aqua;
    border-radius: 4px;
}
.navButton{
    color: aquamarine;
    width: auto;
    margin: 3px;
    height: 1.25rem;
}

.navButton:hover{
	border: 1px solid aqua;
	border-radius: 3px;   
}
</style>