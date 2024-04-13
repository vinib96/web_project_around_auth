import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(UserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        name={"profile"}
        title={"Editar Perfil"}
        buttonName={"Enviar"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        {" "}
        <label>
          <input
            type="text"
            name="name"
            id="name-input"
            className="popup__input popup__input_type_name"
            placeholder="Nome"
            minLength={2}
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <span className="name-input-error"></span>
        </label>
        <label>
          <input
            type="text"
            name="about"
            id="about-input"
            className="popup__input popup__input_type_about"
            placeholder="Sobre mim"
            minLength={2}
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <span className="about-input-error"></span>
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
