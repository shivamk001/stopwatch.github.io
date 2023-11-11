const play=document.getElementById('start')
const playCloud=document.getElementById('playCloud')
const reset=document.getElementById('reset')
const resetCloud=document.getElementById('resetCloud')
const minute=document.getElementById('minute')
const second=document.getElementById('second')
const arm=document.getElementById('arm')
var id, secCount, prevSecCount,minCount, prevMinCount, playButtonStatus;


//IIFE
(function(){
    prevMinCount=0;
    prevSecCount=0;
    playButtonStatus='play'
    prevAngle=0;
    angle=6
    arm.style.position='absolute';
    arm.style.top='0%';
    arm.style.left='50%';


    //adjust the size of i tags inside start/stop and reset buttons according to windows height
    let windowHeight=window.innerHeight
    if(windowHeight<400){
        reset.children[0].classList.add('fa-2xs')
        play.children[0].classList.add('fa-2xs')
    }
    else if(windowHeight>=400 && windowHeight<800){
        reset.children[0].classList.add('fa-xs')
        play.children[0].classList.add('fa-xs')
    }
    else if(windowHeight>=800 && windowHeight<1100){
        
        reset.children[0].classList.add('fa-lg')
        play.children[0].classList.add('fa-lg')
    }
    else if(windowHeight>=1100){
        reset.children[0].classList.add('fa-2xl')
        play.children[0].classList.add('fa-2xl')
    }
})()


play.addEventListener('click',function(req, res){
    
    //logic to start the stopwatch
    if(playButtonStatus=='play'){
        console.log(`Start Clicked, prevMin: ${prevMinCount}, prevSec: ${prevSecCount}`)
        secCount=prevSecCount;
        minCount=prevMinCount;
        let min, sec;


        play.innerHTML=`<i class="fa-solid fa-pause"></i>`
        playCloud.textContent='Stop'

        playButtonStatus='pause'

        //setInterval to increment secCount every second and increment minCount every 60 seconds
        id=setInterval(function(){
            secCount++;

            //increment minCount every 60 seconds
            if(secCount==60){
                secCount=0;
                minCount++;
            }

            //if minCount=100 reset the stopwatch
            if(minCount==100){
                clearInterval(id);
                secCount=0;
                minCount=0;
            }

            //rotate the arm
            let angleStr=angle+'deg'
            arm.style.transform=`rotate(${angleStr})`

            prevAngle=angle
            angle=prevAngle+6;
            
            if(secCount<10){
                sec='0'+secCount
            }
            else{
                sec=secCount
            }
    
            if(minCount<10){
                min='0'+minCount
            }
            else{
                min=minCount
            }

            //display minutes and seconds in html/css
            minute.innerHTML=`<div class="font">Min</div><div class="font">${min}</div>`
            second.innerHTML=`<div class="font">Sec</div><div class="font">${sec}</div>`
        },1000)

    }
    //logic to stop the stopwatch
    else if(playButtonStatus=='pause'){
        play.innerHTML=`<i class="fa-solid fa-play"></i>`
        playCloud.textContent='Start'

        playButtonStatus='play'

        //this logic is useful when we stop the watch and need to resume if afterwards
        prevMinCount=minCount;
        prevSecCount=secCount;
        clearInterval(id);
    }
})

//to reset the secCount and minCount when reset button clicked
reset.addEventListener('click',function(req, res){

    clearInterval(id);
    id=undefined

    prevMinCount=0;
    prevSecCount=0;
    minCount=0;
    secCount=0;
    minute.innerHTML=`<div class="font">Min</div><div class="font">00</div>`
    second.innerHTML=`<div class="font">Sec</div><div class="font">00</div>`
    play.innerHTML=
    `<i class="fa-solid fa-play"></i>
    <div class="cloud">Play</div>`
    arm.style.transform=`rotate(0deg)`
    playButtonStatus='play'
    angle=6
})