import { WIDTH, HEIGHT } from "./constants.js"

export class FoodGenerator{
    constructor(ctx){
        this.ctx = ctx
        this.lastFood = {
            x: 0,
            y: 0
        }
        this.foodAvailable = false
    }

    generateFood(){
        // console.log('Generating Food...');

        // Generate Random Coordinates
        let x = Math.floor(Math.random() * (WIDTH-200))
        let y = Math.floor(Math.random() * (HEIGHT-200))

        this.lastFood.x = x
        this.lastFood.y = y

        this.foodAvailable = true

        return true
    }

    drawFood(){
        let {x,y} = this.lastFood
        this.ctx.beginPath();
        this.ctx.arc(x,y,10,0,Math.PI*2);

        this.ctx.fillStyle = "red"
        this.ctx.fill();
        this.ctx.fillStyle = "black" // Setting back to default
    }

    isFoodAvailable(){
        return this.foodAvailable
    }

    clearFood(){
        // console.log('Clearing Food...');
        
        this.ctx.clearRect(this.lastFood.x,this.lastFood.y,20,20)
        this.foodAvailable = false
    }
}