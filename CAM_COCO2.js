  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/jfKOcOpUo/';
  
  // Video
 // let capture;
  //let constraints = {audio: false, video: {facingMode: {exact: "environment"}}};
  //let constraints = {audio: false, video: true};

  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
  createCanvas(displayWidth, displayHeight);
  let constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  };
  capture = createCapture(constraints);
  capture.hide();
    // flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(capture, 0, 0);

    // Draw the label
    fill(255);
    textSize(26);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    //flippedVideo = ml5.flipImage(video)
    classifier.classify(capture, gotResult);
    //flippedVideo.remove();
    //CAMvideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }
