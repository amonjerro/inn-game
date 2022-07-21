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

        //Building Progress
        let buildingProgress = document.getElementById('building_progress')
        if(buildingProgress){
            guiManager.buildingProgress = buildingProgress
        } else {
            throw 'Building Progress Div not found'
        }

        //Message Toast
        let messageToast = document.getElementById('toast')
        if (messageToast){
            guiManager.messageToast = messageToast
        } else {
            throw 'No Message Toast Div found'
        }
    },
    removeAvailableBuilding:function(id){
        let buildingElement = document.getElementById(id)
        buildingElement.remove()
    },
    addAvailableBuilding:function(building, key){
        let building_div = document.createElement('div')
        building_div.classList.add('building-container')
        building_div.id = key
        building_div.dataset.key = key

        let head_div = document.createElement('div')
        head_div.classList.add('building', 'head')
        let body_div = document.createElement('div')
        body_div.classList.add('building', 'body')


        let name_span = document.createElement('span')
        name_span.classList.add('building', 'title')
        let name_text = document.createTextNode(building.name)
        name_span.appendChild(name_text)
        head_div.appendChild(name_span)

        let description_span = document.createElement('span')
        description_span.classList.add('building')
        let descriptionText = document.createTextNode(building.description)
        description_span.classList.add('building', 'subtitle')

        description_span.appendChild(descriptionText)
        body_div.appendChild(description_span)

        
        building_div.appendChild(head_div)
        building_div.appendChild(body_div)
        building_div.onclick = function(event){
            container = event.target.closest('.building-container')
            if (gameState.isCurrentlyBulding){
                guiInfoUtils.showToast('Something is already being built!', 'error')
                return null
            }
            buildUtils.assignBuilding(container.dataset.key)
        }
        guiManager.availableBuildings.appendChild(building_div)
    },
    showBuilding(key){
        building = document.getElementById(key)
        building.classList.add('fade-in', 'building-showing')
    },
    setUpBuildingProgress:function(building){
        let progress_div = document.createElement('div')
        progress_div.classList.add('progress-container')

        let progress_bar_container = document.createElement('div')
        let progress_text_container = document.createElement('span')
        progress_text_container.classList.add('progress-text')
        progress_text_container.appendChild(document.createTextNode('Progress'))


        progress_bar_container.classList.add('progress-bar-bg')
        let progress_bar_bar = document.createElement('div')
        progress_bar_bar.classList.add('progress-bar-progress')
        
        progress_div.appendChild(progress_text_container)
        progress_bar_container.appendChild(progress_bar_bar)
        progress_div.appendChild(progress_bar_container)
        guiManager.buildingProgress.appendChild(progress_div)
    },
    updateBuildingProgress:function(progress_percentage){
        let prc = ''+progress_percentage+'%'
        let progressbar = document.querySelector('.progress-bar-progress')
        progressbar.style.width = prc
    },
    tearDownBuildingProgress:function(){
        guiManager.buildingProgress.children[0].remove()
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
    },
    showToast:function(message, toastType){
        let messageToastSpan = guiManager.messageToast.children[0]
        messageToastSpan.innerHTML = message
        guiManager.messageToast.classList.add('fade-in', toastType)
        guiManager.messageToast.classList.remove('fade-out')
        setTimeout(()=>{
            guiManager.messageToast.classList.add('fade-out')
            guiManager.messageToast.classList.remove('fade-in', toastType)
        }, 2000)
    }
}

