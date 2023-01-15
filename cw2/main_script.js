var glider = new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    draggable: true,
    dots: '#dots',
    arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
    }
})

let pause_button = document.getElementById("stop")
pause_button.addEventListener("click", ()=>{
    if (cont == true) {
        cont = false;
        document.getElementById("stop_img").src="./images/play.png"
    }
    else{
        cont = true;
        document.getElementById("stop_img").src="./images/pause.png"
        StartAnimation();
    }
})

let curr_index = 0
let cont = true
async function StartAnimation(){
    setTimeout(() => {
        if (cont == false) {
            return;
        }
        if (curr_index < 2) {
            curr_index++
        }
        else{
            curr_index = 0;
        }
        glider.scrollItem(curr_index, false)
        requestAnimationFrame(StartAnimation)
    }, 2000)
}

StartAnimation()