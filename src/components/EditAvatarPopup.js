import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const refInput = React.useRef("");

    React.useEffect(() => {
        refInput.current.value = '';
      }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: refInput.current.value,
        });
    }

    return (
        <PopupWithForm
            title='Сменить аватар'
            name='avatar'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Сохранить'
            onSubmitForm={handleSubmit}
        >
            <div className="popup__form">
                <input
                    className="popup__input popup__input_avatar"
                    type="url"
                    id="avatar"
                    name="avatar"
                    placeholder="Ссылка на аватар"
                    required
                    ref={refInput}
                />
                <span className="error" id="avatar-error"></span>
            </div>
        </PopupWithForm>
    );

}

export default EditAvatarPopup;
