const addMovie = document.getElementById("add-modal");
// console.log(addMovie);

const movies = [];

const button = document.querySelector("header button");
const userInputs = addMovie.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deletemoviemodel = document.getElementById('delete-modal');

const clearMovieInput = () => {
  for (userinput of userInputs) {
    userinput.value = "";
  }
};

const upateui = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deletemovie = (movieid) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieid) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  upateui();
  cancelmoviedeletion();
  // movielistroute.children[movieIndex]
};

const cancelmoviedeletion = ()=>{
    deletemoviemodel.classList.remove('visible');
    showBackdrop()};

const deletemovieHandler = (movieid) => {
    // deletemovie(movieid);
    deletemoviemodel.classList.add('visible');
    showBackdrop();
  const confirmcancelbutton =   deletemoviemodel.querySelector('.btn--passive');
   let confiredeletebutton =  deletemoviemodel.querySelector('.btn--danger');
    confirmcancelbutton.removeEventListener('click',cancelmoviedeletion);
    confiredeletebutton.replaceWith(confiredeletebutton.cloneNode(true));

     confiredeletebutton =  deletemoviemodel.querySelector('.btn--danger');

   confirmcancelbutton.addEventListener('click',cancelmoviedeletion);
   confiredeletebutton.addEventListener('click',deletemovie.bind(null,movieid));

};

const renderMovieElement = (id, title, imageurl, rating) => {
  const newmovieelement = document.createElement("li");
  newmovieelement.className = "movie-element";
  newmovieelement.innerHTML = `
    <div class = 'movie-element__image'>
        <img src = '${imageurl}' alt = '${title}'>
    </div>
    <div class = 'movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 Stars</p>
    </div>
    `;
  newmovieelement.addEventListener("click", deletemovieHandler.bind(null, id));
  const movielistroute = document.getElementById("movie-list");
  movielistroute.append(newmovieelement);
};
const closemoviemodel = ()=>{
    addMovie.classList.remove('visible');
    showBackdrop();
}

const showModel = () => {
  addMovie.classList.add("visible");
  showBackdrop();
};

const backdrop = document.getElementById("backdrop");
const showBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const backdropClickHandler = () => {
  closemoviemodel();
  cancelmoviedeletion();
  showBackdrop();
  clearMovieInput();
};

const canceladdmoviebutton = addMovie.querySelector(".btn--passive");
const canceladdmovieHandler = () => {
  clearMovieInput();
  closemoviemodel();
};

const addbutton = canceladdmoviebutton.nextElementSibling;
const addMovieHandler = () => {
  const id = Math.random.toString();
  const title = userInputs[0].value;
  const imageurl = userInputs[1].value;
  const rating = userInputs[2].value;
  if (
    title.trim() === "" ||
    imageurl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Please Enter Valid Value");
    return;
  }

  const newmovie = { id: id, title: title, imageurl: imageurl, rating: rating };
  movies.push(newmovie);
  console.log(movies);
  clearMovieInput();
  renderMovieElement(id, title, imageurl, rating);
  upateui();
  closemoviemodel();
};

button.addEventListener("click", showModel);
backdrop.addEventListener("click", backdropClickHandler);
canceladdmoviebutton.addEventListener("click", canceladdmovieHandler);
addbutton.addEventListener("click", addMovieHandler);
