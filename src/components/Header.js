function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src={require("../styles/images/logo.png")}
            alt="Logo da
            Around"
            className="logo__header-image"
          />
        </div>
        <div className="header__line" />
      </header>
    </>
  );
}

export default Header;
