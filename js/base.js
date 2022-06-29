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
        timeUtils.startClock()
        gameState.setting_up = false
        console.log('Done setting up!')
    } catch(e){
        console.error(e)
    }
    
}
