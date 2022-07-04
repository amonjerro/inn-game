var timeManager = {
    masterClock:null,
    currentTick:0,
    tickSize:100,
    ticksPerHour:16,
    currentHour:0,
    hoursPerDay:24,
    currentDay:1,
    daysPerMonth:28,
    currentMonth:0,
    amPm:true
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


var timeUtils = {
    startClock: function (){
        logicManager.timeManager.masterClock = setInterval(function(){
            logicManager.timeManager.currentTick += 1
            if (logicManager.timeManager.currentTick == logicManager.timeManager.ticksPerHour){
                logicManager.timeManager.currentHour += 1
                logicManager.timeManager.currentTick = 0
                weatherUtils.setHourlyTemps()
            }
            if (logicManager.timeManager.currentHour == logicManager.timeManager.hoursPerDay){
                logicManager.timeManager.currentDay += 1
                logicManager.timeManager.currentHour = 0
            }
            if (logicManager.timeManager.currentTick == logicManager.timeManager.daysPerMonth){
                logicManager.timeManager.currentMonth = timeUtils.getNextMonth()
                logicManager.timeManager.currentDay = 1
            }

            //Update Visible Clock
            guiInfoUtils.updateText(guiManager.clockSpan, timeUtils.getTimeString())
            guiInfoUtils.updateText(guiManager.dateSpan, timeUtils.getDateString())

            //Update Temperature
            guiInfoUtils.updateText(guiManager.tempSpan, weatherUtils.tempToString())


        }, logicManager.timeManager.tickSize)
    },
    getNextMonth:function(){
        return (logicManager.timeManager.currentMonth + 1)%MONTHS.length
    },
    stopClock: function(){
        clearInterval(logicManager.timeManager.masterClock)
    },
    pollClock: function(){
        return logicManager.timeManager.currentTick
    },
    getDateString:function(){
        let day = timeManager.currentDay
        let month = timeManager.currentMonth
        
        let suffix = 'th'
        if (day == 1 || day == 21){
            suffix = 'st'
        } else if (day == 2 || day == 22){
            suffix = 'nd'
        } else if (day == 3 || day == 23){
            suffix = 'rd'
        }
        day = ' '+day
        return MONTHS[month]+day+suffix
    },
    getHourFraction:function(){
        return Math.floor( timeManager.currentTick / (timeManager.ticksPerHour/4) )
    },
    getTimeString: function(){
        let tickString = ''
        switch( timeUtils.getHourFraction() ){
            case 0:
                tickString = ':00'
                break;
            case 1:
                tickString = ':15'
                break;
            case 2:
                tickString = ':30'
                break;
            case 3:
                tickString = ':45'
                break;
        }
        let hour = timeManager.currentHour
        if (timeManager.amPm){
            let hourString = ''
            let suffix = hour >= 12 ? ' pm' : ' am'
            hour = hour % 12
            if (hour == 0){
                hourString = '12'
            } else if (hour < 10){
                hourString = '0'+hour
            } else {
                hourString += hour
            }
            return hourString + tickString + suffix
        } else {
            let hourString = ''
            if (hour < 10){
                hourString += '0'+hour
            } else {
                hourString += hour
            }
            return hourString + tickString
        }
    }
}

logicManager.timeManager = timeManager
