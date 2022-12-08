var canv = document.getElementById("canvas");
var balls = [];

canv.width = canv.offsetWidth;
canv.height = canv.offsetHeight;

var ctx = canv.getContext("2d");
ctx.beginPath();

//default data structure
let ball = {
    x: 130,
    y: 60,
    radius: 5,
    velocity: 1,
    last_updated_time: performance.now(),
    vectorx: 1,
    vectory: -1
}
GenerateRandomBalls(30, balls, canv);
let stop_animating = false;

var start_button = document.getElementById("start");
start_button.addEventListener("click", ()=>{
    stop_animating = false;
    animate();
});

var reset_button = document.getElementById("reset");
reset_button.addEventListener("click", ()=>{
    stop_animating = true;
    ctx.clearRect(0, 0, canv.width, canv.height);
    GenerateRandomBalls(30, balls, canv);
});

function animate(){
    if(stop_animating){
       return true; // get out 
    }
    // aktualizuj polozenie 
    UpdatePositions(balls);
    //wyczysc canvas
    ctx.clearRect(0, 0, canv.width, canv.height);
    // narysuj na canvas
    DrawBalls(balls);
    //dodaj linie
    const lines = createLines(balls, 100);
    DrawLines(lines);
    //end animation on condition
    if(!stop_animating){
        requestAnimationFrame(animate) // this loops to the start, calling itself but will be processed only on request
    }
}

function GenerateRandomBalls(quantity, balls_list, canvas){
    for(let i = 0; i <quantity ; i++){
        const ball = {
            x: canvas.width * Math.random(),
            y: canvas.height * Math.random(),
            radius: 6 +  6 * Math.random(),
            velocity: 100,
            last_updated_time: performance.now(),
            vectorx: -1 + 2 * Math.random(),
            vectory: -1 + 2 * Math.random()
        }
        balls_list.push(ball);
    }
}

function UpdatePositions(balls_list){
    balls_list.forEach(b => {
        let time_difference = (performance.now() - b.last_updated_time) / 1000 ;// time past last frame(in seconds)
        b.x = b.x + b.vectorx * b.velocity * time_difference; // calculate new position x 
        b.y = b.y + b.vectory * b.velocity * time_difference; // calculate new position y
        b.last_updated_time = performance.now();
    });
}

function DrawBalls(balls_list){
    balls_list.forEach(element => {
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function DrawLines(lines){
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    lines.forEach(element => {
        ctx.beginPath();
        ctx.moveTo(element.x1, element.y1)
        ctx.lineTo(element.x2, element.y2);
        ctx.stroke();
    });
}

function createLines(balls_list, draw_distance){
    let lines = [];
    for(let i = 0; i< balls_list.length-1; i++){
        for(let a = i + 1; a< balls_list.length; a++){
            let distance = getDistanceBetween2Points(balls_list[i].x, balls_list[i].y, balls_list[a].x, balls_list[a].y)
            if(distance < draw_distance){
                let new_line = {
                    x1 : balls_list[i].x, 
                    y1 : balls_list[i].y,
                    x2 : balls_list[a].x,
                    y2 : balls_list[a].y
                }
                lines.push(new_line);
            }
        }
    }
    return lines;
}
function getDistanceBetween2Points(x1, y1, x2, y2){
    var a = x1 - x2;
    var b = y1 - y2;

    var c = Math.sqrt( a*a + b*b );
    return c;
}
/*
animate()
function animate(){
    // aktualizuj polozenie 
    // narysuj na canvas
    requestAnimationFrame(animate) // this loops to the start, calling itself but will be processed only on request
}

async func actualPoloz(kulka){
    return kulka *2
}

const kulki =[1,2,3,45,6]

const nowe polozenia promise = [];
for (const kulka of kulki) {
    nowePolozeniaPromise.push(aktualizujPoloz(kulka));
}

const result = await Promise.all(nowePolozeniaPromise);
*/