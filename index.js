// json array of Music
const musicArray = [
  {
    id: 1,
    musicName: "Blinding Lights",
    singer: "The Weeknd",
    genre: "pop",
    img: "https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rsocial.w1200.jpg",
    source: "https://samplesongs.netlify.app/Death%20Bed.mp3",
  },
  {
    id: 2,
    musicName: "Shape of You",
    singer: "Ed Sheeran",
    genre: "pop",
    img: "https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rsocial.w1200.jpg",
    source: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
  },
  {
    id: 3,
    musicName: "Bad Guy",
    singer: "Billie Eilish",
    genre: "hiphop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4bcHC_aBqFwMmEO7_j0gRauwSp-G-KY70Q&s",
    source: "https://samplesongs.netlify.app/Faded.mp3",
  },
  {
    id: 4,
    musicName: "Bohemian Rhapsody",
    singer: "Queen",
    genre: "rock",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwj4-bjnenLKvtClmaNbOGJvIV_9GPxsGvfw&s",
    source: "https://samplesongs.netlify.app/Hate%20Me.mp3",
  },
  {
    id: 5,
    musicName: "Uptown Funk",
    singer: "Mark Ronson ft. Bruno Mars",
    genre: "hiphop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4bcHC_aBqFwMmEO7_j0gRauwSp-G-KY70Q&s",
    source: "https://samplesongs.netlify.app/Solo.mp3",
  },
  {
    id: 6,
    musicName: "Levitating",
    singer: "Dua Lipa",
    genre: "pop",
    img: "https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rsocial.w1200.jpg",
    source: "https://samplesongs.netlify.app/Without%20Me.mp3",
  },
  {
    id: 7,
    musicName: "Smells Like Teen Spirit",
    singer: "Nirvana",
    genre: "hiphop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4bcHC_aBqFwMmEO7_j0gRauwSp-G-KY70Q&s",
    source: "https://samplesongs.netlify.app/Without%20Me.mp3",
  },
  {
    id: 8,
    musicName: "Blowin' in the Wind",
    singer: "Bob Dylan",
    genre: "hiphop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4bcHC_aBqFwMmEO7_j0gRauwSp-G-KY70Q&s",
    source: "https://samplesongs.netlify.app/Solo.mp3",
  },
  {
    id: 9,
    musicName: "Stay",
    singer: "The Kid LAROI, Justin Bieber",
    genre: "pop",
    img: "https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rsocial.w1200.jpg",
    source: "https://samplesongs.netlify.app/Hate%20Me.mp3",
  },
  {
    id: 10,
    musicName: "Rolling in the Deep",
    singer: "Adele",
    genre: "rock",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwj4-bjnenLKvtClmaNbOGJvIV_9GPxsGvfw&s",
    source: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
  },
];

// creating new variables
let currentSongIndex = 0;
let playlists = [];

document.getElementById("toggleTheme").addEventListener("click", toggleTheme);

function toggleTheme() {
  const theme =
    document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", theme);
}

// Function to render the list of songs
function showSongs(genre = "all") {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";
  const filteredSongs =
    genre === "all"
      ? musicArray
      : musicArray.filter((song) => song.genre === genre);

  filteredSongs.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.textContent = `${song.musicName} - ${song.singer}`;
    songElement.addEventListener("click", () => renderCurrentSong(song.id));
    songList.appendChild(songElement);
  });
}

// Function to render the current song
function renderCurrentSong(id) {
  const song = musicArray.find((s) => s.id === id);
  currentSongIndex = musicArray.indexOf(song);

  document.getElementById("currentSongImg").src = song.img;
  document.getElementById("currentSongName").textContent = song.musicName;
  document.getElementById("currentSongArtist").textContent = song.singer;
  document.getElementById("audioPlayer").src = song.source;
}

// Event listener for genre filtering
document.getElementById("genreFilter").addEventListener("change", (e) => {
  showSongs(e.target.value);
});

// Next and Previous Buttons
document.getElementById("nextBtn").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % musicArray.length;
  renderCurrentSong(musicArray[currentSongIndex].id);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + musicArray.length) % musicArray.length;
  renderCurrentSong(musicArray[currentSongIndex].id);
});

// Playlist Creation
document
  .getElementById("createPlaylistBtn")
  .addEventListener("click", createPlaylist);

function createPlaylist() {
  const playlistName = document.getElementById("newPlaylistName").value;
  if (playlistName) {
    playlists.push({ name: playlistName, songs: [] });
    renderPlaylists();
  }
}

function renderPlaylists() {
  const playlistList = document.getElementById("playlistList");
  playlistList.innerHTML = "";
  playlists.forEach((playlist) => {
    const playlistElement = document.createElement("div");
    playlistElement.textContent = playlist.name;
    playlistElement.addEventListener("click", () =>
      renderPlaylistSongs(playlist.name)
    );
    playlistList.appendChild(playlistElement);
  });
}

function renderPlaylistSongs(playlistName) {
  const playlist = playlists.find((pl) => pl.name === playlistName);
  if (playlist) {
    const songList = document.getElementById("songList");
    songList.innerHTML = "";
    playlist.musicArray.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.textContent = `${song.musicName} - ${song.singer}`;
      songElement.classList.add("element");
      songElement.addEventListener("click", () => renderCurrentSong(song.id));
      songList.appendChild(songElement);
    });
  }
}

// Add Song to Playlist
document
  .getElementById("addToPlaylistBtn")
  .addEventListener("click", addToPlaylist);

function addToPlaylist() {
  const playlistName = prompt(
    "Enter the name of the playlist to add this song to:"
  );
  const playlist = playlists.find((pl) => pl.name === playlistName);
  if (playlist) {
    playlist.musicArray.push(musicArray[currentSongIndex]);
  } else {
    alert("Playlist not found!");
  }
}

// Initial Load
showSongs();
