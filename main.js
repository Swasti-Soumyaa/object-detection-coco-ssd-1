
img="";
status="";
object=[];



function setup(){
    canvas=createCanvas(500,400)
    canvas.center()

    video=createCapture(VIDEO)
    video.size(500,500)
    video.hide()

    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status:detecting objects"
}

function modelLoaded(){
    console.log(" Model Loaded");
    status=true;
    
}

function gotresult(error,result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result)
        object=result;
    }
}

function draw(){
    image(video,0,0,500,400)
    
    if (status!= "" ){
        document.getElementById("status").innerHTML="Status: objects detected "
        objectDetector.detect(video,gotresult)

        r=random(255)
        g=random(255)
        b=random(255)

        for (i=0; i<object.length; i++){
            fill(r,g,b)
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15)
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            document.getElementById("no-of-object").innerHTML="No of objects detected: "+object.length;
        }

    }
}