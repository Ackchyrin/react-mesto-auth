import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleTitleChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link: link,
    });
  }

    return(
        <PopupWithForm
            title='Новое место'
            name='add'
            isOpen={props.isOpen}
            onClose={props.onClose}
            btnText='Создать'
            creation='Создание...'
            onSubmitForm={handleSubmit}
        >
            <div className="popup__form">
          <input
            className="popup__input popup__input_title"
            type="text"
            id="card"
            name="card"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={name || ""}
            onChange={handleTitleChange}
            required
          />
          <span className="error" id="card-error"></span>
          <input
            className="popup__input popup__input_link"
            type="url"
            id="link"
            name="link"
            placeholder="Ссылка на картинку"
            value={link || ""}
            onChange={handleLinkChange}
            required
          />
          <span className="error error_second" id="link-error"></span>
        </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
