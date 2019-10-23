let rec = null;
let audioStream = null;

const recordButton = document.getElementById("recordbtn");

recordButton.addEventListener("click", startRecording);

function startRecording() {

    let constraints = { audio: true, video: false }

    recordButton.disabled = true;

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        const audioContext = new window.AudioContext();
        audioStream = stream;
        const input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 })
        rec.record()
    }).catch(function (err) {
        recordButton.disabled = false;
    });
    setTimeout(() => transcribeText(), 4000);

    function transcribeText() {
        recordButton.disabled = false;
        rec.stop()
        audioStream.getAudioTracks()[0].stop();
        rec.exportWAV(uploadSoundData);
    }
}

function uploadSoundData(blob) {
    let filename = new Date().toISOString();
    let xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        if (this.readyState === 4) {
          document.getElementById("outputAPI").innerHTML = `<strong>Comand: </strong>${e.target.responseText}`
            console.log(e.target.responseText)
        }
    };
    let formData = new FormData();
    formData.append("audio_data", blob, filename);
    xhr.open("POST", "/upload_sound", true);
    xhr.send(formData);
}
