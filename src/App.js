import React, { useEffect, useState } from 'react'
import {  Switch, Route, Redirect, useHistory } from 'react-router-dom';

import './App.css';

import { useStyles } from './theme';

import { Profile } from './components/Profile';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CircularProgress, Container, Divider } from '@material-ui/core';

import { Header } from './components/Header';
import LikedPage from './components/LikedPage';
import Login from './components/Login';
import ListChars from './components/ListChars';
import { AutocompleteBox } from './components/AutocompleteBox';

import useCharacters from './useCharacters';


function App() {
  const classes = useStyles();
  const [selected, setSelected] = useState(null)

  const [error, setError] = useState();
  const { characters, setCharacters, loading } = useCharacters(setError);

  const [user, setUser] = useState(null);
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      logout()
    } else {
        const expirationDate = new Date(localStorage.getItem('experationDate'))
        if (expirationDate <= new Date()) {
            logout()
        } else {
            const userID = localStorage.getItem('userID')
            setUser({
              token: token,
              id: userID
            })
            // history.push('/')
        }
    }
    
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userID',)
    localStorage.removeItem('experationDate')
    setUser(null)
    history.push('/login')
  }
    
  // if (!user) {
  //   return <Redirect to="/login" />
  // }
 
  return (
    <Container className={classes.root} maxWidth="md">
      <CssBaseline />

      <Header classes={classes} logout={logout} user={user} />

      <main className={classes.content}>
        <Toolbar />
          { !user ? 
          
            <Switch>
            <Route path="/login">
              <Login setUser={setUser} user={user} />
            </Route>
            <Route exact path="/*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        :
        <Switch>
            <Route path={`/profile/:name`}>
              <Profile selected={selected} />
            </Route>

            <Route path="/liked">
              <LikedPage characters={characters} userId={user ? user.id : null}/>
            </Route>

            <Route path="/" exact>
              <AutocompleteBox items={characters} setSelected={setSelected} />
              <Divider />
                {loading 
                  ? <div style={{marginTop: 50, textAlign: 'center'}} ><CircularProgress /></div> 
                  : <ListChars setCharacters={setCharacters} selected={selected} characters={characters} setSelected={setSelected} user={user} />
                }
            </Route>

            <Route path="*" >
              <Redirect to="/" />
            </Route>

          </Switch>  
        }
      </main>
    </Container>
  );
}

export default App;
