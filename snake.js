import { isFoodEaten,randomIntFromInterval,getDirections } from "./utils.js";
import { WIDTH,SPEED } from "./constants.js";

export class Snake{
    constructor(ctx,x,y,directions){
        this.ctx = ctx
        this.head = {x:x,y:y}
        this.growthCounter = 0
        this.directions = directions
        this.speed = SPEED
        this.snake = [{...this.head}]
        this.snakeBody = new Set([...this.snake])
        this.currentDirection = this.directions[randomIntFromInterval(0,3)]
        this.boundaryCoordinateMax = WIDTH - this.speed
    }
    move(isFoodAvailable,lastFoodCoordinates){
        // console.log(this.snake,lastFoodCoordinates);
        let {dx,dy} = this.currentDirection
        this.ctx.clearRect(this.head.x,this.head.y,20,20)
        let newX = this.head.x + dx;
        let newY = this.head.y + dy;

        if(newX <= 0 || newY <= 0 || newX >= this.boundaryCoordinateMax || newY >= this.boundaryCoordinateMax){
            throw new Error("Game Over")
        }
        this.head.x = newX
        this.head.y = newY

        if(this.collidedWithItself()){
            throw new Error("Game Over")
        }
        this.snake.push({...this.head})
        this.snakeBody.add(`${this.head.x},${this.head.y}`)

        if(isFoodEaten(isFoodAvailable,this.head,lastFoodCoordinates)){
            this.growthCounter += 5;
            return true
        }

        if(this.growthCounter > 0){
            this.growthCounter --
        }else{
            const tail = this.snake.shift()
            this.snakeBody.delete(`${tail.x},${tail.y}`)
        }
        return false
    }

    increaseSpeed(){
        this.speed += 1
        this.directions = getDirections(this.speed)
        this.boundaryCoordinateMax = WIDTH - this.speed
        console.log(this.directions);
    }

    collidedWithItself(){
        return this.snakeBody.has(`${this.head.x},${this.head.y}`)
    }

    changeDirection(key){
        switch(key){
            case 'ArrowUp':
                if(this.currentDirection === this.directions[1]){
                    return
                }
                this.currentDirection = this.directions[0]
                break;
            case 'ArrowDown':
                if(this.currentDirection === this.directions[0]){
                    return
                }
                this.currentDirection = this.directions[1]
                break;
            case 'ArrowLeft':
                if(this.currentDirection === this.directions[3]){
                    return
                }
                this.currentDirection = this.directions[2]
                break;
            case 'ArrowRight':
                if(this.currentDirection === this.directions[2]){
                    return
                }
                this.currentDirection = this.directions[3]
                break;
        }   
    }

    draw(){
        this.ctx.fillRect(this.x,this.y,20,20);
    }

    drawSnake(){
        this.snake.forEach((segment) => {
            this.ctx.fillRect(segment.x,segment.y,20,20);
        })
    }
}
