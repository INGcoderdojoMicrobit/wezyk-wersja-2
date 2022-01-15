namespace SpriteKind {
    export const glowa = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    doRight()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    doLeft()
})
function doRight () {
    if (diry == -1) {
        diry = 0
        dirx = 1
    } else if (diry == 1) {
        diry = 0
        dirx = -1
    } else if (dirx == 1) {
        diry = 1
        dirx = 0
    } else if (dirx == -1) {
        diry = -1
        dirx = 0
    }
}
sprites.onOverlap(SpriteKind.glowa, SpriteKind.Player, function (sprite, otherSprite) {
    if (ruszamsie == 0) {
        game.over(false, effects.dissolve)
    }
})
function doGenerujJedzonko () {
    jeszczeraz = 0
    zarelko = sprites.create(img`
        . . . . 7 7 7 . 
        . . . 7 . . . . 
        . . 2 2 2 2 . . 
        . 2 2 2 2 2 2 . 
        . 2 2 2 2 2 2 . 
        . 2 2 2 2 2 2 . 
        . 2 2 2 2 2 2 . 
        . . 2 2 2 2 . . 
        `, SpriteKind.Food)
    while (jeszczeraz == 0) {
        jeszczeraz = 1
        zarX = randint(8, maxX - 8)
        zarY = randint(8, maxY - 8)
        for (let value of sprites.allOfKind(SpriteKind.Player)) {
            if (value.x == zarX && value.y == zarY) {
                jeszczeraz = 0
            }
        }
        if (glowa_spr.x == zarX && glowa_spr.y == zarY) {
            jeszczeraz = 0
        }
    }
    zarelko.setPosition(zarX, zarY)
}
sprites.onOverlap(SpriteKind.glowa, SpriteKind.Food, function (sprite, otherSprite) {
    music.pewPew.play()
    otherSprite.destroy(effects.hearts, 200)
    info.changeScoreBy(1)
    rosnij = 1
    doGenerujJedzonko()
})
function doLeft () {
    if (diry == -1) {
        diry = 0
        dirx = -1
    } else if (diry == 1) {
        diry = 0
        dirx = 1
    } else if (dirx == 1) {
        diry = -1
        dirx = 0
    } else if (dirx == -1) {
        diry = 1
        dirx = 0
    }
}
let staryY = 0
let staryX = 0
let zarY = 0
let zarX = 0
let zarelko: Sprite = null
let jeszczeraz = 0
let ruszamsie = 0
let tablica_cialo: Sprite[] = []
let cialo_spr: Sprite = null
let glowa_spr: Sprite = null
let rosnij = 0
let diry = 0
let dirx = 0
let maxY = 0
let maxX = 0
maxX = 160
maxY = 124
dirx = 1
diry = 0
rosnij = 0
let glowa2 = img`
    3 3 3 3 3 3 3 3 
    3 9 3 . . 3 9 3 
    3 3 3 3 3 3 3 3 
    3 . 3 9 9 3 . 3 
    3 . 3 9 9 3 . 3 
    3 3 3 3 3 3 3 3 
    3 9 3 . . 3 9 3 
    3 3 3 3 3 3 3 3 
    `
glowa_spr = sprites.create(glowa2, SpriteKind.glowa)
glowa_spr.setStayInScreen(true)
let cialko = img`
    9 9 9 9 9 9 9 9 
    9 9 . . . . 9 9 
    9 9 9 . . 9 9 9 
    9 . 9 9 9 9 . 9 
    9 . . 9 9 . . 9 
    9 . 9 9 9 9 . 9 
    9 9 9 . . 9 9 9 
    9 9 9 9 9 9 9 9 
    `
for (let index = 0; index <= 4; index++) {
    cialo_spr = sprites.create(cialko, SpriteKind.Player)
    cialo_spr.setPosition(glowa_spr.x, glowa_spr.y + (index + 1) * 8)
    tablica_cialo.push(cialo_spr)
}
doGenerujJedzonko()
game.onUpdateInterval(100, function () {
    ruszamsie = 1
    staryX = glowa_spr.x
    staryY = glowa_spr.y
    if (rosnij == 0) {
        tablica_cialo.insertAt(0, tablica_cialo.pop())
    } else {
        cialo_spr = sprites.create(cialko, SpriteKind.Player)
        tablica_cialo.insertAt(0, cialo_spr)
        rosnij = 0
    }
    glowa_spr.x = staryX + dirx * 8
    glowa_spr.y = staryY + diry * 8
    if (glowa_spr.x >= maxX) {
        glowa_spr.x = 0
    } else if (glowa_spr.x <= 0) {
        glowa_spr.x = maxX
    } else if (glowa_spr.y <= 0) {
        glowa_spr.y = maxY
    } else if (glowa_spr.y >= maxY) {
        glowa_spr.y = 0
    }
    tablica_cialo[0].setPosition(staryX, staryY)
    ruszamsie = 0
})
