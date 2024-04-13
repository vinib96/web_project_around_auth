import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

import * as auth from '../utils/auth';

function Register({ handleRegister, handleRegisterError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          handleRegister('success');
        } else {
          handleRegisterError('fail');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header text={'Faça o login'}></Header>
      <form className='auth__container' onSubmit={handleSubmit}>
        <h3 className='auth__title'>Inscrever-se</h3>
        <label>
          <input
            type='email'
            name='email'
            id='email-input'
            className='auth__input'
            placeholder='E-Mail'
            minLength={2}
            maxLength={40}
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
            minLength={2}
            maxLength={200}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' className='auth__buttom'>
          Inscrever-se
        </button>
        <span className='auth__subtitle'>
          Já é um membro?
          <Link to='/login' className='auth__link'>
            Faça o login aqui!!
          </Link>
        </span>
      </form>
    </>
  );
}

export default Register;
