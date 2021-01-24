import React from 'react'
import useCharacter from '../useCharacter';
import { Avatar, CircularProgress } from '@material-ui/core';


export const Profile = ({selected}) => {
    const { character } = useCharacter(selected)

    // React.useEffect(() => {
    //    const getProfile = async () => {
    //     const res = await axios.get(`https://swapi.dev/api/people/${match.params.id}`)
    //     setProfile(res.data.results[0])
    //    }
    //    getProfile()
    // }, [match.params.id]);

    
    if (!character || !character.films) {
        return <div style={{marginTop: 50, textAlign: 'center'}} ><CircularProgress /></div> 
    }
   
    return (
        <div className={'profile'}>
            <div>
                <Avatar
                    style={{ height: '100px', width: '100px', fontSize: 50 }}
                    alt={`Avatar n°${character.name}`}
                >
                    {character.name[0]}
                </Avatar>
              </div>
            <div><h1>{character.name && character.name}</h1></div>
            <div><b>Height</b>: {character.height}</div>
            <div><b>Mass</b>: {character.mass}</div>
            <div><b>Hair color</b>: {character.hair_color}</div>
            <div><b>Skin color</b>: {character.skin_color}</div>
            <div><b>Eye color</b>: {character.eye_color}</div>
            <div><b>Birth year</b>: {character.birth_year}</div>
            <div><b>Gender</b>: {character.gender}</div>
             
            { character.homeworld && <div><b>Homeworld:</b> {character.homeworld }</div> }
            
            <div>{character.vehicles && character.vehicles[0]}</div>
            
            <div><b>Films:</b> 
                <ul>
                {character.films && character.films.map(film => (<li key={film}>{film}</li>))} 
                </ul>
            </div>

        </div>
    )
}
