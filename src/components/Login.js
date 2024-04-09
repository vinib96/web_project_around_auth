import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';

import * as auth from '../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    auth.authorize(email, password).then((res) => {
      console.log(res);
      history.push('/main');
    });
  }

  return (
    <>
      <Header text={'Entrar'}></Header>
      <div className='auth__container'>
        <h3 className='auth__title'>Entrar</h3>
        <label>
          <input
            type='email'
            name='email'
            id='email-input'
            className='auth__input'
            placeholder='E-Mail'
            minLength='2'
            maxLength='40'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type='password'
            name='password'
            id='password-input'
            className='auth__input'
            placeholder='Senha'
            minLength='2'
            maxLength='200'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' className='auth__buttom' onClick={handleSubmit}>
          Entrar
        </button>
        <span className='auth__subtitle'>
          Ainda não é membro?{' '}
          <Link to='/register' className='auth__link'>
            Inscreva-se aqui!
          </Link>
        </span>
      </div>
    </>
  );
}

export default Login;