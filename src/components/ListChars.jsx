import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { LikeBtns } from './LikeBtns';


const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '100%',
  },
  char: {
    display: 'grid',
    gridTemplateColumns: '1fr 6fr 2fr 2fr 2fr'
  },
});


export default function ListChars({ characters, setSelected, setCharacters, user }) {
  const classes = useStyles();


  const updateItem = (charItem, user) => {
    const userId = user.id;
    
    const data = {
        likedBy: charItem.likedBy ? (
          charItem.likedBy.includes(userId) ?
            charItem.likedBy.filter(id => id !== userId) :
            charItem.likedBy.concat(userId)
        ) : [userId]
    };
    const newArray = characters.map(сhar => сhar.id === charItem.id ? {...сhar, likedBy: data.likedBy} : сhar )
    setCharacters(newArray)
  
  }


  return (
    <div>
     <List dense className={classes.root}>
      {characters.map((char) => {
        const labelId = `checkbox-list-secondary-label-${char.name[0]}`;
        return (
          <ListItem key={char.name} button onClick={() => setSelected(char)} className={classes.char}>
 
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${char.name}`}
              >
                  {char.name[0]}
              </Avatar>
            </ListItemAvatar>
           
            <ListItemText id={labelId}  >
              <NavLink to={`/profile/${char.name.split(' ').join('-').toLowerCase()}`} style={{display: 'flex', padding: '8px 0'}}>{char.name}</NavLink>
            </ListItemText>

            <ListItemText id={labelId} primary={char.gender} />
            <ListItemText id={labelId} primary={char.homeworld} />
            <ListItemSecondaryAction>
               <LikeBtns like={char.likedBy.length ? char.likedBy.length : 0} dislike={0} updateItem={updateItem} char={char} userId={user.id} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}
