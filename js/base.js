var gameState = {
    'gold':2000,
    'upkeep':0,
    'wood':50,
    'food':20,
    'constructedRooms':[],
    'staff':[],
    'setting_up':true
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