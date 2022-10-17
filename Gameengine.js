alert("Hello, Visitor !! Welcome to My Game Page.")

const playdiv = document.getElementById("playsimulate")
const p1health = document.getElementById('p1Health')
const p2health = document.getElementById("p2Health")
const play1div = document.getElementById('Player1')
const play2div = document.getElementById('Player2')
const resultdiv = document.getElementById("showresult")
const resetbtn = document.getElementById('resetbutton')
const updateGame  = (p1,p2,gameState) => {
    play1div.innerText = p1.name

    play2div.innerText = p2.name
    p1health.innerText = p1.health
    p2health.innerText = p2.health

    if(p1.health <=0 || p2.health <= 0 ){
        game.isOver = true
        gameState = game.isOver
        alert(game.declareWinner(game.isOver,p1,p2))
        
        return gameState
    }


}

class Player {
    constructor(name, health, attackDamage) {
        this.name = name
        this.health = health
        this.attackDamage=attackDamage
    }
    strike(player, enemy, attackDamage) {
          let damageAmount = Math.ceil(Math.random() * attackDamage )
          enemy.health -= damageAmount
          updateGame(p1,p2,game.isOver)
          return `${player.name} attacks ${enemy.name} for ${damageAmount} Damage`
    }
    heal(player) {
        let hpamount = Math.ceil(Math.random() * 5)
        player.health += hpamount
        updateGame(p1,p2,game.isOver)

        return `${player.name} heals for ${hpamount} HP!`


    }
}

class Game {
    constructor() {
        this.isOver = false        
    }
    declareWinner(isOver, p1, p2){
        let msg ='TIE'
        if(isOver == true && p1.health <= 0){
            msg = `${p2.name} Wins`
        }
        else if(isOver == true && p2.health <= 0){
            msg = `${p1.name} Wins`
        }
        document.getElementById('victory').play()
        
        return msg

    }
    reset(p1,p2){
            p1.health = 100
            p2.health = 100
            this.isOver = false
            // resultdiv.innerText = ''
            updateGame(p1, p2,this.isOver)
    }
    play(p1,p2) {
        this.reset(p1,p2)

        while(!this.isOver){
            p1.strike(p1,p2,p1.attackDamage)
            p2.heal(p2)
            p2.strike(p2,p1,p2.attackDamage)
            p1.heal(p1)

        }
        return this.declareWinner(this.isOver, p1, p2)
    }
} 
let player1 = new Player("Player 1", 100, 10)
let player2 = new Player("Player 2", 100, 8)



// let gamer1 = prompt("Enter Name of Player No. 1")
// // let gamer2 = prompt("Enter Name of Player No. 2")
// if(gamer1 == null || gamer1 == ""){
//     alert("Enter The Player Name 'You Dumbass'")
//     nameofplayer()
// }
// else{
//     p1.name = gamer1
//     // p2.name = gamer2
// }

let p1  = player1
let p2  = player2

updateGame(p1, p2,Game.isOver)

let game = new Game()

playdiv.onclick = () => game.play(p1,p2)
resetbtn.onclick = () => game.reset(p1,p2)

let gameState

document.addEventListener('keydown',function(e){
    if(e.key == 'q' && p2.health >= 0 && game.isOver == false){
        p1.strike(p1, p2, p1.attackDamage)
        document.getElementById('p1attack').play()
    }
    


})
document.addEventListener('keydown',function(e){
    if(e.key == "a" && p2.health >=0 && game.isOver == false ){
    p1.heal(p1)
    document.getElementById('p1heal').play()
    }

})
document.addEventListener('keydown',function(e){
    if(e.key == "e" && p1.health >= 0 && game.isOver == false){
        p2.strike(p2, p1, p2.attackDamage)
        document.getElementById('p2attack').play()
    }



})
document.addEventListener('keydown',function(e){
    if(e.key == "d" && p1.health >=0){
        p2.heal(p2)
        document.getElementById('p2heal').play()

    }

})

