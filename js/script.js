const canvas = document.querySelector("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const c = canvas.getContext("2d")


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

function Circle(x, y, radius){
    this.x = x
    this.y = y
    this.radius = radius
    this.draw = () =>{
        c.beginPath()
        c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false)
        c.stroke()
    }
}

let canvasXmid = (canvas.width/2 - 100)
let player = new Player(canvasXmid, 0, '#bada55', 200, 50)
let player2 = new Player(canvasXmid, canvas.height - 50, "blue", 200, 50)
let circle = new Circle(50, 0, 50,)


// let circleBox = []
// const createCircle = () => {
//     let circle = new Circle('circle',50, 0, 10, 0)
//     circleBox.push(circle)
//     console.log(circleBox)
//     for(let i = 0; i < circleBox.length; i++){
//         circle = circleBox[i]
//        }
// }



var controls = {}
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
if(key == " "){
    controls.shooting = keyDown
    // createCircle()
}

}

const move = () => {
    if(controls.shooterRight){
        player.x += 20
        if(player.x + player.width >= canvas.width){
            player.x = canvas.width - player.width
        }
    }
    if (controls.shooterLeft){
        player.x -= 20
        if(player.x < 0){
            player.x = 0
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
    if(controls.shooting){
        circle.x = 100 + player2.x
        circle.y = player2.y
        circle.y -= 10
        
    //     createCircle()
    //     for(let i = 0; i < circleBox.length; i++)
    //     circleBox[i].draw()
    }
}


const shootCircle = () => {
     circle.y -= 10
}

const clearInt = () =>{
    c.clearRect(0, 0, canvas.width, canvas.height)
}

const gameLoop = () => {
    
    shootCircle()
    clearInt()
    circle.draw()
    player.render()
    player2.render()
    move()

}



gameInterval = setInterval(gameLoop, 1000/60)
document.addEventListener("keydown", (e) =>{
    controller(e.key, true)
})
document.addEventListener("keyup", (e) => {
    controller(e.key, false)
})
