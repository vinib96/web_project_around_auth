import { useContext } from 'react';

import { UserContext } from '../contexts/CurrentUserContext';

import Header from './Header';

import Card from './Card';

function Main({
  onClick,
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cardsApp,
  onConfirmClick,
  handleLogout,
  userEmail,
}) {
  const currentUser = useContext(UserContext);

  return (
    <>
      <Header
        text={userEmail}
        exit={
          <button className='header__logout' onClick={handleLogout}>
            Sair
          </button>
        }
      />
      <section className='profile' onClick={onClick}>
        <div className='profile__container'>
          <button onClick={onEditAvatarClick} className='profile__pic-button'>
            <img
              src={currentUser.avatar}
              alt='Imagem de perfil do usuário'
              className='profile__picture'
            />
          </button>
          <div className='profile__input'>
            <div className='profile__text-button'>
              <h1 className='profile__name block'>{currentUser.name}</h1>
              <button
                type='button'
                onClick={onEditProfileClick}
                className='profile__edit-button'
              >
                <img
                  src={require('../styles/images/edit__button.png')}
                  alt='Botão de editar perfil'
                />
              </button>
            </div>
            <h2 className='profile__about block'>{currentUser.about}</h2>
          </div>
        </div>
        <button
          type='button'
          className='profile__add-button'
          onClick={onAddPlaceClick}
        >
          <img
            className='profile__add-image'
            src={require('../styles/images/Add__button.png')}
            alt='Botão de adicionar'
          />
        </button>
      </section>
      <section className='elements'>
        <template id='cards' />
        <ul className='elements__container'>
          {cardsApp.map((card) => (
            <Card
              cardData={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onConfirmClick={onConfirmClick}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
