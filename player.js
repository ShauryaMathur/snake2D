export class Player{
    constructor(name){
        this.name = name
        this.score = 0
    }

    increaseScore(){
        this.score += 10
    }
}