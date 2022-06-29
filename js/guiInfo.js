var guiManager = {
    clockSpan:null
}



var guiInfoUtils = {
    detectElements:function(){
        //Clock Span
        let clockSpan = document.getElementById('clock_span')
        if (clockSpan){
            guiManager.clockSpan = clockSpan
        } else {
            throw 'Clock Span not found'
        }
    },
    updateText:function(element, message){
        element.innerHTML = message
    }
}

