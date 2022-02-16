import React from "react";

function PopupWithForm(props){
    return(
        <div className={` popup popup_input_${props.name} popup_transition ${props.isOpen ? 'popup_open' : ''} `} onClick={props.onClose} >
            <div className="popup__container" onClick={(event) => event.stopPropagation()} >
                <button className={`popup__close popup__close_${props.name}`} type="button" onClick={props.onClose} ></button>
                <form className={`popup__form popup__form_${props.name}`} name={props.name} onSubmit={props.onSubmitForm}>
                    <h2 className="popup__form_title">{props.title}</h2>
                    {props.children}
                    <button className={`popup__save close-card-${props.name}`} type="submit">{props.btnText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
