//document.body
document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    const key = ev.key
    const sound = 'tink'
    playSound(sound)
}

function playSound(sound){
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}