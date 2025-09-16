export const isFoodEaten = (isFoodAvailable,head,lastFoodCoordinates) => {
    if (!isFoodAvailable) {
        return false
    }
    let headCenterX = head.x + 10;  // 20x20 rect => center is +10
    let headCenterY = head.y + 10;

    // Food center (x,y) already from arc
    let foodX = lastFoodCoordinates.x;
    let foodY = lastFoodCoordinates.y;

    // Distance between centers
    let dx = headCenterX - foodX;
    let dy = headCenterY - foodY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // If snake head overlaps circle
    if (distance < 10 + 10) { // snake radius (≈10) + food radius (10)
        // Eaten!
        console.log("Yum!");
        return true
    }
}

export function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function drawBorder(ctx,WIDTH,HEIGHT){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5; 
    ctx.strokeRect(0,0,WIDTH,HEIGHT);
}

export const getDirections = (speed) => ({
    0: { dx: 0, dy: -speed }, // Up
    1: { dx: 0, dy: speed },  // Down
    2: { dx: -speed, dy: 0 }, // Left
    3: { dx: speed, dy: 0 }   // Right
});