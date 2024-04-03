import { useEffect } from "react";
function PopupWithForm({
  onClose,
  isOpen,
  title,
  name,
  children,
  buttonName,
  onSubmit,
}) {
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains(`popup`)) {
        onClose();
      }
    });
  }, []);
  return (
    <>
      <section
        className={`popup popup_type_${name}  ${isOpen ? "popup__opened" : ""}`}
      >
        <div className="popup__container">
          <button
            type="button"
            className="popup__close-button"
            onClick={onClose}
          >
            <img
              src={require("../styles/images/Close__Icon.png")}
              alt="Botão
              de fechar"
            />
          </button>
          <div className="popup__form-container">
            <h3 className="popup__title">{title}</h3>
            <form className="popup__form" onSubmit={onSubmit}>
              <fieldset className="popup__formset">
                {children}
                <button
                  type="submit"
                  className="popup__submit-button popup__button"
                >
                  {buttonName}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default PopupWithForm;
