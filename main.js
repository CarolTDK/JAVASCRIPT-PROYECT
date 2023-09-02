const container = document.getElementById("container");
let currentPage = 1;
let totalPages = 0;
console.log(container);

const allBtn = document.getElementById("all");
const femaleBtn = document.getElementById("female");
const menBtn = document.getElementById("male");
const unknownBtn = document.getElementById("unknown");

const getCharacters = (pageNumber) => {
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
    .then((res) => res.json())
    .then((data) => {
      renderCharacters(data);
      totalPages = data.info.pages;
    });
};

const renderCharacters = (data) => {
  console.log(data);

  data.results.forEach((character) => {
    container.innerHTML += `<div class="card">
     <h2>${character.name}</h2>
     <img src="${character.image}" alt="">
     <button class="button" onclick = verDescripcion("${character.url}")>ver Detalles</button>
</div>`;
  });
};

const verDescripcion = (characterUrl) => {
  container.innerHTML = "";
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = `<div class="card">
     <h2>${character.name}</h2>
     <img src="${character.image}" alt="">
     <p>${character.status}</p>
     <p>${character.species}</p>
     <p>${character.gender}</p>
     <p>${character.location.name}</p>
     <p>${character.origin.name}</p>
     <button class="button" onclick = BackToHome()>Volver</button>

</div>`;
    });
};
// desde acá
const BackToHome = () => {
  window.history.back();
  location.reload();
};

getCharacters(currentPage);

// Evento para avanzar a la siguiente página
const nextBtn = document.getElementById("nextButton");
const previousBtn = document.getElementById("previousButton");
nextBtn.addEventListener("click", () => {
  // console.log(currentPage);
  if (currentPage <= 1) {
  } else if (currentPage > 1 && currentPage < totalPages) {
    previousBtn.removeAttribute("disable", false);
    currentPage++;
  } else {
    nextBtn.setAttribute("disabled", true);
  }
  currentPage++;

  getCharacters(currentPage);
});

previousBtn.addEventListener("click", () => {
  // console.log(currentPage);
  if (currentPage <= 1) {
    previousBtn.setAttribute("disabled", true);
  } else if (currentPage > 1 >= currentPage < totalPages) {
    currentPage--;
    nextBtn.removeAttribute("disable", false);
  } else {
    nextBtn.setAttribute("disabled", true);
    currentPage--;
  }

  getCharacters(currentPage);
});

const filterCharacters = (filterParam, valueParam) => (
  fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`) .then (res=>res.json()).then(data=>renderCharacters(data));
)
femaleBtn.addEventListener("click", () => filterCharacters("gender","female"));
