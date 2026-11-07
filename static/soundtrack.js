const songs = Array(16).fill({
    title: "Song Name",
    artist: "Artist Name"
});

const container = document.getElementById("song-container");

songs.forEach(song => {

    container.innerHTML += `
     <div class="song-card">
            <img src="../static/images/placeholder.jpg" alt="Song image">
            <div class="song-info">
                <h3 style="margin-bottom: 0; margin-top: 5px;">${song.title}</h3>
                <p style="margin-top: 5px; margin-bottom: 5px;">${song.artist}</p>
            </div>
            <button class="like-button">♥</button>
        </div>
        `;

});