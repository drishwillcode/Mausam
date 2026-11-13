from flask import Flask,render_template,jsonify,request
from weather import main 
from rec import load_songs, get_weather_score, get_recommendations

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/index')
def home():
    return render_template('index.html')

@app.route('/soundtrack')
def soundtrack():
    return render_template('soundtrack.html')

@app.route('/weather')
def weather():
    city=request.args.get("city")
    data=main(city)
    if data is None:
       return jsonify({'error':"City not found"}),404
    songs = load_songs()

    weather_score = get_weather_score(data)

    recommendations = get_recommendations(songs, weather_score)

    print(recommendations)

    playlist_names = {
    "Clear": "Sunshine Vibes",
    "Clouds": "Cloud Nine",
    "Rain": "Rain Check",
    "Drizzle": "Soft Showers",
    "Thunderstorm": "Electric Skies",
    "Snow": "Winter-Verse",
    "Atmosphere": "Somewhere in the Mist"
}

    playlist_name = playlist_names.get(data.main, "Weather Playlist")
    return jsonify({
        "weather": data.__dict__,
        "songs": recommendations,
        "playlist_name": playlist_name
    })
if __name__ == "__main__":
    app.run(debug=True)
