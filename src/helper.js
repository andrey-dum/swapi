import axios from "axios";

// const getHomeworld = (selected, setCharacter) => {
//   if (selected.homeworld) {
//     axios
//       .get(selected.homeworld)
//       .then((res) => {
//         setCharacter((prev) => ({ ...prev, homeworld: res.data.name }));
//       })
//       .catch(() => setCharacter((prev) => ({ ...prev, homeworld: "n/a" })));
//   } else {
//     setCharacter((prev) => ({ ...prev, homeworld: "n/a" }));
//   }
// };

const getFilms = (selected, setCharacter) => {
  if (selected.films.length > 0) {
    let films = [];
    selected.films.forEach((filmUrl) => {
      axios
        .get(filmUrl.replace('http', 'https'))
        .then((res) => {
          films = [...films, res.data.title];
        })
        .then(() => setCharacter((prev) => ({ ...prev, films })))
        .catch(() => setCharacter((prev) => ({ ...prev, films: ["n/a"] })));
    });
  } else {
    setCharacter((prev) => ({ ...prev, films: "n/a" }));
  }
};


export function parseCharacter(selected, setCharacter) {
  if (selected) {
    setCharacter({
      id: selected.url.match(/\d+/),
      name: selected.name,
      height: selected.height,
      mass: selected.mass,
      hair_color: selected.hair_color,
      skin_color: selected.skin_color,
      eye_color: selected.eye_color,
      birth_year: selected.birth_year,
      gender: selected.gender,
      homeworld: selected.homeworld,
    });
    // getHomeworld(selected, setCharacter);
    getFilms(selected, setCharacter);
  }
}