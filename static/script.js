const button = document.getElementById("searchbtn");
const to_search = document.getElementById("searchcity");

function searchweather(){
    const city = to_search.value;

    fetch(`/weather?city=${city}`)
        .then(response=> {
            if (!response.ok){
                return response.json().then(data=>{
                    throw new Error(data.error)
                });
            }
            return response.json();
             })
        .then(data=> {
                    const weather = data.weather;
                    const songs = data.songs;
                    sessionStorage.setItem("songs", JSON.stringify(songs));
                    sessionStorage.setItem("description", weather.description);
                    sessionStorage.setItem("playlist_name", data.playlist_name);
                    document.getElementById("city").textContent =weather.name;
                    document.getElementById("temperature").textContent =weather.temp.toFixed(1) + "°C";
                    document.getElementById("wind-speed").textContent = weather.wind_speed.toFixed(1) + " km/h";
                    document.getElementById("humidity").textContent = weather.humidity + "%";
                    document.getElementById("temp-feelslike").textContent = "feels like: " + weather.feels_like.toFixed(1) + "°C";
                    document.getElementById("sunrisetime").textContent= new Date(weather.sunrise * 1000).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById("sunsettime").textContent= new Date(weather.sunset * 1000).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById("weather-condition").textContent = weather.description;
                    const iconCode = weather.icon;
                    const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    document.getElementById("weathericon").src = iconUrl;
                    
                    const timezone=weather.timezone;
                    const now=new Date();
                    const citytime=new Date(now.getTime() + timezone*1000);
                    const styling={
                        month:'long',
                        day:'numeric',
                    };
                    const date=citytime.toLocaleDateString(undefined,styling);
                    const hours = String(citytime.getUTCHours()).padStart(2, "0");
                    const minutes = String(citytime.getUTCMinutes()).padStart(2, "0");

                    const dateTime = `${date}, ${hours}${minutes}hrs`;
                    document.getElementById("datetime").textContent=dateTime;

                    
                })
                .catch(error=>{
                        document.getElementById("city").textContent=error.message;
                        document.getElementById("weathericon").src="";
                        document.querySelectorAll(".weather-data").forEach(element=>{
                            element.textContent="--";
                    });
                });
            }
button.addEventListener("click", searchweather);
to_search.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        searchweather();
    }
});

        
   

