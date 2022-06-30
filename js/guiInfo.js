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

        let dateSpan = document.getElementById('date_span')
        if (dateSpan){
            guiManager.dateSpan = dateSpan
        } else {
            throw 'Day Span not found'
        }

        let tempSpan = document.getElementById('temp_span')
        if (tempSpan){
            guiManager.tempSpan = tempSpan
        } else {
            throw 'Temp Span not found'
        }
    },

    updateText:function(element, message){
        element.innerHTML = message
    }
}

