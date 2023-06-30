const play=document.getElementById('start')
const reset=document.getElementById('reset')
const minute=document.getElementById('minute')
const second=document.getElementById('second')
const arm=document.getElementById('arm')
var id, secCount, prevSecCount,minCount, prevMinCount, playButtonStatus;


//IDEAS 
//1. TELL HOW MANY HOURS PASSED SINCE START OF THE STOPWATCH
//2. A TRIANGLE ICON IN PLACE OF A START BUTTON <i class="fa-solid fa-play"></i> <i class="fa-solid fa-play-pause"></i>-done
//3. A PAUSE ICON(||) IN PLACE OF STOP BUTTON <i class="fa-solid fa-pause"></i>-done
//4. A REFRESH ICON IN PLACE OF RESET BUTTON <i class="fa-solid fa-arrows-rotate"></i>-done
//5. A HOVER WHICH TELLS US ABOUT THE BUTTON-done
//6. SOLVE THE ANOMOLY ENCOUNTERED WHEN START BUTTON IS CLICKED WHEN THE STOPWATCH IS RUNNING-done



(function(){
    prevMinCount=0;
    prevSecCount=0;
    playButtonStatus='play'
    prevAngle=0;
    angle=6
    arm.style.position='absolute';
    arm.style.top='0%';
    arm.style.left='50%';
})()


play.addEventListener('click',function(req, res){

    if(playButtonStatus=='play'){
        console.log(`Start Clicked, prevMin: ${prevMinCount}, prevSec: ${prevSecCount}`)
        secCount=prevSecCount;
        minCount=prevMinCount;
        let min, sec;


        play.innerHTML=
        `<i class="fa-solid fa-pause"></i>
        <div class="cloud">Pause</div>`
        playButtonStatus='pause'

        id=setInterval(function(){
            secCount++;
            if(secCount==60){
                secCount=0;
                minCount++;
            }

            console.log(`sec: ${secCount}, angle: ${angle}, prevangle: ${prevAngle}`)
            let angleStr=angle+'deg'
            arm.style.transform=`rotate(${angleStr})`
            console.log(`angle: ${angle}, ${arm.style.transform}`)
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
            console.log(`SECOND: ${sec}, MINUTE: ${min}`)
            minute.innerHTML=`<div class="font">Min</div><div class="font">${min}</div>`
            second.innerHTML=`<div class="font">Sec</div><div class="font">${sec}</div>`
        },1000)

    }
    else if(playButtonStatus=='pause'){
        play.innerHTML=
        `<i class="fa-solid fa-play"></i>
        <div class="cloud">Play</div>`
        playButtonStatus='play'
        console.log('Stop clicked', id)
        console.log(`secCount: ${secCount}, minCount: ${minCount}`)
        prevMinCount=minCount;
        prevSecCount=secCount;
        clearInterval(id);
        console.log(`Stopped: ${prevMinCount}, ${prevSecCount}`)
    }
    
})

reset.addEventListener('click',function(req, res){
    console.log('Reset clicked')
    clearInterval(id);
    id=undefined
    console.log(`ID: ${id}`);
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