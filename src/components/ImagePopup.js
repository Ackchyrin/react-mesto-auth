import React from "react";

function ImagePopup(props){
    return(
        <div className={`popup popup_open-image popup_transition ${props.view ? 'popup_open' : ''} `} >
            <figure className="open-image">
                <button className="popup__close" type="button" onClick={props.onClose} ></button>
                <img className="open-image__picture" src={props.card.link} alt={props.card.name} />
                <figcaption className="open-image__caption" >{props.card.name}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
