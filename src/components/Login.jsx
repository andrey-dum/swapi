import React from 'react';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';


export default function Login({setUser, user}) {


      const auth = (data) => {
        const experationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('userID', data.userID)
        localStorage.setItem('experationDate', experationDate)
        setUser({
          id: data.userID,
          name: data.name,
          token: data.accessToken,
        })
      }

      const responseFacebook = (res) => {
        auth(res)
      }

      // const handleSuccess = (data) => {
      //   localStorage.setItem('token', data.code)
      //   history.push('/')
        
      // }
   
      const handleFailure = (error) => {
        alert(
          `Failed to login.`
        );
      }
    
    if (user) {
      return <Redirect to='/' />
    }

    return (
        <div className="login">
            <div className="loginBlock">
                <h1>Авторизация</h1>
                    <FacebookLogin
                      appId="553311092296743"
                      autoLoad={false}
                      fields="name,email,picture"
                      // onClick={componentClicked}
                      callback={responseFacebook}
                      onFailure={handleFailure}
                      />
            </div>
        </div>
    )
}

