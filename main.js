const container = document.getElementById("container");

console.log(container);

const getCharacters = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())

    .then((data) => renderCharacters(data));
};

getCharacters();

const renderCharacters = (data) => {
  console.log(data);

  data.results.forEach((character) => {
    console.log(character);

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

     <button class="button" onclick = verDescripcion()>Volver</button>

</div>`;
    });
};
