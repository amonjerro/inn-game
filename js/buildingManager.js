let buildingFactory = {
    buildSmallRoom:function(){
        return {
            upkeep:{food:0,gold:3,wood:0,stone:0},
            spaces:{staff:0,guests:2},
            isRoom:true,
            buildTime:5
        }
    },
    buildMiddleRoom:function(){
        return {
            upkeep:{food:0,gold:10,wood:0,stone:0},
            spaces:{staff:0,guests:4},
            isRoom:true,
            buildTime:10
        }
    },
    buildLargeRoom:function(){
        return {
            upkeep:{food:0,gold:40,wood:0,stone:0},
            spaces:{staff:0,guests:8},
            isRoom:true,
            buildTime:15
        }
    },
    buildTavern:function(){
        return {
            upkeep:{food:0,gold:30,wood:20,stone:0},
            spaces:{staff:4,guests:20},
            isRoom:false,
            buildTime:28
        }
    }
}

let buildings = {
    'ROOM_S':{
        fn:buildingFactory.buildSmallRoom,
        cost:{gold:60,wood:40,stone:30},
        name:'Small Room',
        description:'A little tight, but cozy.',
        isAvailable:true,
        multiBuildable:true,
        alreadyBuilt:false
    },
    'ROOM_M':{
        fn:buildingFactory.buildMiddleRoom,
        cost:{gold:100,wood:60,stone:45},
        name:'Medium Room',
        description:'Fits your standard, 4-people party.',
        isAvailable:true,
        multiBuildable:true,
        alreadyBuilt:false,
    },
    'ROOM_L':{
        fn:buildingFactory.buildLargeRoom,
        cost:{gold:240,wood:100,stone:60},
        name:'Large Room',
        description:'A room, but large.',
        isAvailable:false,
        multiBuildable:true,
        alreadyBuilt:false,
    },
    'TAVERN':{
        fn:buildingFactory.buildTavern,
        cost:{gold:400,wood:250,stone:250},
        name:'Tavern',
        description:'Adventurers need a place to cool their throats. After all, dungeoning is hard work',
        isAvailable:false,
        multiBuildable:false,
        alreadyBuilt:false,
    }
}

var buildUtils = {
    assignBuilding:function(building_name){
        let building = buildings[building_name].fn()
        gameState.isCurrentlyBulding = true
        gameState.currentlyBuilding.building = building
        guiInfoUtils.setUpBuildingProgress(building)
    },
    initializeAvailableBuildingList:function(){
        let keys = Object.keys(buildings)
        for (let k = 0; k < keys.length; k++){
            guiInfoUtils.addAvailableBuilding(buildings[keys[k]], keys[k])
            if (buildings[keys[k]].isAvailable){
                guiInfoUtils.showBuilding(keys[k])
            }
        }
    },
    updateProgress:function(){
        if (!gameState.isCurrentlyBulding){
            return false;
        }

        gameState.currentlyBuilding.progress += gameState.generation.building;

        if (gameState.currentlyBuilding.progress == gameState.currentlyBuilding.building.buildTime){
            //Stop the building progress
            gameState.isCurrentlyBulding = false;
            
            //Unset the progress asignment
            guiInfoUtils.tearDownBuildingProgress()

            //Update the game state
            let building = gameState.currentlyBuilding.building

            gameState.upkeep.food += building.upkeep.food
            gameState.upkeep.gold += building.upkeep.gold
            gameState.upkeep.wood += building.upkeep.wood
            gameState.upkeep.stone += building.upkeep.stone

            gameState.spaces.staff += building.spaces.staff
            gameState.spaces.guests += building.spaces.guests

            if (building.isRoom){
                gameState.availableRooms.push({
                    guests:[],
                    max_vacancy:building.spaces.guests
                })
            }

            gameState.currentlyBuilding = {}

            return false;
        }

        let pf = gameState.currentlyBuilding.progress / gameState.currentlyBuilding.building.buildTime
        let perc = to_percent(pf)
        guiInfoUtils.updateBuildingProgress(perc)
    }
}

