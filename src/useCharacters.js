import { useState, useEffect } from "react";
import axios from "axios";


const getHomeworld = async (selected) => {
  if (selected.homeworld) {
    const url = selected.homeworld.replace('http', 'https')
    let res = await axios.get(url)
        return ({
          ...selected,
          homeworld: res.data.name
        })
      }
};


function useCharacters(setError) {
  const initialUrl = "https://swapi.dev/api/people/";
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(initialUrl);

const fetchItems = async () => {
  
  try {
    if (nextUrl) {
      let res = await axios.get(nextUrl);
      res.data.results.map((item) => {
          getHomeworld(item).then(data => {
            setCharacters((prev) => [...prev, {...data, likedBy: [], id: parseInt(data.url.match(/\d+/)) }])
          })
      })
      // setNextUrl(res.data.next.replace('http', 'https'));
   }
   
    setLoading(false)
    // if(!nextUrl) {
    //   setLoading(false)
    // }

  } catch (error) {
    setError('Error:', error)
    setLoading(false)
  }
  
}

  useEffect(() => {
    fetchItems()
  }, [nextUrl]);

  // useEffect(() => {
  //   localStorage.setItem('characters', JSON.stringify(characters));
  // }, [characters])

  return {
    characters, setCharacters, loading
  };
}

export default useCharacters;