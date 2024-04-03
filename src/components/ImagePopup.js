function ImagePopup({ card, onClose }) {
  return (
    <>
      <section
        className={`popup popup_full ${card.link ? "popup__opened" : ""}`}
      >
        <div className="popup__container popup__container_image" id="image">
          <button
            type="button"
            className="popup__close-button"
            id="close-image"
            onClick={onClose}
          >
            <img
              src={require("../styles/images/Close__Icon.png")}
              alt="Botão
              de fechar"
            />
          </button>
          <img src={card.link} alt={card.name} className="popup__image-large" />

          <p className="popup__text-sub">{card.name}</p>
        </div>
      </section>
    </>
  );
}

export default ImagePopup;
