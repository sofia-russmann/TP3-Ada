const API_KEY = '872f5878ba33b36137df9dc900869167';

const search = document.getElementById('head-searchbar-input');
const homeContainer = document.getElementsByClassName('home1'); //clase de todos los elementos Home que se deben ocultar
const popular = document.getElementById('popular');
const topRated = document.getElementById('top-rated');
const upcoming = document.getElementById('upcoming');
const nowPlaying = document.getElementById('now-playing');
const popularSection = document.getElementById('popular-section');
const topRatedSection = document.getElementById('top-rated-section');
const upcomingSection = document.getElementById('upcoming-section');
const nowPlayingSection = document.getElementById('now-playing-section')
const movieNode = document.getElementById('movie-node');
const movieTitle = document.getElementById('movie-title');
const moviePoster = document.getElementById('movie-poster');
const popularNav = document.getElementById('popular-nav');
const topRatedNav = document.getElementById('top-rated-nav');
const upcomingNav = document.getElementById('upcoming-nav');
const nowPlayingNav = document.getElementById('now-playing-nav');
let bannerTitle = document.getElementById('banner-title');
let backgroundOver = document.getElementsByClassName('background-over');
const viewAll = document.getElementsByClassName('view-all');
const loadMore = document.getElementsByClassName('load-more');
let numbersResult = document.getElementsByClassName('numbers-result');
let searchInfo = document.getElementById('search-movie-info');
const searchContainer = document.getElementById('search-container');
const searchSection = document.getElementById('search-section');
const mobileMenu = document.getElementsByClassName( 'show-navbar-drop' )[0];
const navToggle = document.getElementsByClassName( 'navbar-toggle' )[0];
const navMenu = document.getElementsByClassName( 'navbar-lists' )[0];
let paginaActual = 1;

mobileMenu.addEventListener( 'click', function(e) {

    e.preventDefault();
    if ( navMenu.style.opacity == 0 )   {
        navMenu.style.opacity = 1;
        navMenu.style.visibility = "visible";
    }


} );

