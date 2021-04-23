class FrameUpdatableWithImage {
    updateFrame() {
    }
}

class Enemy extends FrameUpdatableWithImage {
    constructor() {
        super()
    }

    collide() {
    }

    fire() {
        let bullet = new Bullet(this.x, this.y)
        entities.push(bullet)
        bullets.push(bullet)
    }
}

class Basic extends Enemy {
    constructor(x) {
        super()
        this.image = new Image()
        this.image.src = "mario.png"
        this.x = x
        this.y = canvas.height / 10
        this.lives = 2
        this.speed = 5
        this.canMove = true

        this.moveX = Math.random()
        this.moveY = Math.random()

        this.counter = 0
    }

    collide(i) {
        if (this.lives > 0) {
            this.lives -= 1
        }
        if (this.lives <= 0) {
            this.x = -100000
        }
    }

    updateFrame() {
        if (Math.random() <= 1 / 100) {
            super.fire()
        }

        if (this.counter === 30) {
            this.counter = 0

            this.moveX = Math.random()
            this.moveY = Math.random()
        }

        if (this.moveX >= 0.67 && this.x < canvas.width - canvas.height / 25) {
            this.x += this.speed;
        } else if (this.moveX <= 0.33 && this.x > canvas.height / 25) {
            this.x -= this.speed;
        }
        if (this.moveY >= 0.67 && this.y < canvas.height / 2) {
            this.y += this.speed
        } else if (this.moveY <= 0.33 && this.y > 0) {
            this.y -= this.speed;
        }

        this.counter += 1
    }
}

class Boss extends Enemy {
    constructor(x) {
        super()
        this.image = bossImg
        this.x = x
        this.y = canvas.height / 10
        this.lives = 2
        this.speed = 3
        this.canMove = true

        this.moveX = Math.random()
        this.moveY = Math.random()

        this.counter = 0
    }

    collide(i) {
        if (this.lives > 0) {
            this.lives -= 1
        }
        if (this.lives <= 0) {
            this.x = -100000
        }
    }

    updateFrame() {
        if (Math.random() <= 1 / 100) {
            super.fire()
        }

        if (this.counter === 30) {
            this.counter = 0

            this.moveX = Math.random()
            this.moveY = Math.random()
        }

        if (this.moveX >= 0.67 && this.x < canvas.width - canvas.height / 25) {
            this.x += this.speed;
        } else if (this.moveX <= 0.33 && this.x > canvas.height / 25) {
            this.x -= this.speed;
        }
        if (this.moveY >= 0.67 && this.y < canvas.height / 2) {
            this.y += this.speed
        } else if (this.moveY <= 0.33 && this.y > 0) {
            this.y -= this.speed;
        }

        this.counter += 1
    }
}

class Player extends FrameUpdatableWithImage {
    constructor() {
        super()
        this.image = new Image()
        this.image.src = "ufo.png"
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.speed = 8
        this.canFire = true
        this.lives = 10
    }

    move(axis, dir) {
        switch (axis) {
            case "x":
                if (dir > 0) {
                    this.x += this.speed
                } else {
                    this.x -= this.speed
                }
                break;
            case "y":
                if (dir > 0) {
                    this.y += this.speed
                } else {
                    this.y -= this.speed
                }
                break;
        }
    }

    updateFrame() {
        if (keyUp) {
            this.move("y", -1)
        }
        if (keyDown) {
            this.move("y", 1)
        }
        if (keyLeft) {
            this.move("x", -1)
        }
        if (keyRight) {
            this.move("x", 1)
        }
        if (keySpace) {
            this.fire()
        }
    }

    collide() {
        if (this.lives > 0) {
            this.lives -= 1
        }
        if (this.lives <= 0) {
            this.x = 100000
        }
    }

    fire() {
        if (this.canFire) {
            let bullet = new Bullet(this.x, this.y, true)
            entities.push(bullet)
            bullets.push(bullet)
            this.canFire = false
            setTimeout(() => {
                this.canFire = true
            }, 150)
        }
    }
}

class Vector {
    constructor(dir, speed) {
        this.speed = speed
        // if (dir === "w" || dir === "a") {
        if (dir === "s") {
            this.speed = -this.speed
        }
        // }


        this.isVertical = true

        // if (dir == null) {
        //     this.isVertical = true
        //     this.speed = -this.speed
        // } else {
        //     this.isVertical = dir === "w" || dir === "s"
        //     this.isHorizontal = dir === "a" || dir === "d"
        // }
    }
}

class Bullet extends FrameUpdatableWithImage {
    constructor(x, y, byPlayer) {
        super()
        this.x = x
        this.y = y
        this.byPlayer = byPlayer

        if (this.byPlayer) {
            this.image = new Image()
            this.image.src = "bullet2.png"
            this.vector = new Vector("s", 16)
        } else {
            this.image = new Image()
            this.image.src = "bullet.png"
            this.vector = new Vector("w", 10)
        }
        //     this.vector = new Vector(getCurrentDir(), 10)
        // } else {
        // }
    }

