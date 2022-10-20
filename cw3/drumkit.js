//document.body
document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    console.log(ev)
    const key = ev.key
    let sound = 'boom'
    switch(key){
        case '1':
            sound ='tink'
            ArchiveSound(sound)
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
        case 'R':
            PlayChannel1Recording();
        case 'r':
            PlayChannel1Recording();
        default:
            sound = 'boom'
            break;
    }
    playSound(sound)
}
function ArchiveSound(sound){
    if(sound == 'tink'){
        const recording = {
            sound: sound,
            time: Date.now()
        }
        addChannel1Recording(recording)
    }
}
let channel1Recordings = []
function addChannel1Recording(channel1recording){
    channel1Recordings.push(channel1recording)
}

function PlayChannel1Recording(){
    for (let i = 0; i < channel1Recordings.length; i++) {
        playSound(channel1Recordings[i].sound)
        if(i == channel1Recordings.length-1){
            break;
        }
        let awaitTime = (channel1Recordings[i+1].time - channel1Recordings[i].time)
        let start = Date.now()
        do{

        }
        while(Date.now() - start < awaitTime)
      }
}

function playSound(sound){
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}