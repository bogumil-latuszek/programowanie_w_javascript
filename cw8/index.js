var start = document.getElementById("start");
var reset = document.getElementById("reset");

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

animate()
function animate(){
    // aktualizuj polozenie 
    UpdatePositions(balls);
    //wyczysc canvas
    ctx.clearRect(0, 0, canv.width, canv.height);
    // narysuj na canvas
    DrawBalls(balls);
    requestAnimationFrame(animate) // this loops to the start, calling itself but will be processed only on request
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