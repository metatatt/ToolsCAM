  // Classifier Variable
  let classifier;
  // Model URL
 //let imageModelURL = 'https://teachablemachine.withgoogle.com/models/jfKOcOpUo/';
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/pQn1hi6pC/'  //G drive Model 0404/2022
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  // Video
 let capture;
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
  createCanvas(w, h);
  let constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  };
  capture = createCapture(constraints);
  capture.size(w,h);
  console.log('Capture sized w * h ');
  capture.hide();
    // flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(255, 204, 0);
    // Draw the video
    console.log('Draw Capture ');
    image(capture, 0, 0, w, h);

    // Draw the label
    fill(255);
    textSize(52);
    textAlign(CENTER);
    text(label, w / 2, h / 2);
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
    label = results[0].label+ "\n" +" -confidence (%): "+results[0].confidence.toFixed(2)*100; 
    console.log(results[0]);
    // Classifiy again!
    classifyVideo();
  }
