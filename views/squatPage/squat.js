// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/J8-G4eWbz/"; // 임시 URI - stand , squart, bent(허리 굽은 자세) 학습.
let model, webcam, ctx, labelContainer, maxPredictions;


// 갯수 count
var count = 0;
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
var status = "stand";

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    
    if (prediction[0].probability.toFixed(2) > 0.9) { // 서있는 상태
        if (status == "squat"){ // 전에 스쿼트 상태였다면, 일어날 때 카운트를 하나 올려줘야 함.
            count++;
            var audio = new Audio('./sound/' + count%10 + '.wav');
            audio.play();
            counter.textContent = count;
            
        }
        status = "stand"
        
    } else if (prediction[1].probability.toFixed(2) == 1.00) { // 스쿼트 자세
        status = "squat"
        
    } else if (prediction[2].probability.toFixed(2) == 1.00) { // 굽은 자세(잘못된 케이스)
        if (status == "squat" || status == "stand") { // 굽은 자세로 잘못 수행하면, 소리 나도록
            var audio = new Audio('./sound/bad.mp3');
            audio.play();
            
        }
        status = "bent"
        console.log(status);
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


// 사용자 정보 API

let userName = 0

$.get('/api/users/name', function(data) {
    userName = data.user.user_name
    console.log(data.user.user_name)
})
$(document).ready(function(){
    $('#savecount').click(function(){
        
  
        $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'get',
            url : '/api/users/name',
            dataType : 'JSON',

            success : function(datas) {

                let user_name = datas.user_name
                $.ajax({
                    contentType : "application/json; charset=utf-8",
                    type : 'post',
                    url : '/api/users/countupdate',
                    dataType : 'JSON',
                    data : JSON.stringify({
                        "name" : userName,
                        "count" : count
                    }),

                    success : function(datas)
                    {
                        if (datas.success)
                        {
                            alert("저장 성공 !")
                        }
                    }
                })
            }
        })
    })
})



