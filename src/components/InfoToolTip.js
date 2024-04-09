import PopupWithForm from './PopupWithForm';
function infoToolTip(isOpen, onClose) {
  return (
    <>
      <PopupWithForm
        name={'info'}
        title={''}
        buttonName={''}
        isOpen={isOpen}
        onClose={onClose}
      >
        <p className='info__message'></p>
      </PopupWithForm>
    </>
  );
}

export default infoToolTip;
