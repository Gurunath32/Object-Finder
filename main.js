status="";

function preload() {}

function setup() {
    canvas=createCanvas(680,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function start() {
    console.log("test");
    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects=results;
    }
} 

function draw() {
    image(video,0,0,600,420);

    if(status != "") {
        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video,gotresult);

        for(i=0;i < objects.length; i++) {
            fill(r,g,b);
            percentage=floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percentage +"%",objects[i].x +15,objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==object_name) {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML= object_name+" Found";
        synth=window.speechSynthesis;
        utterthis=new SpeechSynthesisUtterance(object_name+"Found");
        synth.speak(utterthis);
    }
    else {
        document.getElementById("status").innerHTML= object_name+" Not Found";
    }
}
        }
}