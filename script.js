const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const container2=document.querySelector('.container-2');
let intervel;
let time=[0,0,0,0];
function leadingZero(time)
{
    if(time<10)
      time="0"+time
    return time;
}
let timer;
function runTimer(){
    timer = `${leadingZero(time[0])}:${leadingZero(time[1])}:${leadingZero(time[2])}`;
    theTimer.textContent=timer;
    time[3]++;
    time[0] = Math.floor((time[3]/100)/60);
    time[1] = Math.floor((time[3]/100) - time[0] *60);
    time[2] = Math.floor(time[3] - time[1]*100 - time[0]*6000);
}
function startTimer(){
    let textLength = testArea.value.length;
    if( textLength == 0 && bool){

         interval = setInterval(runTimer, 10);
         bool = false;

    }
}
function checkCorrectness(){
    let originalText=originText;
    let text=testArea.value;
    if(text==originalText){
         testWrapper.style.borderColor="green";
         clearInterval(interval);
         console.log();
         theTimer.style.color="green";
        
         //Past Records
         const history=document.createElement('div');
         history.setAttribute("data-content",timer);
         history.classList.add('box');
         history.textContent=`${new Date()}`;
         container2.append(history);
         //Wpm speed cal
         let x=420;
         let y=theTimer.textContent;
         const arr =y.split(":");
         console.log(arr);
         let min =Number(arr[0])*60+Number(arr[1])/60;
        //  console.log(min);
        const wpm=(x/5)/min;
        testArea.value=` Your Test Score:
             ->${theTimer.textContent} is your time
             ->${wpm} is Your Speed in wpm(Words Per Minute)
        Play again to beat yourself`;
        resetButton.textContent="Retake Test";
        }
    else if(text==originalText.substr(0,text.length))
    {
        testWrapper.style.borderColor = "blue";
        theTimer.style.color="blue";
    }
    else{
    testWrapper.style.borderColor = "orange";
    theTimer.style.color="orange";
    }
}
let bool=true;

function resetAll(e){
    e.preventDefault();
    testArea.value = "";
    bool = true;
    testWrapper.style.borderColor = "gray";
   
    time = [0,0,0,0];
    timer = `${leadingZero(time[0])}:${leadingZero(time[1])}:${leadingZero(time[2])}`;
    theTimer.textContent = timer;
    clearInterval(interval);
    
    console.log("Reset Clicked");
}
testArea.addEventListener('keypress',startTimer);

testArea.addEventListener('keyup', checkCorrectness);

resetButton.addEventListener('click', resetAll);