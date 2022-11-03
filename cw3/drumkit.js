//document.body
document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    console.log(ev)
    const key = ev.key
    let sound = 'boom'
    switch(key.toLowerCase()){
        case 'z':
            playAudio();
        case '1':
            sound ='tink'
            playSound(sound)
            ArchiveSound(sound)
            break;
        case '2':
            sound ='hihat'
            playSound(sound)
            ArchiveSound(sound)
            break;
        case '3':
            sound ='kick'
            playSound(sound)
            ArchiveSound(sound)
            break;
        case '4':
            sound ='openhat'
            playSound(sound)
            ArchiveSound(sound)
            break;
        case 'r':
            PlayChannelRecording(channel1Recording);
            break;
        default:
            sound = 'boom'
            playSound(sound)
            ArchiveSound(sound)
            break;
    }
}
function ArchiveSound(sound){
    let DateNow = new Date()
    const soundRecorded = {
        sound: sound,
        time: DateNow.getTime() //or maybe sth more precise?
    }
    addSoundToRecording(channel1Recording, soundRecorded)
}
let channel1Recording = []
function addSoundToRecording(channelRecording , newSoundRecorded){
    channelRecording.push(newSoundRecorded)
}

async function PlayChannelRecording(channelRecording){
    const start = new Date() 
    for (let i = 0; i < channelRecording.length; i++) {
        let awaitTime = (channelRecording[i].time - channelRecording[0].time )
        //const now = new Date()
        //const awaitFromStart = Math.abs(now - start);
        //await asyncPause(awaitTime)//.then(()=>{playSound(channelRecording[i].sound)})
        setTimeout(()=>{playSound(channelRecording[i].sound)}, awaitTime );//it shouldnt continue 
        //pause(awaitTime)
        //playSound(channelRecording[i].sound)
        console.log("scheduled" + " " + i + ": " + channelRecording[i].sound );
      }
}
function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
    return true;
}
async function asyncPause(time){
    setTimeout(time)
    return Promise.resolve()
}

function playAudio(){
    let audio1 = new Audio();
    audio1.src = 'sounds/clap.wav'
    audio1.play()
}
function playSound(sound){
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}