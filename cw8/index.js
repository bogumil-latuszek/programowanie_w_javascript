var canv = document.getElementById("canvas");
var balls = [];

canv.width = canv.offsetWidth;
canv.height = canv.offsetHeight;

var ctx = canv.getContext("2d");
ctx.beginPath();

var fps_counter = document.getElementById("fps_counter");
var ball_counter = document.getElementById("ball_counter");

var SliderY = document.getElementById("sliderY");
var SliderX = document.getElementById("sliderX");

var Y = window.screen.width/5
SliderY.value = Y;// lenght of line between two balls
SliderY.min = 0;
SliderY.max = canv.width;

var X =  SliderX.value;// num of balls


SliderY.addEventListener("change", ()=>{
    Y = SliderY.value;
})

SliderX.addEventListener("change", ()=>{
    X = SliderX.value;
    if(X > balls.length) {
        numberOFBallsToAdd = X - balls.length;
        for(let i = 0; i < numberOFBallsToAdd; i++){
            let newBall = GenerateRandomBall(canv);
            balls.push(newBall)
        }
    }
    else{
        numberOFBallsToSubstract = balls.length - X;
        for(let i = 0; i < numberOFBallsToSubstract; i++){
            balls.pop();
        }
    }
    
})

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
GenerateRandomBalls(X, balls, canv);
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
    balls = [];
    GenerateRandomBalls(X, balls, canv);
});

function animate(){
    if(stop_animating){
       return true; // get out 
    }
    //wyswietl ilosc kulek(balls)
    ball_counter.innerText = "ilosc kulek:" +((balls) ? balls.length : 0)
    // aktualizuj polozenie 
    UpdatePositions(balls);
    //wyczysc canvas
    ctx.clearRect(0, 0, canv.width, canv.height);
    // narysuj na canvas
    DrawBalls(balls);
    //dodaj linie
    const lines = createLines(balls, Y);
    DrawLines(lines);
    //show fps
    fps_counter.innerText = "fps:" + fps_mean_value;
    //end animation on condition
    if(!stop_animating){
        requestAnimationFrame(animate) // this loops to the start, calling itself but will be processed only on request
    }
}

function GenerateRandomBalls(quantity, balls_list, canvas){
    for(let i = 0; i <quantity ; i++){
        var ball = GenerateRandomBall(canvas);
        balls_list.push(ball);
    }
}

function GenerateRandomBall(canvas){
    const ball = {
        x: canvas.width * Math.random(),
        y: canvas.height * Math.random(),
        radius: 6 +  6 * Math.random(),
        velocity: 100,
        last_updated_time: performance.now(),
        vectorx: -1 + 2 * Math.random(),
        vectory: -1 + 2 * Math.random()
    }
    return ball;
}

function UpdatePositions(balls_list){
    const Border={
        x0 : 0,
        xn : canv.width,
        y0 : 0,
        yn : canv.height
    }
    balls_list.forEach(b => {
        let time_difference = (performance.now() - b.last_updated_time) / 1000 ;// time past last frame(in seconds)
        b.x = b.x + b.vectorx * b.velocity * time_difference; // calculate new position x 
        b.y = b.y + b.vectory * b.velocity * time_difference; // calculate new position y
        
        UpdateConsideringBorderCollision(b, Border); //redirect balls

        b.last_updated_time = performance.now();
    });
}

function UpdateConsideringBorderCollision(ball, border){
    let b = ball;
    if(b.x > border.xn){
        b.x = border.xn
        b.vectorx = - b.vectorx;
    }
    if(b.x < border.x0){
        b.x = border.x0
        b.vectorx = - b.vectorx;
    }
    if(b.y > border.yn){
        b.y = border.yn
        b.vectory = - b.vectory;
    }
    if(b.y < border.y0){
        b.y = border.y0
        b.vectory = - b.vectory;
    }
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


//code below records  fps:
var fps_mean_value = 0;
var fps_recording = [];

function update_fps(fps){
    if(fps_recording.length >=10){
        var sum = 0;
        var quantity = 0;
        fps_recording.forEach(element => {
            sum += element;
            quantity += 1;
        });
        fps_mean_value = sum / quantity;
        fps_recording = []
    }
    else{
        fps_recording.push(fps)
    }
}

var lastCalledTime;

function start_recording_fps() {

  if(!lastCalledTime) {
     lastCalledTime = performance.now();
  }
  else{
    delta = (performance.now() - lastCalledTime)/1000;
    lastCalledTime = performance.now();
    let fps = 1/delta;
    update_fps(fps);
  }
  requestAnimationFrame(start_recording_fps);
} 

//code above records fps

//start recording fps:
start_recording_fps();
//////////////////////