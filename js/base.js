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
    prestige:1,
    constructedRooms:[],
    staff:[],
    isCurrentlyBulding:false,
    currentlyBuilding:{
        progress:0,
        building:null
    },
    setting_up:true
}

var logicManager = {

}

function setUp(){
    try{
        guiInfoUtils.detectElements()
        weatherUtils.setHourlyTemps()
        timeUtils.startClock()
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