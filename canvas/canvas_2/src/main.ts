import * as Utils from "./utils";

// global function
const canvas : HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('main');
const circleArray : Circle[] = []; 
( function() {

    // event bind : resize
    window.addEventListener( 'resize', () => {
        if ( canvas ) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
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
    mx : number;
    my : number; 
    radius : number;

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
        cxt.fillStyle = this.fillColor; 
        cxt.fill();
        // cxt.strokeStyle = 'blue';
        // cxt.stroke();
        cxt.closePath();
    }

    update () {
        if ( !canvas ) return;

        // move x
        // - x > 0 보다 크게 유지
        if ( this.x + this.radius >= canvas.width  || this.x - this.radius <= 0 ) {
            this.mx = -this.mx;
        }        

        // move y 
        if ( this.y + this.radius + this.my > canvas.height ) {
            this.my = -1 * this.my * 0.7; // -- 0.** is bouns countings (1 is infinit)
        }
        else {
            this.my += gravity; // -- gravity (speed)        
        }

        this.y += this.my;
        this.x += this.mx;        

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


// create Circle instance
function init () {
    if ( !canvas ) return;


    for ( let count = 0; count < 100; count ++ ) {
        let radius = Utils.randomIntFromRange(0, 50);
        let x = Utils.randomIntFromRange(radius, (canvas.width - radius));
        let y = Utils.randomIntFromRange(radius, (canvas.height / 2));
        let mx = Utils.randomIntFromRange(-2, 2);
        let my = Utils.randomIntFromRange(-2, 2);

        circleArray.push(new Circle(x, y, mx, my, radius));
    }        

    animate();
};

init();

