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

        let dateSpan = document.getElementById('date_span')
        if (dateSpan){
            guiManager.dateSpan = dateSpan
        } else {
            throw 'Day Span not found'
        }

        let tempSpan = document.getElementById('temp_span')
        if (tempSpan){
            guiManager.tempSpan = tempSpan
        } else {
            throw 'Temp Span not found'
        }

        let customerQueue = document.getElementById('customer_queue')
        if(customerQueue){
            guiManager.customerQueue = customerQueue
        } else {
            throw 'Customer Queue not found'
        }

    },
    updateText:function(element, message){
        element.innerHTML = message
    },
    addCustomerElement:function(customer){
        let customer_div = document.createElement('div')
        customer_div.classList.add(['customer','fade-in'])
        customer_div.id = customer.customerKey

        let name_span = document.createElement('span')
        name_span.classList.add(['customer','name'])
        let name_text = document.createTextNode(customer.name)
        name_span.appendChild(name_text)


        customer_div.appendChild(name_span)
        guiManager.customerQueue.appendChild(customer_div)

    },
    removeCustomerElement:function(key){
        let customerElement = document.getElementById(key)
        customerElement.remove();
    }
}

