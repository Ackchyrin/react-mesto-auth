import React, { useContext } from "react";
import {CurrentUserContext} from "../context/CurrentUserContext"
import Card from "./Card";


function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return(
        <>
            <main className="main" >
                <section className="profile">
                    <div className="profile__edit-avatar" onClick={props.onEditAvatar} >
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
                        <span className="profile__edit-pencile" ></span>
                    </div>
                    <div className="profile__info" >
                        <h1 className="profile__info-name" >{currentUser.name}</h1>
                        <p className="profile__info-about" >{currentUser.about}</p>
                        <button className="profile__info-button" type="button" onClick={props.onEditProfile} ></button>
                    </div>
                    <button className="profile__button" type="button" onClick={props.onAddPlace} ></button>
                </section>
                <section className="elements" >
                {props.cards.map((card) => <Card key={card._id} {...card} onCard={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)}
                </section>
            </main>
        </>
    );
}

export default Main;
