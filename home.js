const API_KEY = '872f5878ba33b36137df9dc900869167'

//--------------------------HOME----------------------------//

const popular = document.getElementById('popular');
const topRated = document.getElementById('topRated');
const upcoming = document.getElementById('upcoming');
const nowPlaying = document.getElementById('nowPlaying');
const searchContainer = document.getElementById('searchContainer');
const popularSection = document.getElementById('popularSection');
const topRatedSection = document.getElementById('topRatedSection');
const upcomingSection = document.getElementById('upcomingSection');
const nowPlayingSection = document.getElementById('nowPlayingSection')
const movieNode = document.getElementById('movieNode');
const movieTitle = document.getElementById('movieTitle');
const moviePoster = document.getElementById('moviePoster');
const popularNav = document.getElementById('popularNav');
const topRatedNav = document.getElementById('topRatedNav');
const upcomingNav = document.getElementById('upcomingNav');
const nowPlayingNav = document.getElementById('nowPlayingNav');
let bannerTitle = document.getElementById('bannerTitle');
let backgroundOver = document.getElementsByClassName('backgroundOver')
const viewAll = document.getElementsByClassName('viewAll');
let numbersResult = document.getElementsByClassName('numbersResult');
let searchInfo = document.getElementById('searchMovieInfo');
let searchSection = document.getElementById('searchSection')
const search = document.getElementById('search');
const homeContainer = document.getElementsByClassName('home1');
let actualPage = 1;

const showPopular = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            popularSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const popularMovie = movieNode.cloneNode(true);
                popularMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                popularMovie.children[1].innerHTML = data.results[i].title;
                popularSection.appendChild(popularMovie);
            }
            loadMore[0].style.display = 'none';
        });
}

const showTopRated = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            topRatedSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const topRatedMovie = movieNode.cloneNode(true);
                topRatedMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                topRatedMovie.children[1].innerHTML = data.results[i].title;
                topRatedSection.appendChild(topRatedMovie);
            }
            loadMore[1].style.display = 'none';
        });
}

const showUpcoming = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            upcomingSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const upcomingMovie = movieNode.cloneNode(true);
                upcomingMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                upcomingMovie.children[1].innerHTML = data.results[i].title;
                upcomingSection.appendChild(upcomingMovie);
            }
            loadMore[2].style.display = 'none';
        });
}

const showNowPlaying = () => {
    fetch
        (`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        .then(result => result.json())
        .then(data => {
            nowPlayingSection.innerHTML = '';
            for (i = 0; i < 5; i++) {
                const nowPlayingMovie = movieNode.cloneNode(true);
                nowPlayingMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                nowPlayingMovie.children[1].innerHTML = data.results[i].title;
                nowPlayingSection.appendChild(nowPlayingMovie);
            }
            loadMore[3].style.display = 'none';
        });
}

showPopular();
showTopRated();
showUpcoming();
showNowPlaying();

const hideEverything = () => {
    homeContainer[0].style.display = 'none';
    popular.style.display = 'none';
    topRated.style.display = 'none';
    upcoming.style.display = 'none';
    nowPlaying.style.display = 'none';
    searchContainer.style.display = 'none';
    searchInfo.style.display = 'none';
}

const viewAllPopular = actualPage => {
    hideEverything();
    popular.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`)
        .then(result => result.json())
        .then(data => {
            popularSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const popularMovie = movieNode.cloneNode(true);
                popularMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                popularMovie.children[1].innerHTML = data.results[i].title;
                popularSection.appendChild(popularMovie);
                popularMovie.onclick = () => {
                    getMovie(data.results[i].id);
                }
            }
            viewAll[0].style.display = 'none'
            getNumbersResult(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${actualPage}`);
            loadMore[0].style.display = 'flex';
            loadMore[0].onclick = loadMoreMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${paginaActual}`);
        });
}

popularNav.onclick = viewAllPopular;
viewAll[0].onclick = viewAllPopular;

const viewAllTopRated = actualPage => {
    hideEverything();
    topRated.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`)
        .then(result => result.json())
        .then(data => {
            topRatedSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const topRatedMovie = movieNode.cloneNode(true);
                topRatedMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                topRatedMovie.children[1].innerHTML = data.results[i].title;
                topRatedSection.appendChild(topRatedMovie);
                topRatedMovie.onclick = () => {
                    getMovie(data.results[i].id);
                }
            }
            viewAll[1].style.display = 'none'
            getNumbersResult(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${actualPage}`);
            loadMore[1].style.display = 'flex';
        });
}

topRatedNav.onclick = viewAllTopRated;
viewAll[1].onclick = viewAllTopRated;

const viewAllUpcoming = actualPage => {
    hideEverything();
    upcoming.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`)
        .then(result => result.json())
        .then(data => {
            upcomingSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const upcomingMovie = movieNode.cloneNode(true);
                upcomingMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                upcomingMovie.children[1].innerHTML = data.results[i].title;
                upcomingSection.appendChild(upcomingMovie);
                upcomingMovie.onclick = () => {
                    getMovie(data.results[i].id);
                }
            }
            viewAll[2].style.display = 'none'
            getNumbersResult(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${actualPage}`);
            loadMore[2].style.display = 'flex';
        });
}

upcomingNav.onclick = viewAllUpcoming;
viewAll[2].onclick = viewAllUpcoming;

const viewAllNowPlaying = actualPage => {
    hideEverything();
    nowPlaying.style.display = 'flex';
    fetch
        (`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`)
        .then(result => result.json())
        .then(data => {
            nowPlayingSection.innerHTML = '';
            for (i = 0; i < 20; i++) {
                const nowPlayingMovie = movieNode.cloneNode(true);
                nowPlayingMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                nowPlayingMovie.children[1].innerHTML = data.results[i].title;
                nowPlayingSection.appendChild(nowPlayingMovie);
                nowPlayingMovie.onclick = () => {
                    getMovie(data.results[i].id);
                }
            }
            viewAll[3].style.display = 'none'
            getNumbersResult(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${actualPage}`);
            loadMore[3].style.display = 'flex';
        });
}

nowPlayingNav.onclick = viewAllNowPlaying;
viewAll[3].onclick = viewAllNowPlaying;

const getNumbersResult = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (i = 0; i < 5; i++) {
                numbersResult[i].style.display = 'flex';
                numbersResult[i].innerHTML = `${data.total_results} results`;
            }
        });
}

const searchMovie = searching => {
    searchContainer.innerHTML = '';
    hideEverything();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searching}&page=${actualPage}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length >= 1) {
                for (i = 0; i < 20; i++) {
                    const searchedMovie = movieNode.cloneNode(true);
                    if (data.results[i].poster_path) {
                        searchedMovie.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
                    }
                    searchContainer.style.display = 'flex';
                    searchedMovie.children[1].innerHTML = data.results[i].title;
                    searchContainer.appendChild(searchedMovie);
                    searchInfo.style.display = 'flex';
                    searchContainer.style.flexWrap = 'wrap';
                    searchContainer.style.flexDirection = 'row';
                    searchContainer.style.justifyContent = 'space-evenly';
                    getNumbersResult(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searching}&page=${actualPage}`);
                    searchedMovie.onclick = () => {
                        getMovie(data.results[i].id);
                    }
                }
                loadMore[4].style.display = 'flex';
            }
        });
}

search.onkeypress = (event) => {
    if (event.keyCode === 13) {
        if (search.value)
            searchMovie(search.value);
    }
}

//--------------------------HOME----------------------------//