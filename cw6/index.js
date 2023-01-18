let canv_cont = document.getElementById("canvas-container")


let canv = document.getElementById("canvas")
canv.width = canv.offsetWidth;
canv.height = canv.offsetHeight;

var ctx = canv.getContext("2d");
ctx.beginPath();

let default_ball = {
    x: 130,
    y: 30,
    radius: 15,
    color: "blue",
    velocity: 40,
    last_updated_time: performance.now(),
    vectorx: 1,
    vectory: -1
}

let hole = {
    x: 400,
    y: 400,
    radius: 40,
    color: "black"
}

function UpdatePosition(ball){
    const Border={
        x0 : 0,
        xn : canv.width,
        y0 : 0,
        yn : canv.height
    }
    let time_difference = (performance.now() - ball.last_updated_time) / 1000 ;// time past last frame(in seconds)
    ball.x = ball.x + ball.vectorx * ball.velocity * time_difference; // calculate new position x 
    ball.y = ball.y + ball.vectory * ball.velocity * time_difference; // calculate new position y
    
    UpdateConsideringBorderCollision(ball, Border); //redirect balls

    ball.last_updated_time = performance.now();
}
function CheckIfSpheresCollided(obj1, obj2){
    let obj1_max_x = obj1.x + obj1.radius*0.8
    let obj1_min_x = obj1.x - obj1.radius*0.8
    let obj1_max_y = obj1.y + obj1.radius*0.8
    let obj1_min_y = obj1.y - obj1.radius*0.8

    let obj2_max_x = obj2.x + obj2.radius*0.8
    let obj2_min_x = obj2.x - obj2.radius*0.8
    let obj2_max_y = obj2.y + obj2.radius*0.8
    let obj2_min_y = obj2.y - obj2.radius*0.8

    if(obj1_max_x < obj2_max_x && obj1_min_x > obj2_min_x){
        if(obj1_max_y > obj2_min_y && obj1_max_y < obj1_max_y|| obj1_min_y < obj2_max_y && obj1_min_y > obj2_min_y)
        {
            return true
        }
    }
    if(obj1_max_y < obj2_max_y && obj1_min_y > obj2_min_y){
        if(obj1_max_x > obj2_min_x && obj1_max_x < obj1_max_x|| obj1_min_x < obj2_max_x && obj1_min_x > obj2_min_x)
        {
            return true
        }
    }
    return false


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

function DrawCircle(circle){
    ctx.strokeStyle = circle.color
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
}
window.addEventListener('deviceorientation', onDeviceMove)


function onDeviceMove(event) {
    //console.log(event.alpha +"  "+ event.beta +"  " + event.gamma +"  ")
    let beta_radian = Math.PI*(event.beta-90)/360
    let gamma_radian = Math.PI*(event.gamma)/360
    let x = Math.sin(gamma_radian)
    let y = Math.sin(beta_radian)
    default_ball.vectorx = x
    default_ball.vectory = y
    //console.log(vect1.x +" "+ vect1.y)
}

//beta: 0 =pochylony do tyłu na płasko 179=pochylony do przodu na płasko ~obrót po osi x(jezeli alfa  i gamma sa rowne 0)

let win = false
let start_time = performance.now()
function animate() {
    ctx.clearRect(0, 0, canv.width, canv.height);
    DrawCircle(hole)
    UpdatePosition(default_ball);
    DrawCircle(default_ball);
    if(CheckIfSpheresCollided(default_ball, hole)){
        ctx.clearRect(0, 0, canv.width, canv.height);
        win = true;
        let finished_time = (performance.now() - start_time) /1000
        canv_cont.innerHTML = `You win, time: ${finished_time} s`
        SaveTime(finished_time + "s")
    }
    if(!win){
        requestAnimationFrame(animate)
    }
}

requestAnimationFrame(animate)


function SaveToLocalStorage(key, item){
    const item_stringified = JSON.stringify(item)
    localStorage.setItem(key,  item_stringified );
}
function GetFromLocalStorage(key){
    const item_stringified = localStorage.getItem(key)
    const item = JSON.parse(item_stringified)
    return item
}
async function SaveTime(time){
    let saved_time = GetFromLocalStorage("saved_time");
    if(saved_time == null){
        saved_time = [];
    }
    saved_time.push(time);
    SaveToLocalStorage("saved_time", saved_time);
}