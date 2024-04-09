import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import * as auth from '../utils/auth';

import { UserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });

  useEffect(() => {
    api.getUserInfo().then(setCurrentUser);
  }, []);

  const EnableEsc = () => {
    const escFunction = useCallback((event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }, []);

    useEffect(() => {
      document.addEventListener('keydown', escFunction, false);

      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }, [escFunction]);
  };
  EnableEsc();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeleteClick(cardId) {
    setSelectedCardToDelete(cardId);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.editUserInfo(name, about).then(setCurrentUser).then(closeAllPopups);
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar).then(setCurrentUser).then(closeAllPopups);
  }

  const [cardsApp, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards().then((apiCards) => setCards(apiCards));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardId) {
    api.removeCard(cardId).then(() => {
      setCards(cardsApp.filter((card) => card._id !== cardId));
      setSelectedCardToDelete('');
    });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => setCards([newCard, ...cardsApp]))
      .then(closeAllPopups);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCardToDelete('');
    setSelectedCard({});
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <div className='App'>
      <div className='page'>
        <UserContext.Provider value={currentUser}>
          <BrowserRouter>
            <Switch>
              <ProtectedRoute
                path='/main'
                component={
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onConfirmClick={handleConfirmDeleteClick}
                    cardsApp={cardsApp}
                  ></Main>
                }
              />
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/login'>
                <Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
              </Route>
              <Route exact path='/'>
                {isLoggedIn ? (
                  <Redirect to='/main' />
                ) : (
                  <Redirect to='/login' />
                )}
              </Route>
            </Switch>
          </BrowserRouter>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmDeletePopup
            cardId={selectedCardToDelete}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Footer />
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
