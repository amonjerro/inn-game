const SKY_STRINGS = ['Clear Skies', 'Partly Cloudy', 'Cloudy']
const WIND_STRINGS = ['Gentle Breeze', 'Windy', 'Strong Winds']
const RAIN_STRINGS = ['No Rain', 'Light Drizzle', 'Rain Storm', 'Pouring Rain']
const SNOW_STRINGS = ['No Snow', 'Light Snowfall', 'Snowstorm', 'Blizzard']

// Temperatures in ºC
const MONTHLY_MEAN_TEMPS = [-16,-13,-5,5,11,16,18,17,12,5,-4,-14]
const MONTHLY_RANGE = [5,5,4,4,3,4,5,4,3,3,4,4]

var weatherManager = {
    temp:0,
    hourlyTempValues:[],
    skies:0,
    atmosphereWater:0,
    wind:0,
    celsius:true
}

var weatherUtils = {
    toFahrenheit: function(c){
        return (c*(9/5))+32
    },
    makeDayTemp:function(month){
        let min_temp = MONTHLY_MEAN_TEMPS[month]-MONTHLY_RANGE[month] 
        return Math.floor(Math.random()*(2*MONTHLY_RANGE[month]) + min_temp)
    },
    setDayTemp:function(value){
        logicManager.weatherManager.temp = value
    },
    getHourlyVariation: function(hour){
        return -5*Math.cos((Math.PI*hour)/12)
    },
    getCurrentTemp: function(){
        let hourlyTempValues = logicManager.weatherManager.hourlyTempValues
        if (hourlyTempValues.length < 2){
            throw 'Hourly values are effed'
        }
        let max_val = hourlyTempValues[0] > hourlyTempValues[1] ? hourlyTempValues[0] : hourlyTempValues[1]
        let min_val = hourlyTempValues[0] > hourlyTempValues[1] ? hourlyTempValues[1] : hourlyTempValues[0]
        return lerp(min_val, max_val, timeUtils.getHourFraction()/4)
    },
    tempToString:function(){
        let currentTemp = weatherUtils.getCurrentTemp()
        currentTemp = Math.round(currentTemp * 10) / 10
        let suffix = ''
        if (logicManager.weatherManager.celsius){
            suffix = 'ºC'
        } else {
            suffix = 'ºF'
            currentTemp = weatherUtils.toFahrenheit(currentTemp)
        }
        currentTemp = ''+currentTemp
        return currentTemp+suffix
    },
    setHourlyTemps: function(){
        let hourEnds = []

        if (logicManager.weatherManager.hourlyTempValues.length == 2){
            hourEnds.push(logicManager.weatherManager.hourlyTempValues[1])
        } else {
            weatherUtils.setDayTemp(weatherUtils.makeDayTemp(logicManager.timeManager.currentMonth))
            hourEnds.push(logicManager.weatherManager.temp+weatherUtils.getHourlyVariation(0))
        }
        
        if (logicManager.timeManager.currentHour == logicManager.timeManager.hoursPerDay-1){
            if (logicManager.timeManager.currentDay == logicManager.timeManager.daysPerMonth - 1){
                weatherUtils.setDayTemp(weatherUtils.makeDayTemp(timeUtils.getNextMonth()))
            } else {
                weatherUtils.setDayTemp(weatherUtils.makeDayTemp(logicManager.timeManager.currentMonth))
            }
            hourEnds.push(logicManager.weatherManager.temp+weatherUtils.getHourlyVariation(0))
        } else {
            hourEnds.push(logicManager.weatherManager.temp+weatherUtils.getHourlyVariation(logicManager.timeManager.currentHour))
        }
        
        logicManager.weatherManager.hourlyTempValues = hourEnds
    }
}

logicManager.weatherManager = weatherManager