const showPopular = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            popularSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const popularMovie = movieNode.cloneNode(true);
                popularMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                popularMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                popularMovie.children[0].dataset.movie = data.results[i].id;
                popularMovie.children[0].addEventListener('click', function(event) {
                    event.preventDefault();
                    movieDetail( this.dataset.movie );
                });
                popularSection.appendChild(popularMovie);
            }
            loadMore[0].style.display = 'none';
        })
}
const showTopRated = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            topRatedSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const topRatedMovie = movieNode.cloneNode(true);
                topRatedMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                topRatedMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                topRatedMovie.children[0].dataset.movie = data.results[i].id;
                topRatedMovie.children[0].addEventListener('click', function(event) {
                    event.preventDefault();
                    movieDetail( this.dataset.movie );
                });
                topRatedSection.appendChild(topRatedMovie);
            }
            loadMore[1].style.display = 'none';
        })
}
const showUpcoming = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            upcomingSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const upcomingMovie = movieNode.cloneNode(true);
                upcomingMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                upcomingMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                upcomingMovie.children[0].dataset.movie = data.results[i].id;
                upcomingMovie.children[0].addEventListener('click', function(event) {
                    event.preventDefault();
                    movieDetail( this.dataset.movie );
                });
                upcomingSection.appendChild(upcomingMovie);
            }
            loadMore[2].style.display = 'none';
        })
}
const showNowPlaying = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            nowPlayingSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const nowPlayingMovie = movieNode.cloneNode(true);
                nowPlayingMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                nowPlayingMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                nowPlayingMovie.children[0].dataset.movie = data.results[i].id;
                nowPlayingMovie.children[0].addEventListener('click', function(event) {
                    event.preventDefault();
                    movieDetail( this.dataset.movie );
                });
                nowPlayingSection.appendChild(nowPlayingMovie);
            }
            loadMore[3].style.display = 'none';
        })
}
showPopular();
showTopRated();
showUpcoming();
showNowPlaying();
const ocultarTodo = () => {
    homeContainer[0].children[0].style.display = 'none';
    popular.style.display = 'none';
    topRated.style.display = 'none';
    upcoming.style.display = 'none';
    nowPlaying.style.display = 'none';
    searchContainer.style.display = 'none';
}
const loadMovies = (page, type = 'popular', append = false) => {

    ocultarTodo();
    let container = popular;
    let section = popularSection;
    let buttonsIndex = 0;

    if ( 'top_rated' == type )  {
        container = topRated;
        section = topRatedSection;
        buttonsIndex = 1;
    } else if ( 'upcoming' == type )    {
        container = upcoming;
        section = upcomingSection;
        buttonsIndex = 2;
    } else if ( 'now_playing' == type ) {
        container = nowPlaying;
        section = nowPlayingSection;
        buttonsIndex = 3;
    }

    container.style.display = 'flex';
    let navToggleStyle = window.getComputedStyle(navToggle);
    if ( navToggleStyle.display == 'block' && navMenu.style.opacity == 1 )    {
        navMenu.style.opacity = 0;
        navMenu.style.visibility = "hidden";
    }

    fetch
        (`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&page=${page}`)
        .then(result => result.json())
        .then(data => {
            if ( false === append ) {
                section.innerHTML = '';
            }
            for (i = 0; i < 20; i++) {
                const popularMovie = movieNode.cloneNode(true);
                popularMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                popularMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                popularMovie.children[0].dataset.movie = data.results[i].id;
                popularMovie.children[0].addEventListener('click', function(event) {
                    event.preventDefault();
                    movieDetail( this.dataset.movie );
                });
                section.appendChild(popularMovie);
            }
            container.style.display = 'block';
            viewAll[buttonsIndex].style.display = 'none';
            loadMore[buttonsIndex].style.display = 'inline-block';
        });

}
/* POPULAR */
loadMore[0].addEventListener('click', function(event) {
    event.preventDefault();
    loadMovies( ++paginaActual, 'popular', true );
});
popularNav.addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'popular' );
});
viewAll[0].addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'popular' );
});

/* TOP RATED */
loadMore[1].addEventListener('click', function(event) {
    event.preventDefault();
    loadMovies( ++paginaActual, 'top_rated', true );
});
topRatedNav.addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'top_rated' );
});
viewAll[1].addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'top_rated' );
});

/* UPCOMING */
loadMore[2].addEventListener('click', function(event) {
    event.preventDefault();
    loadMovies( ++paginaActual, 'upcoming', true );
});
upcomingNav.addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'upcoming' );
});
viewAll[2].addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'upcoming' );
});

/* NOW PLAYING */
loadMore[3].addEventListener('click', function(event) {
    event.preventDefault();
    loadMovies( ++paginaActual, 'now_playing', true );
});
nowPlayingNav.addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'now_playing' );
});
viewAll[3].addEventListener("click", function(event){
  event.preventDefault();
  paginaActual = 1;
  loadMovies( paginaActual, 'now_playing' );
});
const viewAllTopRated = paginaActual => {
    ocultarTodo();
    topRated.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${paginaActual}`)
        .then(result => result.json())
        .then(data => {
            topRatedSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const topRatedMovie = movieNode.cloneNode(true);
                topRatedMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                topRatedMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                topRatedSection.appendChild(topRatedMovie);
                topRatedMovie.onclick = () => {
                    getMovie(data.results[i].id);
                }
            }
            viewAll[1].style.display = 'none';
            loadMore[1].style.display = 'inline-block';
        })
}


const viewAllUpcoming = paginaActual => {
    ocultarTodo();
    upcoming.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${paginaActual}`)
        .then(result => result.json())
        .then(data => {
            upcomingSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const upcomingMovie = movieNode.cloneNode(true);
                upcomingMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                upcomingMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                upcomingSection.appendChild(upcomingMovie);
                upcomingMovie.onclick = () => {
                    getMovie(data.results[i].id);
                }
            }
            viewAll[2].style.display = 'none'
            // getNumbersResult(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${paginaActual}`);
            loadMore[2].style.display = 'inline-block';
        })
}


