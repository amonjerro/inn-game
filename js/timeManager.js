var timeManager = {
    masterClock:null,
    currentTick:0,
    tickSize:2000,
    ticksPerHour:16,
    currentHour:0,
    hoursPerDay:24,
    currentDay:0,
    daysPerMonth:28,
    currentMonth:0
}

var timeUtils = {
    startClock: function (){
        logicManager.timeManager.masterClock = setInterval(function(){
            logicManager.timeManager.currentTick += 1
            if (logicManager.timeManager.currentTick == logicManager.timeManager.ticksPerHour){
                logicManager.timeManager.currentHour += 1
                logicManager.timeManager.currentTick = 0
            }
            if (logicManager.timeManager.currentHour == logicManager.timeManager.hoursPerDay){
                logicManager.timeManager.currentDay += 1
                logicManager.timeManager.currentHour = 0
            }
            if (logicManager.timeManager.currentTick == logicManager.timeManager.daysPerMonth){
                logicManager.timeManager.currentMonth += 1
                logicManager.timeManager.currentDay = 0
            }
        }, logicManager.timeManager.tickSize)
    },
    stopClock: function(){
        clearInterval(logicManager.timeManager.masterClock)
    },
    pollClock: function(){
        return logicManager.timeManager.currentTick
    }
}

logicManager.timeManager = timeManager
