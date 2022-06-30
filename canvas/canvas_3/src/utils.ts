// 난수 생성기 
function randomIntFromRange(min:number, max:number) {
    return Math.floor( Math.random() * (max - min + 1 ) + min );
}

// 거리 계산 
function getDistance(x1:number, y1:number, x2:number, y2:number) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) );
}


// export default ...
// export function () ...
export { randomIntFromRange, getDistance };