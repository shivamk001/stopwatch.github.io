console.log("hello")

const start=document.getElementById('start')
const stop=document.getElementById('stop')
const reset=document.getElementById('reset')
const minute=document.getElementById('minute')
const second=document.getElementById('second')
var id;
var secCount, prevSecCount,minCount, prevMinCount;


//IDEAS 
//1. TELL HOW MANY HOURS PASSED SINCE START OF THE STOPWATCH
//2. A TRIANGLE ICON IN PLACE OF A START BUTTON <i class="fa-solid fa-play"></i> <i class="fa-solid fa-play-pause"></i>
//3. A PAUSE ICON(||) IN PLACE OF STOP BUTTON <i class="fa-solid fa-pause"></i>
//4. A REFRESH ICON IN PLACE OF RESET BUTTON <i class="fa-solid fa-arrows-rotate"></i>
//5. A HOVER WHICH TELLS US ABOUT THE BUTTON
//6. SOLVE THE ANOMOLY ENCOUNTERED WHEN START BUTTON IS CLICKED WHEN THE STOPWATCH IS RUNNING

(function(){
    prevMinCount=0;
    prevSecCount=0
})()
start.addEventListener('click',function(req, res){
    console.log(`Start Clicked, prevMin: ${prevMinCount}, prevSec: ${prevSecCount}`)
    secCount=prevSecCount;
    minCount=prevMinCount;
    let min, sec;
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
})

stop.addEventListener('click',function(req, res){
    console.log('Stop clicked', id)
    prevMinCount=minCount;
    prevSecCount=secCount;
    clearInterval(id);
    console.log(`Stopped: ${prevMinCount}, ${prevSecCount}`)
})

reset.addEventListener('click',function(req, res){
    console.log('Reset clicked')
    clearInterval(id);
    prevMinCount=0;
    prevSecCount=0;
    minCount=0;
    secCount=0;
    minute.innerHTML=`<p>00</p>`
    second.innerHTML=`<p>00</p>`
})