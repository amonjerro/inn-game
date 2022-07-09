var guiManager = {
    clockSpan:null,
    dateSpan:null,
    tempSpan:null,
    customerQueue:null
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

        //Calendar
        let dateSpan = document.getElementById('date_span')
        if (dateSpan){
            guiManager.dateSpan = dateSpan
        } else {
            throw 'Day Span not found'
        }
        
        //Temperature
        let tempSpan = document.getElementById('temp_span')
        if (tempSpan){
            guiManager.tempSpan = tempSpan
        } else {
            throw 'Temp Span not found'
        }

        //Customer Queue
        let customerQueue = document.getElementById('customer_queue')
        if(customerQueue){
            guiManager.customerQueue = customerQueue
        } else {
            throw 'Customer Queue not found'
        }

        //Available Buildings
        let availableBuildings = document.getElementById('building_options')
        if (availableBuildings){
            guiManager.availableBuildings = availableBuildings
        } else {
            throw 'Available Buildings Div not found'
        }

    },
    removeAvailableBuilding:function(id){
        let buildingElement = document.getElementById(id)
        buildingElement.remove()
    },
    addAvailableBuilding:function(building){
        let building_div = document.createElement('div')
        building_div.classList.add('building', 'fade-in')
        building_div.id = building.key

        let name_div = document.createElement('div')
        name_div.classList.add('building', 'name')
        let name_span = document.createElement('span')
        name_span.classList.add('building', 'title')
        let name_text = document.createTextNode(building.name)
        name_span.appendChild(name_text)
        name_div.appendChild(name_span)

        let description_span = document.createElement('span')
        let descriptionText = document.createTextNode(building.description)
        description_span.classList.add('building', 'subtitle')

        description_span.appendChild(descriptionText)
        name_div.appendChild(description_span)

        building_div.appendChild(name_div)
        building_div.onclick = function(event){
            console.log(event.target)
        }
        guiManager.availableBuildings.appendChild(building_div)
    },
    updateText:function(element, message){
        element.innerHTML = message
    },
    addCustomerElement:function(customer){
        let customer_div = document.createElement('div')
        customer_div.classList.add('customer', 'fade-in')
        customer_div.id = customer.customerKey

        let name_div = document.createElement('div')
        name_div.classList.add('customer', 'name')
        let name_span = document.createElement('span')
        let name_text = document.createTextNode(customer.name)
        name_span.appendChild(name_text)
        name_div.appendChild(name_span)

        let night_div = document.createElement('div')
        night_div.classList.add('customer', 'nights')
        let night_infoSpan = document.createElement('span')
        let night_infoText = document.createTextNode('Nights Needed: ')

        let night_span = document.createElement('span')
        let nights_text = document.createTextNode(customer.nightsNeeded)
        night_span.appendChild(nights_text)
        night_infoSpan.appendChild(night_infoText)
        night_div.appendChild(night_infoSpan)
        night_div.appendChild(night_span)

        customer_div.appendChild(name_div)
        customer_div.appendChild(night_div)
        guiManager.customerQueue.appendChild(customer_div)

    },
    removeCustomerElement:function(key){
        let customerElement = document.getElementById(key)
        customerElement.remove();
    }
}

