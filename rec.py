import json

def load_songs():
    with open("data/songs.json", 'r', encoding='utf-8') as f:
        return json.load(f)

if __name__ == "__main__":
    songs = load_songs()
    print(len(songs))
    print(songs[0])    