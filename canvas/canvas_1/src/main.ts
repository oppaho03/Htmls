const canvas : HTMLCanvasElement | null = <HTMLCanvasElement> document.getElementById('main');

if ( canvas ) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // animate();
}

// focus object
const mousePos = {
    x : 0,
    y : 0
};

type mousePosObject = {
    x : number,
    y : number
}

// data : colorpallet
// from Adobe Color cc
const colorPallet = [ 
    "#F28442",
    "#FDD99F",
    "#C0D1B8",
    "#98ACB3",
    "#00838D"
];

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
    circleArray.forEach( item => item.update( mousePos ) );
}

class Circle {    
    
    x : number;
    y : number;    
    mx : number; //(Math.random() - 0.5) * 8;
    my : number; //(Math.random() - 0.5) * 8;
    radius : number;    
    minRadius : number = 2;
    maxRadius = 50;    
    
    fillColor : string;

    constructor(x:number, y:number, mx : number, my : number, radius : number) {
        
        this.x = x;
        this.y = y;
        this.mx = mx;
        this.my = my;
        this.radius = radius;
        this.minRadius = radius;

        // this.fillColor = colorPallet[Math.random() * colorPallet.length];
        this.fillColor = colorPallet[Math.floor(Math.random() * colorPallet.length)]; // 소수점 반올림

    }

    draw () {
        if ( !canvas ) return;
        const cxt = canvas.getContext('2d');
        if( !cxt ) return;

        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // cxt.strokeStyle = 'blue';
        // cxt.stroke();
        
        cxt.fillStyle = this.fillColor;
        cxt.fill();
    }

    update ( mousePos : mousePosObject ) {

        if ( this.x + this.radius > innerWidth || this.x - this.radius < 0  ) {
            this.mx *= -1;
        }
        if ( this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
            this.my *= -1;
        }

        this.x += this.mx;
        this.y += this.my;

        // interactivity
        if ( mousePos.x - this.x < 50 
            && mousePos.x - this.x > -50 
            && mousePos.y - this.y < 50 
            && mousePos.y - this.y > -50 ) {
            // circle 인스터스와 mouse 좌표 근접 시
            if ( this.radius < this.maxRadius ) {
                // this.radius 최대 40px
                this.radius += 1;
            }
        }
        else if ( this.radius > this.minRadius ) {
            // circle 인스터스와 mouse 좌표 멀어질 시
            // + this.radius 최소 2px 리사이즈
            this.radius -= 1;
        }
        
      
        this.draw();        
    }
}

const circleArray : Circle[] = [];
for ( let count = 0; count < 500; count ++ ) {
    // let [x, y, mx, my, radius] = [ 200, 200 , 4, 4, 30];
    // let x = Math.random() * innerWidth;
    // let y = Math.random() * innerHeight;
    let radius = Math.random() * 3 + 1;    
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;

    
    // mi : move intval
    // * INT 값에 비례하여 속도 증가
    let mi = (Math.random() - 0.5) * 4; 
    let mx = mi, my = mi;

    circleArray.push(new Circle(x, y, mx, my, radius));
}

animate();
