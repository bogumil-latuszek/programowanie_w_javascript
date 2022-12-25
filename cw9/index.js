let canvasas = document.getElementById("canvasas");
let weather_list =document.getElementById("weather_info_list"); 
let submit_city_button = document.getElementById("submit_city")
let city_name_textbox = document.getElementById("input_city_name")

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
        const city_name = city_name_textbox.value
        getWeather(city_name).then((weather)=>
        {
            DisplayCityWeather(weather)
        })
    }
    catch( e ){
        console.log("weather not found for this city name")
    }
})

async function getWeather(city_name)
{
    // api.getweather(city_name)
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
}




let current_wether = {
    city: "Kraków",
    time: Date.now(),
    tempCelcius: 13,
    humidityPercent: 40,
    cloudiness: 0
}

function DisplayCityWeather(weather){
    const HtmlWeatherContainer = CreateHtmlWeatherContainer(weather)
    weather_list.appendChild(HtmlWeatherContainer);
}
function CreateHtmlWeatherContainer(weather){
    var main_container = document.createElement("div");//create cont to hold weather description and icon
    main_container.setAttribute("class","main_cont");
    var description_container = document.createElement("div");
    description_container.setAttribute("class","descr_cont");
    description_container.innerText = 'weather in '+ weather.name +' is ' + weather.weather[0].description
    main_container.appendChild(description_container);//add description to main cont
    var icon_container = document.createElement("img") 
    icon_container.setAttribute("class","icon_cont");
    let icon_code = weather.weather[0].icon; 
    icon_container.src = 'http://openweathermap.org/img/wn/'+ icon_code +'@2x.png';
    main_container.appendChild(icon_container); // add icon to main cont
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



async function SaveCityName(city_name){
    if(!CityNameAlreadySaved(city_name)){
        let saved_cities = GetFromLocalStorage("saved_cities");
        if(saved_cities == null){
            saved_cities = [];
        }
        saved_cities.push(city_name);
        SaveToLocalStorage("saved_cities", saved_cities);
    }
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




let saved_cities = GetAllCityNames();
//on start: load every city info
saved_cities.forEach(city_name => {
    try{
        getWeather(city_name).then((weather)=>
        {
            DisplayCityWeather(weather)
        })
    }
    catch( e ){
        console.log("weather not found for this city name")
    }
});

//localStorage.getItem(key) localStorage.setItem(key, stringValue) localStorage.removeItem(key) localStorage.clear()