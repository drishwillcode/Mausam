const playlistName = sessionStorage.getItem("playlist_name");
const description = sessionStorage.getItem("description");

document.getElementById("playlist-name").textContent = playlistName;
document.getElementById("playlist-description").textContent = description;
const songs = JSON.parse(sessionStorage.getItem("songs"));

const container = document.getElementById("song-container");

if (songs && songs.length > 0) {

    songs.forEach(song => {

        container.innerHTML += `
         <div class="song-card">
                <img src="/static/images/placeholder.jpg" alt="Song image">
                <div class="song-info">
                    <h3 style="margin-bottom: 0; margin-top: 5px;">${song.name}</h3>
                    <p style="margin-top: 5px; margin-bottom: 5px;">${song.artist}</p>
                </div>
                <button class="like-button">♥</button>
            </div>
            `;

    });

} else {
    container.textContent = "No recommendations found. Please search for a city first!";
}
