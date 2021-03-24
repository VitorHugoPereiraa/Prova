import React from 'react';
import './Login.css'


function Login(props) {

  const { email, setEmail, password, setPassword, handleLogin, handleSignUp, hasAccount, setHasAccount, emailError, passwordError } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <h2>Tarefas</h2>
        <label>Email: </label>
        <input type="email" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
        <p className="errorMsg">{emailError}</p>
        <label>Senha: </label>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {
            hasAccount ? (
              <>
                <button onClick={handleLogin}>Entrar</button>
                <p>Não possui uma conta ? <span onClick={()=> setHasAccount(!hasAccount)}> Criar conta </span></p>
              </>
            ) : (
              <>
                <button onClick={handleSignUp}>Criar conta</button>
                <p>Já possui uma conta ? <span onClick={()=> setHasAccount(!hasAccount)}> Entrar </span></p>
              </>
            )
          }
        </div>
      </div>
    </section>
  );
}

export default Login;