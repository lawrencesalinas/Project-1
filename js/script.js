const canvas = document.querySelector("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const resetGame = document.getElementById("restart")
const c = canvas.getContext("2d")
let playerOneScore = 0;
let playerTwoScore = 0
let roundWiiner = ""
let weHaveAwinner = false


const images = document.getElementById("source")
function Shield(image, x, y, width, height){
    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.render = () =>{
        c.drawImage(this.image, this.x, this.y, this.width, this. height )
    }
}

function Player(x, y , color, width, height){             
    this.x = x
    this.y = y 
    this.width = width 
    this.height = height
    this.color = color
    this.render = () => {
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.width, this.height)
    }
}

function Circle(x, y, radius,dy, caught){
    
    this.x = x
    this.y = y
    this.radius = radius 
    this.dy = dy
    this.draw = () =>{
        c.beginPath()
        c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = " #FEDE17"
        c.stroke()
        c.fill()
    }
    this.fire = () => {
        this.y += this.dy 
    }
    this.detect = () => {
        if(this.y - this.radius < player.y + player.height && this.x + this.radius > shield.x && this.x < shield.x + shield.width){
            this.y = 300
            this.x = -20
            this.dy = 0
            playerOneScore++       
         }  
         }
    this.detectWall = () => {
        if(this.y - this.radius < 0){
            this.y = 300
            this.x = -20
            this.dy = 0
            playerTwoScore++  
        }
    }
    }    


let canvasXmid = (canvas.width/2 - 100)
let player = new Player(canvasXmid, 0, '#bada55', 130, 70)
let player2 = new Player(canvasXmid, canvas.height - 50, "brown", 150, 40)
let shield = new Shield(images,canvasXmid, 0, 140, 80)
let circles = []

const fire = (e) => {
     switch(e.key){
        case " ":
    let circle = new Circle(100 +player2.x, player2.y, 20,-7) 
        circles.push(circle)  
         }
}
const move = () => {
    if(controls.shooterRight){
        shield.x += 20
        if(shield.x + shield.width >= canvas.width){
            shield.x = canvas.width - shield.width
        }
    }
    if (controls.shooterLeft){
        shield.x -= 20
        if(shield.x < 0){
            shield.x = 0
        }
    }
    if(controls.catcherLeft){
        player2.x -= 20
        if(player2.x < 0){
            player2.x = 0
        }
      
    } 
    if (controls.catcherRight){
        player2.x += 20
        if(player2.x + player2.width >= canvas.width){
            player2.x = canvas.width - player2.width
        }
    }
}
    

let controls = {}
const controller = (key, keyDown) => {
if(key == "d"){
    controls.shooterRight = keyDown
}
if(key == "a"){
    controls.shooterLeft = keyDown
}
if(key == "ArrowRight"){
    controls.catcherRight = keyDown
}
if(key == "ArrowLeft"){
    controls.catcherLeft = keyDown
}
}

const gameReset = (a) => {
  const reset = a.target.resetGame
      playerOneScore = 0
      playerTwoScore = 0
      roundWiiner = ""
      shield.x = canvasXmid
      shield.y = 0
      player2.x = canvasXmid
      player2.y = canvas.height - 50
      weHaveAwinner = false
    
      
} 



    
const gerScoresAndResult = () => {
    const scores = document.getElementById("score")
    scores.innerText = `Player 1 score: ${playerOneScore} \n\n Player 2 score: ${playerTwoScore}`
     if(playerOneScore === 20 && playerTwoScore < 20){
            roundWiiner = "player1"
            weHaveAwinner = true;
     } else if(playerTwoScore === 20 && playerOneScore < 20 ){
            roundWiiner = "player2"
            weHaveAwinner = true;
    }
        
    const result = document.getElementById("result")
    result.innerText = `The round winner is ${roundWiiner}`
    
    }

 
const clearInt = () =>{
    c.clearRect(0, 0, canvas.width, canvas.height)
}

const gameLoop = () => {
    
    clearInt()
    shield.render()
    player2.render()
    for(var i = 0; i < circles.length; i++){
        circles[i].draw()
        circles[i].fire()
        circles[i].detect()
        circles[i].detectWall()
     }
    move()
    gerScoresAndResult()
    
}



gameInterval = setInterval(gameLoop, 1000/60)
let stopGameLoop = () => {clearInterval(gameInterval)}
document.addEventListener("keydown", (e) =>{
    controller(e.key, true)
})
document.addEventListener("keyup", (e) => {
    controller(e.key, false)
})
restart.addEventListener("click", gameReset)
document.addEventListener('keydown', fire)