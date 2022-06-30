// const Utils = require("./utils.ts");
// import { randomIntFromRange } from "./utils";
import * as Utils from "./utils";

// global function
const canvas : HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('main');
const circleArray : Circle[] = []; 

// focus object
const mousePos = { x : 0, y : 0 };

type mousePosObject = { x : number, y : number }

( function() {

    // event bind : resize
    window.addEventListener( 'resize', () => {
        if ( canvas ) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    } );    

    // event bind : mousemove
    window.addEventListener( 'mousemove', ( e : MouseEvent ) => {
        mousePos.x = e.x;
        mousePos.y = e.y;
    } );

    if ( canvas ) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

} ) ();



// data : colorpallet
// from Adobe Color cc
const colorPallet = [ 
    "#F28442",
    "#FDD99F",
    "#C0D1B8",
    "#98ACB3",
    "#00838D"
];

// variable : gravity
let gravity = 1;

// class circle 
class Circle {
    x : number;
    y : number; 
    
    mx : number; // velocity
    my : number; 
    radius : number;
    mass : number = 1;
    opacity : number = 0;
   
    fillColor : string;    

    constructor(x:number, y:number, mx:number, my:number, radius : number) {
        
        this.x = x;
        this.y = y; 
        this.mx = mx;       
        this.my = my;
        this.radius = radius;

        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)]; // 소수점 반올림
    }

    draw () { 
        const cxt = canvas?.getContext('2d');
        if( !canvas || !cxt ) return;

        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        
        cxt.save();
        
        cxt.globalAlpha = this.opacity;
        cxt.fillStyle = this.fillColor; 
        cxt.fill();
        
        cxt.restore();

        cxt.strokeStyle = this.fillColor; 
        cxt.stroke();
        cxt.closePath();
    }

    update () {
        if ( !canvas ) return;

        

        // this.x += this.mx;
        // this.y += this.my;
        circleArray.forEach( (item) => {
            if (this == item  ) return;

            if ( Utils.getDistance(this.x, this.y, item.x, item.y) - (this.radius * 2) < 0 ) {
                // collided
                resolveCollision(this, item);
            }
        } );

        if ( this.x + this.radius >= canvas.width || this.x - this.radius <= 0 ) {
            this.mx *= -1;
        }

        if ( this.y + this.radius >= canvas.height || this.y - this.radius <= 0 ) {
            this.my *= -1;
        }

        // mouse 충돌 감지
        if ( Utils.getDistance(mousePos.x, mousePos.y, this.x, this.y) < 40 && this.opacity < 0.5 ) {
            this.opacity += 0.02;            
        }
        else if ( this.opacity > 0 ) {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.mx;
        this.y += this.my;        

        this.draw();
    }
}

// animation loop
function animate () {        
    const cxt = canvas?.getContext('2d');
    if ( !canvas || !cxt ) return;
    else cxt.clearRect(0, 0, innerWidth, innerHeight);

    /*
     # window.requestAnimationFrame()
     - 브라우저에 애니메이션을 알리고, repaint 진행 전에 해당 애니메이션을 업데이트하는 함수를 호출
     - canvas, SVG 애니메이션 구현에서 사용
    */
    requestAnimationFrame(animate);    
    circleArray.forEach( item => item.update() );
}

// 충돌 
function resolveCollision ( original:Circle, other:Circle ) {
    const mxDiff = original.mx - other.mx;
    const myDiff = original.my - other.my;

    const mx = other.x - original.x;
    const my = other.y - original.y;

    // 충돌 방지
    if ( mxDiff * mx + myDiff * my >= 0 ) {
        // 충돌하는 두 원 사이의 각도 구하기
        const angle = -Math.atan2( other.y - original.y, other.x - original.x );

        const m1 = original.mass;
        const m2 = other.mass;

        // 방정식 전 속도
        const u1 = rotate( {x : original.mx, y : original.my}, angle );
        const u2 = rotate( {x : other.mx, y : other.my}, angle );

        // 방정식 후 속도
        const v1 = { x: u1.x * (m1 - m2) / (m1 * m2) + u2.x * 2 * m2 / (m1 + m2), y : u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 * m2) + u1.x * 2 * m2 / (m1 + m2), y : u2.y };

        // 축을 원래 위치로 다시 회전시킨 후의 최종 속도
        const vFianl1 = rotate(v1, -angle);
        const vFianl2 = rotate(v2, -angle);

        // 사실적인 바운스 효과를 위해 입자 속도 변경
        original.mx = vFianl1.x;
        original.my = vFianl1.y;
        
        other.mx = vFianl2.x;
        other.my = vFianl2.y;
    }
}

function rotate(velocity:{x:number, y:number}, angle:number) {
    const rotatedVelocities = {
        x : velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y : velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

// create Circle instance
function init () {
    if ( !canvas ) return;


    for ( let count = 0; count < 500; count ++ ) {
        // let radius = Utils.randomIntFromRange(0, 50);
        let radius = 20;
        let x = Utils.randomIntFromRange(radius, (canvas.width - radius));
        let y = Utils.randomIntFromRange(radius, (canvas.height - radius));

        // mi : move intval
        // * INT 값에 비례하여 속도 증가
        let mi = (Math.random() - 0.5) * 4; 
        let mx = mi, my = mi;        

        circleArray.push(new Circle(x, y, mx, my, radius));
    }        

    animate();
};

init();

