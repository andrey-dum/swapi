import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function LikedPage({characters, userId = null}) {
    const likedChars = characters.filter(char => char.likedBy.includes(userId))
    return (
        <div>
            { likedChars.length ? likedChars.map(char => <div>{char.name}</div>) : <h1 style={{textAlign: 'center'}}><FavoriteBorderIcon /> Список пустой</h1> }
        </div>
    )
}
