const btnMusic = document.getElementById("btn-music");
const musica = document.getElementById("musica");

btnMusic.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        btnMusic.textContent = "Pausar música";
    } else {
        musica.pause();
        btnMusic.textContent = "Reproducir música";
    }
});


const modal = document.getElementById("modal-personajes");
const modalBody = document.getElementById("modal-body");
const spanClose = modal.querySelector(".close");

spanClose.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});


async function cargarPeliculas() {
    const res = await fetch("https://www.swapi.tech/api/films");
    const data = await res.json();
    const contenedor = document.getElementById("films");
    contenedor.innerHTML = "";

    data.result.forEach(pelicula => {
        const div = document.createElement("div");
        div.className = "pelicula";

        div.innerHTML = `
            <h3>${pelicula.properties.title}</h3>
            <p>Año: ${pelicula.properties.release_date}</p>
            <p>Director: ${pelicula.properties.director}</p>
            <button class="btn-personajes">Ver personajes</button>
        `;

        const boton = div.querySelector(".btn-personajes");

        boton.addEventListener("click", async () => {
            modalBody.innerHTML = "<p>Cargando personajes...</p>";
            modal.style.display = "block";

            
            const resFilm = await fetch(`https://www.swapi.tech/api/films/${pelicula.uid}`);
            const dataFilm = await resFilm.json();
            const personajes = dataFilm.result.properties.characters;

            modalBody.innerHTML = ""; 

        
            personajes.forEach(async (url) => {
                const resChar = await fetch(url);
                const dataChar = await resChar.json();
                const char = dataChar.result.properties;

                const p = document.createElement("p");
                p.textContent = `${char.name} - Altura: ${char.height} cm - Género: ${char.gender}`;
                modalBody.appendChild(p);
            });

            
            modalBody.style.animation = "none"; 
            modalBody.offsetHeight; 
            modalBody.style.animation = "scrollUp 20s linear forwards"; 
        });

        contenedor.appendChild(div);
    });
}

cargarPeliculas();