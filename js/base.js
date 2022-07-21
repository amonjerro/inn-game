var gameState = {
    resources:{
        gold:2000,
        wood:50,
        food:20,
        stone:0
    },
    upkeep:{
        gold:0,
        wood:0,
        food:0,
        stone:0
    },
    spaces:{
        staff:0,
        guests:0
    },
    prestige:1,
    generation:{
        building:1,
        gold:0,
        food:0,
        wood:0,
        stone:0
    },
    availableRooms:[],
    occupiedRooms:[],
    staff:[],
    isCurrentlyBulding:false,
    currentlyBuilding:null,
    setting_up:true
}

var logicManager = {

}

function setUp(){
    try{
        guiInfoUtils.detectElements()
        weatherUtils.setHourlyTemps()
        buildUtils.hashUpHalfBuilts()
        buildUtils.initializeAvailableBuildingList()
        timeUtils.startClock(logicManager.timeManager.normalTickSize)
        gameState.setting_up = false
        console.log('Done setting up!')
    } catch(e){
        console.error(e)
    }
    
}


//General Utility Functions
function lerp(min_val, max_val, point){
    return (max_val-min_val)*point+min_val
}

function to_percent(float_value){
    return Math.round(float_value * 100)
}