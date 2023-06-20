const play=document.getElementById('start')
const reset=document.getElementById('reset')
const minute=document.getElementById('minute')
const second=document.getElementById('second')

var id, secCount, prevSecCount,minCount, prevMinCount, playButtonStatus;


//IDEAS 
//1. TELL HOW MANY HOURS PASSED SINCE START OF THE STOPWATCH
//2. A TRIANGLE ICON IN PLACE OF A START BUTTON <i class="fa-solid fa-play"></i> <i class="fa-solid fa-play-pause"></i>
//3. A PAUSE ICON(||) IN PLACE OF STOP BUTTON <i class="fa-solid fa-pause"></i>
//4. A REFRESH ICON IN PLACE OF RESET BUTTON <i class="fa-solid fa-arrows-rotate"></i>
//5. A HOVER WHICH TELLS US ABOUT THE BUTTON
//6. SOLVE THE ANOMOLY ENCOUNTERED WHEN START BUTTON IS CLICKED WHEN THE STOPWATCH IS RUNNING



(function(){
    prevMinCount=0;
    prevSecCount=0;
    playButtonStatus='play'
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
            if(secCount==59){
                secCount=0;
                minCount++;
            }
            
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
            minute.innerHTML=`<p>${min}</p>`
            second.innerHTML=`<p>${sec}</p>`
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
    minute.innerHTML=`<p>00</p>`
    second.innerHTML=`<p>00</p>`
    play.innerHTML=
    `<i class="fa-solid fa-play"></i>
    <div class="cloud">Play</div>`
})