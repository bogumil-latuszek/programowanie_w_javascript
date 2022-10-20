//document.body
document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    console.log(ev)
    const key = ev.key
    let sound = 'boom'
    switch(key){
        case '1':
            sound ='tink'
            break;
        case '2':
            sound ='hihat'
            break;
        case '3':
            sound ='kick'
            break;
        case '4':
            sound ='openhat'
            break;
        default:
            sound = 'boom'
            break;
    }
    playSound(sound)
}

function playSound(sound){
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}