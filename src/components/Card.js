import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext"

function Card(props){

    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.owner._id === currentUser._id;

    const cardDeleteButton = (
        `element__delete ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    const isLiked = props.likes.some(i => i._id === currentUser._id);

    const cardLikeButton = (
        `element__like ${isLiked ? 'element__like_pressed' : ''}`
    );

    function handleClick(){
        props.onCard(props);
    }

    function handleClickDeleteCard() {
        props.onCardDelete(props);
    }

    return(
        <article className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
            <div className="element__about">
                <h2 className="element__description">{props.name}</h2>
                <div>
                   <button className={cardLikeButton} type="button" onClick={() => props.onCardLike(props)}></button>
                   <p className="element__check">{props.likes.length}</p>
                </div>
                <button className={cardDeleteButton} onClick={handleClickDeleteCard}></button>
            </div>
        </article>
    );
}

export default Card;
