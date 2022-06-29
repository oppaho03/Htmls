// 난수 생성기 
function randomIntFromRange(min:number, max:number) {
    return Math.floor( Math.random() * (max - min + 1 ) + min );
}

// export default ...
// export function () ...
export { randomIntFromRange };