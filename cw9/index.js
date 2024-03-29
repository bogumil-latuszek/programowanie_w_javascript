let canvasas = document.getElementById("canvasas");
let weather_list =document.getElementById("weather_info_list"); 
let submit_city_button = document.getElementById("submit_city");
let city_name_textbox = document.getElementById("input_city_name");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext("2d");
ctx.beginPath();

let icon_container = document.getElementById("icon");
//what to do:

//send request for json to weather api
//Your API key is d5976b89430eb34f49cf05f0740ad27e
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d5976b89430eb34f49cf05f0740ad27e

/*fetch('https://catfact.ninja/fact')
    .then((resp)=>{
        if(resp.ok){
            console.log("ok");
            return resp.json();
        }
        else{
            console.log("error");
        }
    })
    .then((data)=>console.log(data))*/


submit_city_button.addEventListener("click", ()=>{
    try{
        const loaded_cities_num = weather_list.childElementCount;
        if (loaded_cities_num < 10) {
            const city_name = city_name_textbox.value
            getWeather(city_name).then((weather)=>
            {
                if (weather != null) {
                    SaveInfoCopy(city_name, weather.main.temp, weather.main.humidity, weather.weather[0].icon) 
                    DisplayCityWeather(city_name, weather.main.temp, weather.main.humidity, weather.weather[0].icon)
                }
            })
        }
    }
    catch( e ){
        console.log("weather not found for this city name")
    }
})

async function getWeather(city_name)
{
    // api.getweather(city_name)
    try {
        const full_adress = 'https://api.openweathermap.org/data/2.5/weather?q='+ city_name +'&APPID=d5976b89430eb34f49cf05f0740ad27e'
        let resp = await fetch(full_adress);
        if(resp.ok)
        {
            SaveCityName(city_name);// remember the location
            console.log("ok");
            return new Promise((resolve, reject) => 
            {
                resolve(resp.json());
            })
        }
        else{
            console.log("error");
            throw new Error("not found");
        }
    } catch (error) {
        return new Promise((resolve, reject) => 
            {
                resolve(null);
            })
    }
}

let current_wether = {
    city: "Kraków",
    time: Date.now(),
    tempCelcius: 13,
    humidityPercent: 40,
    cloudiness: 0
}
function removeItemFromMemory(){
    DeleteCityInfo(this.attributes.city_name.value)
    DeleteCityName(this.attributes.city_name.value)
    this.parentNode.remove();
}

function DisplayCityWeather(city_name, temperature, humidity, icon){
    const HtmlCityWeatherContainer = CreateHtmlCityWeatherContainer(city_name, temperature, humidity, icon)
    weather_list.appendChild(HtmlCityWeatherContainer);
}

function CreateHtmlCityWeatherContainer(city_name, temperature, humidity, icon){
    var main_container = document.createElement("div");//create cont to hold weather description and icon
    main_container.setAttribute("class","main_cont");
    var city_name_container = document.createElement("div");
    city_name_container.innerText = city_name
    var temperature_container = document.createElement("div");
    temperature_container.innerText = Math.ceil(temperature -  273.15) +"°C"
    var humidity_container = document.createElement("div");
    humidity_container.innerText = humidity +"% Humidity"
    //var description_container = document.createElement("div");
    city_name_container.setAttribute("class","descr_cont");
    humidity_container.setAttribute("class","descr_cont");
    temperature_container.setAttribute("class","descr_cont");
    //main_container.setAttribute("class","descr_cont");
    main_container.appendChild(city_name_container);
    main_container.appendChild(temperature_container);
    main_container.appendChild(humidity_container);
    //description_container.innerText = 'weather in '+ weather.name +' is ' + weather.weather[0].description
    //main_container.appendChild(description_container);//add description to main cont
    var icon_container = document.createElement("img") 
    icon_container.setAttribute("class","icon_cont");
    let icon_code = icon; 
    icon_container.src = 'http://openweathermap.org/img/wn/'+ icon_code +'@2x.png';
    main_container.appendChild(icon_container); // add icon to main cont

    var delete_button = document.createElement("button");
    delete_button.setAttribute("class","delete_button");
    delete_button.setAttribute("city_name", city_name);
    delete_button.innerText = "X";
    delete_button.addEventListener("click", removeItemFromMemory);

    main_container.appendChild(delete_button);
    return main_container;
}
function SaveToLocalStorage(key, item){
    const item_stringified = JSON.stringify(item)
    localStorage.setItem(key,  item_stringified );
}

