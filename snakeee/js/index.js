let inputDir={x:0, y:0};
let foodsound= new Audio('food.mp3');
let over= new Audio('gameover.mp3');
let turn= new Audio('turn.mp3');
let bgm= new Audio('bgm.mp3');
let speed=5;
let lastpainttime =0;
let snakearr=[{x:13,y:15}]
food={x:6,y:8};
let score=0;

// game func
function main (ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime = ctime;
    gameengine();
}
function isColide(snakebd){
    //bump self
    for (let i = 1; i < snakearr.length; i++) {
        if(snakebd[i].x=== snakebd[0].x && snakebd[i].y=== snakebd[0].y){
            return true;
        }
        
    }
    if(snakebd[0].x >= 18 || snakebd[0].x <=0 || snakebd[0].y >= 18 || snakebd[0].y <=0){
        return true;
    }
    else{
        return false
    }
    
}
function gameengine(){
// UPDATE
bgm.play();
if (isColide(snakearr)) {
    over.play();
    bgm.pause();
    inputDir = { x: 0, y: 0 };
    if (confirm("Game over! Press OK to restart.")) {
        snakearr = [{ x: 13, y: 15 }];
        score = 0; // Reset the score to 0
        bgm.play();
    }
}


// eat food


if(snakearr[0].y=== food.y && snakearr[0].x === food.x){
    foodsound.play();
    score+=1;
    scorebox.innerHTML= "score: "+score;
    snakearr.unshift({x: snakearr[0].x+ inputDir.x , y: snakearr[0].y+ inputDir.y});
    let a= 2;
    let b= 16;
    food= {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
}


// move the snake

for (let i = snakearr.length-2; i >=0; i--) {
    const element = snakearr[i];
    snakearr[i+1] = {...snakearr[i]};

    
}
snakearr[0].x += inputDir.x;
snakearr[0].y += inputDir.y;




// REMDER
board.innerHTML="";
snakearr.forEach((e, index)=>{
    // snake
    snakeelement=document.createElement('div');
    snakeelement.style.gridRowStart=e.y;
    snakeelement.style.gridColumnStart=e.x;
    
    if(index==0){
        snakeelement.classList.add('head');
    }
    else{
        snakeelement.classList.add('snakebd');
    }
    board.appendChild(snakeelement);

    // food
    snakeelement=document.createElement('div');
    snakeelement.style.gridRowStart=food.y;
    snakeelement.style.gridColumnStart=food.x;
    snakeelement.classList.add('food')
    board.appendChild(snakeelement);
})
}








// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir ={x: 0, y:1}//startgame
    turn.play(); 
    switch(e.key){
        case"ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case"ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case"ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1 ;
            inputDir.y= 0;
            break;
        case"ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
    }
})