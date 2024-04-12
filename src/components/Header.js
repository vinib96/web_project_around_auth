function Header({ text, exit }) {
  function menuOpen() {
    const menu = document.querySelector('.header__menu');
    menu.classList.toggle('header__menu_open');
  }
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <img
            src={require('../styles/images/logo.png')}
            alt='Logo da
            Around'
            className='logo__header-image'
          />
          <div className='header__hamburguer'>
            <button className='header__hamburguer_icon' onClick={menuOpen}>
              <img src={require('../styles/images/hamburguer icon.png')} />
            </button>
          </div>
          <div className='header__login'>
            <span>{text}</span>
            <span>{exit}</span>
          </div>
        </div>

        <div className='header__menu'>
          <span>{text}</span>
          <span className='header__logout'>{exit}</span>
        </div>
        <div className='header__line' />
      </header>
    </>
  );
}

export default Header;
