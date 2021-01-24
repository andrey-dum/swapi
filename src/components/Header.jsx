import React from 'react'

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link, NavLink } from 'react-router-dom';
import { Button, IconButton, Toolbar } from '@material-ui/core';


export function Header({classes, logout, user}) {
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>SWAPI</Link>
            </Typography>
            { user && <NavLink to="/liked"><IconButton><FavoriteIcon/></IconButton></NavLink> }
            {user ? <Button color="inherit" onClick={() => logout()}>Logout</Button> : <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    )
}
