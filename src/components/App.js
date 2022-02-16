import React, {useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, checkToken } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import MobileAuth from "./Mobileauth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  const [registerStatus, setRegisterStatus] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [isMobileAuth, setMobileAuth] = React.useState(false)

  useEffect(() => {
    Promise.all([api.getAboutUser(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch(err => console.log(err))
  }, []);

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setViewOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setViewOpen(true);
  }

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(user => setCurrentUser(user), closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(item => setCurrentUser(item), closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then(card => setCards([card, ...cards]), closeAllPopups())
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function handleRegister(userData) {
    if (!userData.email || !userData.password) {
      return;
    }
    register(userData.email, userData.password)
      .then((res) => {
        history.push("./sign-in");
        setRegisterStatus(true);
        setInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisterStatus(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    setMobileAuth(false);
  }

  function handleLogin(userData) {
    if (!userData.email || !userData.password) {
      return;
    }
    authorize(userData.email, userData.password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      checkToken(token).then((res) => {
        if (res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      });
    }
  }, []);

  function openMobileAuth() {
    setMobileAuth(true);
  }

  function closeMobileAuth() {
    setMobileAuth(false);
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <MobileAuth signOut={signOut} isOpen={isMobileAuth} email={email} />
      <Header signOut={signOut} email={email} closeMobileAuth={closeMobileAuth} openMobileAuth={openMobileAuth} isMMobileAuth={isMobileAuth} />
      <Switch>
      <ProtectedRoute exact path="/" loggedIn={loggedIn}>
        <Main
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardClick={(item) => handleCardClick(item)}
          cards={cards}
          onCardLike={(card) => handleCardLike(card)}
          onCardDelete={(card) => handleCardDelete(card)}
        />
        <Footer/>
        </ProtectedRoute>
        <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
      </Switch>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={(user) => handleUpdateUser(user)} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={(avatar) => handleUpdateAvatar(avatar)} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={(newCard) => handleAddPlaceSubmit(newCard)} />
      <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} TextRegisterOk={"Вы успешно зарегистрировались!"} TextRegisterBad={"Что-то пошло не так! Попробуйте ещё раз."} registerStatus={registerStatus}/>
      <PopupWithForm
        title='Вы уверены?'
        name='delete'
        btnText='Да' />
      <ImagePopup
        card={selectedCard}
        view={isViewOpen}
        onClose={closeAllPopups}
      />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
