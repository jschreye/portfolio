<template>
    <div id="all">
        <div id="monpong">
            <canvas id="pong" width="600" height="400"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted, onUnmounted } from 'vue';
    const store = useStore();
    const router = useRouter();
    onMounted(async () => {
        game();
    });
/// FONCTION POUR LE PONG !!!!!!!!!
function game(){
    const cvs = document.getElementById("pong") as HTMLCanvasElement;
    const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;
const user = {
    x: 10,
    y: cvs.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0,
}
const com = {
    x: cvs.width - 20,
    y: cvs.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0,
}
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 8,
    speed: 6,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}
const net = {
    x: cvs.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE",
}
function drawNet(){
    for(let i = 0; i <= cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
function drawRect(x: number, y: number, w: number, h: number, color: any){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
drawRect(0, 0, cvs.width, cvs.height, "black")
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
function resetBallright(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;
    ball.speed = 6;
    ball.velocityX = -5;
    ball.velocityY = 0;
}
function resetBallleft(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;
    ball.speed = 6;
    ball.velocityX = 5;
    ball.velocityY = 5;
}
function render(){
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");
    drawNet();
    drawText(user.score, cvs.width/4, cvs.height/5, "WHITE");
    drawText(com.score, 3*cvs.width/4, cvs.height/5, "WHITE");
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
// pos, mov, score, ...
function update(){
    if (ball.x - ball.radius < 0){
        resetBallright();
    }else if(ball.x + ball.radius > cvs.width){
        resetBallleft();
    }
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;
    if (ball.y + ball.radius > cvs.height ||
        ball.y - ball.radius < 0){
            ball.velocityY = - ball.velocityY;
        }
        
        let player = (ball.x + ball.radius < cvs.width/2) ? user: com;
        
        if (collision(ball, player)){
            let collidePoint = (ball.y - (player.y + player.height/2));
            // normalization
            collidePoint = collidePoint/(player.height/2);
            
            // calculate angle in Radian
            let angleRad = collidePoint * Math.PI/4;
            
            // X direction of the ball hit
            let direction = (ball.x + ball.radius < cvs.width/2) ? 1 : - 1;
            
            // change vel x and y
            ball.velocityX = direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            
            // everytime the ball hit the paddle, we encrese its speed
            
            //update the scrore
    }
}
// control the user paddle;
document.addEventListener("keydown", function(event) 
    {
        let rect = cvs.getBoundingClientRect();
        //let prop = rect.height/40;
        const speed = cvs.height/20;
        if (event.code == 'KeyW') // Touche "haut"
        { 
            if (user.y > 0)
            {
                user.y -= 10;
            }
        } 
        else if (event.code == 'KeyS') // Touche "bas"
        {
            if (user.y < 300)
            {
                user.y += 10;
            }
        }
    });
// collision detection
function collision(b: any, p: any){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    return b.right > p.left && b.bottom > p.top && b.left < p.right &&
    b.top < p.bottom;
}
function game(){
        update();
        render();
}
const framePerSeconde = 30;
let interval = setInterval(game, 1000/framePerSeconde)
store.commit("setInterval", interval)   
}
onUnmounted (async () => {
    clearInterval(store.getters.getInterval);
    store.commit("setInterval", 0);
});
</script>

<style scoped lang="scss">
#pong{
    margin-top: 10%;
    width: 40%;
    height: auto;
    border: 1px solid aqua;
    border-radius: 4px;
}
</style>