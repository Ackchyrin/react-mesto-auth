import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Сохранить'
            onSubmitForm={handleSubmit}
        >
            <div className="popup__form">
                <input
                    className="popup__input popup__input_name"
                    id="name"
                    type="text"
                    name="nametype"
                    placeholder="Введите ваше имя"
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <span className="error" id="name-error"></span>
                <input
                    className="popup__input popup__input_about"
                    type="text"
                    id="job"
                    name="job"
                    placeholder="Введите вашу профессию"
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <span className="error error_second" id="job-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
