const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const timeDisplay = document.getElementById('time');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const volumeSlider = document.getElementById('volume');

let currentTrackIndex = 0;
let isPlaying = false;
let tracks = [];

document.querySelectorAll('.track').forEach((trackEl, index) => {
    tracks.push({
        src: trackEl.dataset.src,
        title: trackEl.dataset.title,
        artist: trackEl.dataset.artist,
        cover: '' // placeholder
    });
    
    trackEl.addEventListener('click', () => {
        currentTrackIndex = index;
        playTrack(currentTrackIndex);
    });
});

function playTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    coverEl.style.backgroundImage = `url('https://picsum.photos/56/56?random=${index}')`; // random cover
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = '❚❚';
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶';
    } else {
        audio.play();
        playPauseBtn.textContent = '❚❚';
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        
        const currentMin = Math.floor(audio.currentTime / 60);
        const currentSec = Math.floor(audio.currentTime % 60);
        const totalMin = Math.floor(audio.duration / 60);
        const totalSec = Math.floor(audio.duration % 60);
        
        timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
    }
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        playPauseBtn.click();
    }
});