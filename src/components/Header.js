function Header({ text }) {
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
          <button className='header__login'>{text}</button>
        </div>
        <div className='header__hamburguer'>
          <button className='header__hamburguer_icon' onClick={menuOpen}>
            <img src={require('../styles/images/hamburguer icon.png')} />
          </button>
        </div>
        <div className='header__menu'>
          <span>teste</span>
          <button className='header__logout'>Sair</button>
        </div>
        <div className='header__line' />
      </header>
    </>
  );
}

export default Header;
