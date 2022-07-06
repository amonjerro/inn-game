var customerManager = {
    currentlyStaying:[],
    inQueue:[],
    base_gold:10,
    base_level:1,
    appearanceRate:8
}

const SPECIES = ['HUMAN','DWARF','ELF']
const GENDERS = ['M','F']
const SPECIES_PROPERTY_MAP = {
    'HUMAN':{
        'name':{
            'F':['Annia', 'Irina', 'Fiona'],
            'M':['Borden', 'Arthur', 'Thoma']
        },
        'starting_gold':10,
        'prestige_resistance':1
    },
    'DWARF':{
        'name':{
            'F':['Dunna', 'Gunnar', 'Hilda'],
            'M':['Eirik', 'Gloin', 'Brunnor']
        },
        'starting_gold':20,
        'prestige_resistance':2
    },
    'ELF':{
        'name':{
            'F':['Elwyn', 'Felnora', 'Alisae'],
            'M':['Dunael', 'Sallandal', 'Turandal']
        },
        'starting_gold':15,
        'prestige_resistance':3
    }
}

var customerLogic = {
    createCustomer: function(){
        let race = SPECIES[Math.floor(Math.random()*SPECIES.length)]
        let gender = GENDERS[Math.floor(Math.random()*GENDERS.length)]

        let name_index = Math.floor(Math.random()*SPECIES_PROPERTY_MAP[race]['name'][gender].length)
        let name = SPECIES_PROPERTY_MAP[race]['name'][gender][name_index]
        let level = customerLogic.calculateStartingLevel(race)
        let starting_gold = customerLogic.calculateStartingGold(race, level)
        let nights_needed = customerLogic.calculateNightsNeeded(level)

        let keyString = 'customer_'+(Math.random()*1000000).toString(16)
        let new_customer = {
            customerKey:keyString,
            name:name,
            race:race,
            gender:gender,
            level:level,
            gold:starting_gold,
            nightsNeeded:nights_needed
        }
        guiInfoUtils.addCustomerElement(new_customer)
        logicManager.customerManager.inQueue.push(new_customer)
    },
    calculateStartingGold:function(race, level){
        let race_starting_modifier = SPECIES_PROPERTY_MAP[race]['starting_gold']
        return level * race_starting_modifier * logicManager.customerManager.base_gold
    },
    calculateStartingLevel:function(race){
        let prestige_modifier = Math.floor(Math.random()*gameState.prestige)
        let prestige_resistance = SPECIES_PROPERTY_MAP[race]['prestige_resistance']
        let possible_level = logicManager.customerManager.base_level * prestige_modifier - prestige_resistance
        return possible_level > 0 ? possible_level : 1
    },
    calculateNightsNeeded:function(level){
        return Math.floor(Math.random()*level)+1
    }
}

logicManager.customerManager = customerManager