function GetFromLocalStorage(key){
    const item_stringified = localStorage.getItem(key)
    const item = JSON.parse(item_stringified)
    return item
}

function DeleteFromLocalStorage(key){
    localStorage.removeItem(key);
}


async function SaveCityName(city_name){
    if(!CityNameAlreadySaved(city_name)){
        let saved_cities = GetFromLocalStorage("saved_cities");
        if(saved_cities == null){
            saved_cities = [];
        }
        if (saved_cities.length <10) {
            saved_cities.push(city_name);
            SaveToLocalStorage("saved_cities", saved_cities);
        }    
    }
}
async function DeleteCityName(name_to_delete){
        let saved_cities = GetFromLocalStorage("saved_cities");
        if(saved_cities == null){
            return 0;
        }
        let new_saved_cities = [];
        for (let i = 0; i < saved_cities.length; i++) {
            const name = saved_cities[i];
            if (name != name_to_delete) {
                new_saved_cities.push(name);
            }
        }
        SaveToLocalStorage("saved_cities", new_saved_cities);
}
function CityNameAlreadySaved(city_name){
    let saved_cities = [];
    try{
        saved_cities = GetFromLocalStorage("saved_cities");
        if(saved_cities == null){
            return false;
        }
    }
    catch(e){
        return false;
    }
    let found = false;
    saved_cities.forEach(saved_city_name => {
        if(saved_city_name==city_name){
            found = true;
        }
    });
    return found;
}

function GetAllCityNames(){
    let saved_cities = [];
    try{
        saved_cities = GetFromLocalStorage("saved_cities");
    }
    catch(e){
        console.log(e);
    }
    finally{
        if(saved_cities == null){
            saved_cities = [];
        }
        return saved_cities;
    }
}

function refresh(){
    weather_list.innerHTML ='';
    let saved_cities_info = GetAllCitiesInfo()
    saved_cities_info.forEach(city_info => {
        try{
            DisplayCityWeather(city_info.city_name, city_info.temperature, city_info.humidity, city_info.icon)
        }
        catch( e ){
            console.log("weather not found for this city name")
        }
    })

    let saved_cities_names = GetAllCityNames();

    weather_list.innerHTML ='';
    //on start: load every city info
    saved_cities_names.forEach(city_name => {
    try{
        getWeather(city_name).then((weather)=>
        {
            DisplayCityWeather(city_name, weather.main.temp, weather.main.humidity, weather.weather[0].icon)
        })
    }
    catch( e ){
        console.log("weather not found for this city name")
    }
});
}



refresh();
setInterval(refresh, 5*60000);
//localStorage.getItem(key) localStorage.setItem(key, stringValue) localStorage.removeItem(key) localStorage.clear()


async function SaveInfoCopy(city_name, temperature, humidity, icon){
    let city_weather_container = {
        city_name : city_name,
        temperature: temperature,
        humidity : humidity,
        icon : icon
    }
    SaveCityInfo(city_weather_container)
}

async function SaveCityInfo(city_info){
    if(!CityInfoAlreadySaved(city_info)){
        let saved_cities_info = GetFromLocalStorage("saved_cities_info");
        if(saved_cities_info == null){
            saved_cities_info = [];
        }
        if (saved_cities_info.length <10) {
            saved_cities_info.push(city_info);
            SaveToLocalStorage("saved_cities_info", saved_cities_info);
        }    
    }
}
async function DeleteCityInfo(city_to_delete){
        let saved_cities_info = GetFromLocalStorage("saved_cities_info");
        if(saved_cities_info == null){
            return 0;
        }
        let new_saved_cities_info = [];
        for (let i = 0; i < saved_cities_info.length; i++) {
            const info = saved_cities_info[i];
            if (info.city_name != city_to_delete) {
                new_saved_cities_info.push(info);
            }
        }
        SaveToLocalStorage("saved_cities_info", new_saved_cities_info);
}
function CityInfoAlreadySaved(city_info){
    let saved_cities_info = [];
    try{
        saved_cities_info = GetFromLocalStorage("saved_cities_info");
        if(saved_cities_info == null){
            return false;
        }
    }
    catch(e){
        return false;
    }
    let found = false;
    saved_cities_info.forEach(info => {
        if(info.city_name==city_info.city_name){
            found = true;
        }
    });
    return found;
}

function GetAllCitiesInfo(){
    let saved_cities_info = [];
    try{
        saved_cities_info = GetFromLocalStorage("saved_cities_info");
    }
    catch(e){
        console.log(e);
    }
    finally{
        if(saved_cities_info == null){
            saved_cities_info = [];
        }
        return saved_cities_info;
    }
}