    updateFrame() {
        if (this.vector.isVertical) {
            this.y += this.vector.speed
        }
        // if (this.vector.isHorizontal) {
        //     this.x += this.vector.speed
        // }
    }
}

let entities = []
let bullets = []
let enemies = []
let time = 0

let canvas = document.getElementById("main")
context = canvas.getContext("2d")

let playerImg = new Image()
playerImg.src = "ufo.png"

let enemyImg = new Image()
enemyImg.src = "boss.jpeg"

let bossImg = new Image()
bossImg.src = "boss.jpeg"

space = new Image()
space.src = "background.jpg"

let player = null

// Keys
let keyUp = false
let keyDown = false
let keyLeft = false
let keyRight = false
let keySpace = false

let isPlaying = false

// function getCurrentDir() {
//     if (keyUp) {
//         return "w"
//     } else if (keyDown) {
//         return "s"
//     } else if (keyLeft) {
//         return "a"
//     } else if (keyRight) {
//         return "d"
//     } else {
//         return null
//     }
// }

function ParseKeyDown(code) {
    switch (code.keyCode) {
        case 32:
            keySpace = true;
            break;
        case 37:
            keyLeft = true;
            break;
        case 39:
            keyRight = true;
            break;
        case 38:
            keyUp = true;
            break;
        case 40:
            keyDown = true;
            break;
    }
}

function ParseKeyUp(code) {
    switch (code.keyCode) {
        case 32:
            keySpace = false;
            break;
        case 37:
            keyLeft = false;
            break;
        case 39:
            keyRight = false;
            break;
        case 38:
            keyUp = false;
            break;
        case 40:
            keyDown = false;
            break;
    }
}

function range(start, end) {
    return Array.apply(0, Array(end - 1))
        .map((element, index) => index + start);
}

function nextWave() {
    var count = Math.floor(Math.random() * 8) + 2
    for (_ in new range(0, count)) {
        let enemy = null
        if (Math.random() <= 1 / 2) {
            enemy = new Boss(count * 100)
        } else {
            enemy = new Basic(count * 100)
        }
        enemies.push(enemy)
        entities.push(enemy)
    }
}

function FrameUpdate() {
    if (isPlaying) {
        context.clearRect(0, 0, canvas.width, canvas.height)

        context.drawImage(space, 0, 0, space.width, space.height, 0, 0, canvas.height, canvas.height);
        context.drawImage(space, 0, 0, space.width, space.height, 1000, 0, canvas.height, canvas.height);

        // Draw all entities
        entities.forEach((entity) => {
            entity.updateFrame()
            context.drawImage(entity.image, 0, 0, entity.image.width, entity.image.height, entity.x, entity.y, canvas.height / 20, canvas.height / 20);
        })

        context.font = "50px arial"
        context.fillStyle = "white"
        context.fillText(player.lives.toString(), 30, 90)
        context.stroke()

        bullets.forEach((bullet) => {
            if (bullet.byPlayer) {
                enemies.forEach((enemy, i) => {
                    if (enemy.y < bullet.y && enemy.y + canvas.height * 0.06 > bullet.y && enemy.x < bullet.x && enemy.x + canvas.width * 0.06 > bullet.x) {
                        console.log(123)
                        bullet.x = -100000
                        enemy.collide(i)
                    }
                })
            } else {
                if (player.y < bullet.y && player.y + canvas.height * 0.05 > bullet.y && player.x < bullet.x && player.x + canvas.width * 0.05 > bullet.x) {
                    console.log(321)
                    bullet.x = -100000
                    player.collide()
                }
            }
        })

        let shouldStartNewWave = true

        enemies.forEach((enemy) => {
            shouldStartNewWave = shouldStartNewWave && enemy.x < 0
        })

        if (shouldStartNewWave) {
            nextWave()
        }

        if (player.lives <= 0) {
            entities.forEach((ent, i) => {
                entities[i].x = -100000

                context.font = "50px arial"
                context.fillStyle = "white"
                context.fillText("YOU DIED", canvas.width / 2, canvas.height / 2)
                context.stroke()
            })
        }
    } else {
        context.font = "50px arial"
        context.fillStyle = "black"
        context.fillText("Press any key", canvas.width / 2, canvas.height / 2)
        context.stroke()
        if (keyUp) {
            isPlaying = true
        }
        if (keyDown) {
            isPlaying = true
        }
        if (keyLeft) {
            isPlaying = true
        }
        if (keyRight) {
            isPlaying = true
        }
    }
}

function ResizeWindow() {
    canvas = document.getElementById("main")
    canvas.width = document.getElementsByTagName("body")[0].clientWidth;
    canvas.height = document.getElementsByTagName("body")[0].clientHeight;
}

window.onload = () => {
    context.font = "50px arial"
    context.textAlign = "center"
    context.fillStyle = "black"

    player = new Player()

    nextWave()

    entities.push(player)

    ResizeWindow()
    window.addEventListener("keydown", ParseKeyDown)
    window.addEventListener("keyup", ParseKeyUp)
    window.addEventListener("resize", ResizeWindow)

    setInterval(FrameUpdate, 1000 / 60);

    setInterval(() => {
        time++
    }, 100)
}


