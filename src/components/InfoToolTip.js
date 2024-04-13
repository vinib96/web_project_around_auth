function InfoToolTip({ isOpen, popupType, handleClose }) {
  return (
    <section className={`popup ${isOpen ? 'popup__opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close-button'
          onClick={handleClose}
        >
          <img
            src={require('../styles/images/Close__Icon.png')}
            alt='Botão
              de fechar'
          />
        </button>
        <div className='popup__form-container'>
          <form className='popup__form'>
            <fieldset className='popup__formset'>
              <div>
                <img
                  src={
                    popupType === 'success'
                      ? require('../styles/images/correct.png')
                      : require('../styles/images/incorrect.png')
                  }
                />
                <p className='popup__message'>
                  {popupType === 'success'
                    ? 'Vitória! Você se registrou.'
                    : 'Ops, algo deu errado! Por favor, tente novamente.'}
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}

export default InfoToolTip;
