const canvas : HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('main');

if ( canvas ) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // animate();
}

function animate() : void {        
    const cxt = canvas?.getContext('2d');
    if ( !canvas || !cxt ) return;
    else cxt.clearRect(0, 0, innerWidth, innerHeight);

    
    /*
     # window.requestAnimationFrame()
     - 브라우저에 애니메이션을 알리고, repaint 진행 전에 해당 애니메이션을 업데이트하는 함수를 호출
     - canvas, SVG 애니메이션 구현에서 사용
    */
    requestAnimationFrame(animate); // Recursion Function 

    // item.update();
    circleArray.forEach( item => item.update() );
}

class Circle {    
    
    x : number;
    y : number;    
    mx : number; //(Math.random() - 0.5) * 8;
    my : number; //(Math.random() - 0.5) * 8;
    radius : number;

    constructor(x:number, y:number, mx : number, my : number, radius : number) {
        
        this.x = x;
        this.y = y;
        this.mx = mx;
        this.my = my;
        this.radius = radius;

    }

    draw () {
        if ( !canvas ) return;
        const cxt = canvas.getContext('2d');
        if( !cxt ) return;

        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        cxt.strokeStyle = 'blue';
        cxt.stroke();
    }

    update () {

        if ( this.x + this.radius > innerWidth || this.x - this.radius < 0  ) {
            this.mx *= -1;
        }
        if ( this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
            this.my *= -1;
        }

        this.x += this.mx;
        this.y += this.my;

        this.draw();        
    }
}

const circleArray : Circle[] = [];
for ( let count = 0; count < 100; count ++ ) {
    // let [x, y, mx, my] = [ 200, 200 , 4, 4];
    let [x, y, mx, my] = [ Math.random() * innerWidth, Math.random() * innerHeight, (Math.random() - 0.5) * 4,  (Math.random() - 0.5) * 4 ];

    circleArray.push(new Circle(x, y, mx, my, 30));
}

console.log(circleArray);

animate();

// https://www.youtube.com/watch?v=yq2au9EfeRQ&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=3
