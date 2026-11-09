import json
import math

def load_songs():
    with open("data/songs.json", 'r', encoding='utf-8') as f:
        return json.load(f)

def get_main_score(main):
    weather_score={
        "rain": 0,
        "snow": 0,
        "thunderstorm":0,
        "drizzle":0 ,
        "clouds":0 ,
        "clear":0,
        "temp": 0
    }
    main=main.lower()
    for key in weather_score.keys():
        if key in main:
            weather_score[key]=1
    return weather_score
    #returns a dictionary 

def get_temp_score(temp, weather_score):
    k = 0.1
    c = 25

    score = 1 / (1 + math.exp(-k * (temp - c)))

    weather_score["temp"] = score

def get_weather_score(data):
    weather_score = get_main_score(data.main)
    weather_score = get_temp_score(data.temp, weather_score)

    return weather_score

#calculate the score for each attribute in the weather_score dictionary
attributes = [
    "rain",
    "snow",
    "thunderstorm",
    "drizzle",
    "clouds",
    "clear",
    "temp"
]
def calculate_song_score(songs, weather_score):
    total=0
    for attr in attributes:
        total+=weather_score[attr]*songs[attr]
    return total
def get_reccomendation(songs, weather_score):
    scored_songs=[]
    for song in songs:
        score=calculate_song_score(song, weather_score)
        scored_songs.append({
            "name": song["name"],
            "artist": song["artist"],
            "score": score
        })
    sorted_songs = sorted(
    scored_songs,
    key=lambda song: song["score"],
    reverse=True
    )

    return sorted_songs[:16]
   
if __name__ == "__main__":
    songs = load_songs()
    print(len(songs))
    print(songs[0])    

