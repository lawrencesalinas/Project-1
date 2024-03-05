const canvas = document.querySelector("canvas")
const resetGame = document.getElementById("restart")
const start = document.getElementById('start')
const howTo = document.getElementById('how-to')
const overlay = document.getElementById('overlay')

const wasd = new Image()
wasd.src = '/Protect-the-castle/css/wasd.png'
const arrows = new Image()
arrows.src = '/Protect-the-castle/css/arrows.png'
const shieldImg = new Image()
shieldImg.src = '/Protect-the-castle/css/pngegg.png'
const catapult = new Image()
catapult.src = '/Protect-the-castle/css/catapult.png'

canvas.height = window.innerHeight
canvas.width = window.innerWidth
const c = canvas.getContext("2d")
/*----variables used for results and scoring*----*/
let playerOneScore = 0
let playerTwoScore = 0
let roundWiiner = ""
let weHaveAwinner = false

/*--------------constructor functions to create the characters of the game-------------------*/
function Shield(image, x, y, width, height) {
    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.render = () => {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

function Catapult(image, x, y, width, height) {
    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.render = () => {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

function Player(x, y, color, width, height) {
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

function Fireball(x, y, radius, dy, caught) {
    this.x = x
    this.y = y
    this.radius = radius
    this.dy = dy
    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = " #FEDE17"
        c.stroke()
        c.fill()
    }
    /*-----circle function when it reaches the winning score---*/
    this.shootAndEndOfGame = () => {
        if (playerOneScore === 10 || playerTwoScore === 10) {
            this.y += 300            /////circles
            this.x = -20            ///////get sent outside the canvas
            this.y += 0           ///////and stop moving  
        } else {
            this.y += this.dy
        }
    }
    /*---circle function when it collides with the shield---*/
    this.detectPlayer = () => {
        if (this.y - this.radius < player.y + player.height && this.x + this.radius > shield.x && this.x < shield.x + shield.width) {
            this.y = 300
            this.x = -20
            this.dy = 0
            playerOneScore++
        }
    }
    this.detectWall = () => {
        if (this.y - this.radius < 0) {
            this.y = 300
            this.x = -20
            this.dy = 0
            playerTwoScore++
        }
    }
}

/*-------------character variables-------------*/
let canvasXmid = (canvas.width / 2 - 100)
let player = new Player(canvasXmid, 0, '#bada55', 130, 70)
let player2 = new Catapult(catapult, canvasXmid, canvas.height - 100, 140, 100)
let shield = new Shield(shieldImg, canvasXmid, 0, 140, 80)


/*---------------------------------------------------------------------------------------------------*/
/*------------------------------functions inside the game loop-------------------------------------------*/
/*---------------------------------------------------------------------------------------------------*/

/*function to create multiple  circles with the use of the key spacebar*/
let circles = []
const fire = (e) => {
    switch (e.key) {
        case " ":
            /*circle shoots out from the middle of the shooter*/
            let circle = new Fireball(player2.width / 2 + player2.x, player2.y, 20, -7)
            circles.push(circle)
    }
}

/*function to control the shield and the destroyer from left and right directions as well as wall detection*/
const movements = () => {
    if (controls.shooterRight) {
        shield.x += 20
        if (shield.x + shield.width >= canvas.width) {
            shield.x = canvas.width - shield.width
        }
    }
    if (controls.shooterLeft) {
        shield.x -= 20
        if (shield.x < 0) {
            shield.x = 0
        }
    }
    if (controls.catcherLeft) {
        player2.x -= 20
        if (player2.x < 0) {
            player2.x = 0
        }

    }
    if (controls.catcherRight) {
        player2.x += 20
        if (player2.x + player2.width >= canvas.width) {
            player2.x = canvas.width - player2.width
        }
    }
}

/*function to assign & setup the key controls of the shooter and the shield*/
let controls = {}
const controller = (key, keyDown) => {
    if (key == "d") {
        controls.shooterRight = keyDown
    }

    if (key == "a") {
        controls.shooterLeft = keyDown
    }

    if (key == "ArrowRight") {
        controls.catcherRight = keyDown
    }

    if (key == "ArrowLeft") {
        controls.catcherLeft = keyDown
    }
}


/* start the game */
const startGame = (e) => {
    overlay.style.display = 'none'
    shield.x = canvasXmid
    player2.x = canvasXmid
    playerOneScore = 0
    playerTwoScore = 0
    roundWiiner = ""
}

/*function to reset the game*/
const gameReset = (e) => {
    const reset = e.target.resetGame
    shield.x = canvasXmid
    player2.x = canvasXmid
    playerOneScore = 0
    playerTwoScore = 0
    roundWiiner = ""
}

const isntructions = (e) => {
    const instructionsText = document.getElementById("instructions-text")
    instructionsText.innerText = `How to play\n Destroyer controls: left key to move left, right key to move right, space bar to shoot..\n
     Protecter controls: a key to move left and d key to move right.\n
     Destroyer needs to get pass through the shield 10 times to win
     Protector needs to get catch the fireballs 10 times to win \n`
    wasd.classList.add('wasd')
}

const getScoresAndResult = () => {
    const scores = document.getElementById("score")
    scores.innerText = `Shield score: ${playerOneScore} \n\n Catapult score: ${playerTwoScore}`
    if (playerOneScore >= 10 && playerTwoScore < 20) {
        roundWiiner = "The shield has prevailed and protected the castle"

    } else if (playerTwoScore >= 10 && playerOneScore < 20) {
        roundWiiner = "The destroyer has has broken our shield and has taken over the castle"
    }

    const resultText = document.getElementById("result-text")
    const result = document.getElementById('result')

    // result.classList.add('active')
    resultText.innerText = roundWiiner
    result.classList.add('active')
}


/*function to clear the game loop when it loops*/
const clearInt = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
}
/*----------------------------------game loop----------------------------------------------*/
const gameLoop = () => {
    clearInt()
    isntructions()
    shield.render()
    player2.render()
    /*----create  and renders multiple circles ---*/
    for (var i = 0; i < circles.length; i++) {   ////
        circles[i].draw()               //////////
        circles[i].shootAndEndOfGame()  /////////
        circles[i].detectPlayer()       ////////
        circles[i].detectWall()         ///////
    }                          //////////////
    /*---------------------------------------*/
    movements()
    getScoresAndResult()
}
/*------------------------------------------------------------------------------------------*/

setInterval(gameLoop, 1000 / 60)


/*adding eventListerners to the program*/
document.addEventListener("keydown", (e) => {
    controller(e.key, true)
})
document.addEventListener("keyup", (e) => {
    controller(e.key, false)
})

start.addEventListener('click', startGame)

restart.addEventListener("click", gameReset)

document.addEventListener('keydown', fire)

const restartBtn = document.getElementById('restart')
const howToBtn = document.getElementById('how-to')

// Add a keydown event listener to the restartBtn
restartBtn.addEventListener('keydown', function (event) {
    // Check if the key pressed is the space bar
    if (event.keyCode === 32) {
        // Prevent the default action to stop the space bar from activating the button
        event.preventDefault()
    }
})

howToBtn.addEventListener('keydown', function (event) {
    // Check if the key pressed is the space bar
    if (event.keyCode === 32) {
        // Prevent the default action to stop the space bar from activating the button
        event.preventDefault()
    }
})

