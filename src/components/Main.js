import React, { useState, useEffect } from 'react';
import fire, { db } from "../fire"

import Login from "./Login/index"

import {
  Redirect
} from "react-router-dom";

function Main() {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = () => {
    clearErrors()
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        localStorage.setItem('user_id', user.user.uid)
        localStorage.setItem('user_email', email)
        window.location.href = "/home";
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disable':
          case 'auth/user-not-found':
            setEmailError(err.message)
            break
          case 'auth/wrong-password':
            setPasswordError(err.message)
            break
        }
      })

  }

  const handleSignUp = () => {
    clearErrors()
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        localStorage.setItem('user_email', email)
        db
        .collection('usuarios')
        .add({
          email: email,
          password: password, 
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
              setEmailError(err.message)
              break
            case 'auth/weak-password':
              setPasswordError(err.message)
              break
          }
        })
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message)
            break
          case 'auth/weak-password':
            setPasswordError(err.message)
            break
        }
      })

  }


  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs()
        setUser(user)
      } else {
        setUser('')
      }
    })
  }

  useEffect(() => {
    authListener()

  }, [])

  return (
    <div className="App">
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
}
export default Main;