const viewAllNowPlaying = paginaActual => {
    ocultarTodo();
    nowPlaying.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${paginaActual}`)
        .then(result => result.json())
        .then(data => {
            nowPlayingSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const nowPlayingMovie = movieNode.cloneNode(true);
                nowPlayingMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                nowPlayingMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                nowPlayingSection.appendChild(nowPlayingMovie);
                nowPlayingMovie.onclick = () => {
                    movieDetail(data.results[i].id);
                }
            }
            viewAll[3].style.display = 'none'
            loadMore[3].style.display = 'inline-block';
        })
}


const getNumbersResult = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            for (i = 0; i < 5; i++) {
                numbersResult[i].style.display = 'flex';
                numbersResult[i].innerText = `${data.total_results} results`;
            }
        })
}
const searchMovie = textoBusqueda => {
    searchSection.innerHTML = '';
    ocultarTodo();
    searchContainer.style.display = 'flex';
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${textoBusqueda}&page=${paginaActual}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length >= 1) {
                bannerTitle.innerText = 'Results for: "' + textoBusqueda + '"';
                for (i = 0; i < 20; i++) {
                    const searchedMovie = movieNode.cloneNode(true);
                    if (data.results[i].poster_path) {
                        searchedMovie.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                    }
                    searchedMovie.children[0].children[1].children[0].innerText = data.results[i].title;
                    searchedMovie.children[0].dataset.movie = data.results[i].id;
                    searchedMovie.children[0].addEventListener('click', function(event) {
                        event.preventDefault();
                        movieDetail( this.dataset.movie );
                    });
                    searchSection.appendChild(searchedMovie);
                    searchedMovie.onclick = (event) => {
                        event.preventDefault();
                        movieDetail(data.results[i].id);
                    }
                }
            } else {
                bannerTitle.innerText = 'Nothing found';
            }
        });
}
search.onkeypress = (event) => {
    if (event.keyCode === 13) {
        if (search.value)
            searchMovie(search.value);
    }
}

//--------------------------MODAL----------------------------//
const selectedModal = document.getElementById('movie-description-popup');
const loading = document.getElementById('loader');
const selectedMovie = document.getElementById('selected-movie');
const firstBlock = document.getElementById('firstBlock'); 
const closeModal = document.getElementById('movie-description-popup'); 
const title = document.getElementsByClassName('movie-title-text'); 
const subtitle = document.getElementById('subtitle'); 
const overview = document.getElementsByClassName('movie-description');
const genres = document.getElementsByClassName('movie-details-text');
const releaseDate = document.getElementsByClassName('release-date');
const movieImage = document.getElementsByClassName('movie-img');
const movieDetail = movieId => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        firstBlock.style.backgroundImage = "url('../images/no-background-img.jpg')";
        movieImage[0].src = '../images/no-image.png';
        if (data.backdrop_path) {
            firstBlock.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`;
        }
        if (data.poster_path) {
            movieImage[0].src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            movieImage[0].style.opacity = 1;
        }
        title[0].innerHTML = data.title;
        subtitle.innerHTML = data.tagline;
        overview[0].innerHTML = data.overview;
        genres[0].innerHTML = data.genres.map(genre => genre.name).join(', ');
        releaseDate[0].innerHTML = data.release_date;
        showModal();
    });
}
const showModal = () => {
    selectedModal.style.visibility = 'visible';
    setTimeout(() => {
        selectedMovie.style.visibility = 'visible';
    }, 500)
}
closeModals = () => {
    selectedModal.style.visibility = 'hidden';
    selectedMovie.style.visibility = 'hidden';
}
//--------------------------MODAL----------------------------//