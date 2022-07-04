customerManager = {
    currentlyStaying:[],
    inQueue:[],
    appearanceRate:8
}

RACES = ['HUMAN','DWARF','ELF']
GENDERS = ['M','F']
RACE_NAMES ={
    'HUMAN':{
        'F':['Annia', 'Irina', 'Fiona'],
        'M':['Borden', 'Arthur', 'Thoma']
    },
    'DWARF':{
        'F':['Dunna', 'Gunnar', 'Hilda'],
        'M':['Eirik', 'Gloin', 'Brunnor']
    },
    'ELF':{
        'F':['Elwyn', 'Felnora', 'Alisae'],
        'M':['Dunael', 'Sallandal', 'Turandal']
    }
}




customerLogic = {
    createCustomer: function(){
        let race = Math.floor(Math.random()*RACES.length)
        let gender = Math.floor(Math.random()*GENDERS.length)
        let name = Math.floor(Math.random()*RACE_NAMES[race][gender].length)
        return {
            name:name,
            race:race,
            gender:gender
        }
    },
}

logicManager.customerManager = customerManager