var constraints = { audio: true, video: true };

navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    let hiddenVideo = document.querySelector('video.hidden') // A video that is not displayed to the user 
    hiddenVideo.srcObject = mediaStream // Play the stream on the hidden video
    
    let canvas = document.querySelector('canvas'); // Get a canvas element, by creating or querying it (it may be hidden using 'display:none')
    let ctx = canvas.getContext('2d');
    let rVFC = () => {
        ctx.drawImage(hiddenVideo, 0, 0, hiddenVideo.videoWidth, hiddenVideo.videoHeight); // Draw the video image on your canvas
        // ... Manipulate your canvas here ...
        hiddenVideo.requestVideoFrameCallback(rVFC)
    }
    hiddenVideo.requestVideoFrameCallback(rVFC)
    
    var video = document.querySelector('video.shown');
    video.srcObject = canvas.captureStream(); // Display the canvas edit on the video
}).catch(function(err) { console.log(err.name + ": " + err.message); });