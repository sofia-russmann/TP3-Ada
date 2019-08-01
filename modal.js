const API_KEY = '872f5878ba33b36137df9dc900869167';

//--------------------------MODAL----------------------------//
const selectedModal = document.getElementById('movieModal');
const loading = document.getElementById('loading');
const selectedMovie = document.getElementById('movieInfo');
const firstBlock = document.getElementById('firstBlock'); 
const closeModal = document.getElementById('cross'); 
const title = document.getElementById('title'); 
const subtitle = document.getElementById('subtitle'); 
const overview = document.getElementById('overview');
const genres = document.getElementById('genre');
const releaseDate = document.getElementById('releaseDate');
const movieImage = document.getElementById('movieImage');

const movieDetail = movieId => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        firstBlock.children[0].src = 'img/no-background-img.jpg';
        movieImage.children[0].src = 'img/no-image.png';
        if (data.backdrop_path) {
            firstBlock.children[0].src = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
        }
        if (data.poster_path) {
            movieImage.children[0].src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        }
        title.innerHTML = data.title;
        subtitle.innerHTML = data.tagline;
        overview.innerHTML = data.overview;
        genres.innerHTML = data.genres.map(genre => genre.name).join(', ');
        releaseDate.innerHTML = data.release_date;
        showModal();
    });
}

const showModal = () => {
    selectedModal.style.visibility = 'visible';
    setTimeout(() => {
        selectedMovie.style.visibility = 'visible';
    }, 500)
}

closeModal.onclick = () => {
    selectedModal.style.visibility = 'hidden';
    selectedMovie.style.visibility = 'hidden';
}
//--------------------------MODAL----------------------------//


