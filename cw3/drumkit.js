//document.body
document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    console.log(ev)
    const key = ev.key
    let sound = 'boom'
    switch(key.toLowerCase()){
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
        case 'r':
            PlayChannelRecording(channel1Recording);
            break;
        default:
            sound = 'boom'
            break;
    }
    playSound(sound)
}
function ArchiveSound(sound){
    if(sound == 'tink'){
        const soundRecorded = {
            sound: sound,
            time: Date.now()
        }
        addSoundToRecording(channel1Recording, soundRecorded)
    }
}
let channel1Recording = []
function addSoundToRecording(channelRecording , newSoundRecorded){
    channelRecording.push(newSoundRecorded)
}

function PlayChannelRecording(channelRecording){
    for (let i = 0; i < channelRecording.length; i++) {
        if(i >= channelRecording.length-1){
            break;
        }
        let awaitTime = (channelRecording[i+1].time - channelRecording[i].time)
        const myTimeout = setTimeout(()=>{playSound(channelRecording[i].sound)}, awaitTime);
        //console.log("scheduled" + " " + i + ": " + channel1Recordings[i].sound )
      }
}

function playSound(sound){
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}