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
    .then((data)=>console.log(data))

fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        name: 'User 1'
    })
})
.then((resp)=>{
    if(resp.ok){
        console.log("ok");
        return resp.json();
    }
    else{
        console.log("error");
    }
})
.then((data)=>console.log(data))
*/
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
        console.log("ok");
        return new Promise((resolve, reject) => 
        {
            resolve(resp.json());
        })
    }
    else{
        console.log("error");
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

/*fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d5976b89430eb34f49cf05f0740ad27e')
    .then((resp)=>{
        if(resp.ok){
            console.log("ok");
            return resp.json();
        }
        else{
            console.log("error");
        }
    })
    .then((data)=>console.log(data))
*/

getWeather('London,uk').then((weather)=>
{
    DisplayCityWeather(weather)
})

getWeather('Berlin,de').then((weather)=>
{
    DisplayCityWeather(weather)
})