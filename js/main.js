const date=new Date();


const Daynum=date.getDate();
document.getElementById("daynum").innerHTML=Daynum

const monthname=date.getMonth();
const monthnames=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthName=monthnames[monthname];
document.getElementById("daynum").innerHTML= Daynum + monthName;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day=date.getDay()






 

async function getapi(country){
//current day
let api1=await fetch(` http://api.weatherapi.com/v1/current.json?key=b422bf650cd04fc48d0120047230408&q=${country}`)
let api= await api1.json();

 document.getElementById("nametown").innerHTML=api.location.name;
 document.getElementById("temp").innerHTML=api.current.temp_c+"&#8451";
 document.getElementById("con").setAttribute("src" ,`${api.current.condition.icon}`);
 document.getElementById("text").innerHTML=api.current.condition.text;
console.log(`https${api.current.condition.icon}`)


 //second day

let api2=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b422bf650cd04fc48d0120047230408&q=${country}&days=3`)
let api22=await api2.json();

let next=new Date(api22.forecast.forecastday[1].date);
document.getElementById("day2").innerHTML=days[next.getDay()];
document.getElementById("cond2").setAttribute("src",`${api22.forecast.forecastday[1].day.condition.icon}`)

document.getElementById("max").innerHTML=`${api22.forecast.forecastday[1].day.maxtemp_c + "&#8451"}`

document.getElementById("min").innerHTML=`${api22.forecast.forecastday[1].day.mintemp_c + "&#8451"}`
document.getElementById("day2text").innerHTML=`${api22.forecast.forecastday[1].day.condition.text}`




//thirdday

let next2=new Date(api22.forecast.forecastday[2].date);
document.getElementById("day33").innerHTML=days[next2.getDay()]


document.getElementById("cond3").setAttribute("src",`${api22.forecast.forecastday[2].day.condition.icon}`)

document.getElementById("max3").innerHTML=`${api22.forecast.forecastday[2].day.maxtemp_c + "&#8451"}`

document.getElementById("min3").innerHTML=`${api22.forecast.forecastday[2].day.mintemp_c + "&#8451"}`
document.getElementById("day3text").innerHTML=`${api22.forecast.forecastday[2].day.condition.text}`


}

async function get(){
    await getapi(live_Location);
}

get();



document.getElementById("inputsearch").addEventListener("keyup",function(){


    async function get(){
        await getapi(inputsearch.value);
    }
    
    get();

})





document.getElementById("dayname").innerHTML=date.toLocaleString('en-us',{weekday:'long'})





///////////////////////////////////////// get current location
var live_Location;
 async function liveLocation(){
  
    if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          live_Location = data.address.country;
          console.log(live_Location);
        } catch (error) {
          console.log('Error: ' + error);
        }
      } else {
        console.log('Geolocation is not supported');
      }
    

}

(async function(){
await liveLocation()
await get(live_Location)
})();















