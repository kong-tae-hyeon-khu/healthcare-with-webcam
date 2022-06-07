// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/xymjZj4q-/"; // 임시 URI - stand , squart, bent(허리 굽은 자세) 학습.
let model, webcam, ctx, labelContainer, maxPredictions;

// 상태 : 서있는 상태로 초기화
let status = "stand" ;
// 갯수 count
let count = 0;
var counter = document.getElementById("counter");
counter.textContent = count;
counter.className = "hidden";

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    var target = document.getElementById("youtube");
    target.className = "visible";

    var target2 = document.getElementById("title");
    target2.className = "click_title";

    counter.className = "circle";
    
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    webcam.style
    window.requestAnimationFrame(loop);
    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    let status = "stand"
    if (prediction[0].probability.toFixed(2) > 0.9) { // 서있는 상태
        if (status == "squat"){ // 전에 스쿼트 상태였다면, 일어날 때 카운트를 하나 올려줘야 함.
            count++;
            var audio = new Audio('./sound/' + count%10 + '.wav');
            audio.play();
            counter.textContent = count;
            console.log(count);
        }
        status = "stand"
    } else if (prediction[1].probability.toFixed(2) == 1.00) { // 스쿼트 자세
        status = "squat"
    } else if (prediction[2].probability.toFixed(2) == 1.00) { // 굽은 자세(잘못된 케이스)
        if (status == "squart" || status == "stand") { // 굽은 자세로 잘못 수행하면, 소리 나도록
            var audio = new Audio('./sound/bad.mp3');
            audio.play();
        }
        status = "bent"
    }

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}