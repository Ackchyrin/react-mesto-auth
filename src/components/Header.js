import React from "react";
import { useLocation, Link } from "react-router-dom";
import mestoLogo from "../images/header-logo.svg"

function Header({signOut, email}){
    const location = useLocation();

    return(
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Лого заголовка" />
            <div className="header__profile">
                {location.pathname === "/" && <p className="header__text">{email}</p>}
                {location.pathname === "/sign-in" && <Link className="header__link" to="/sign-up">Регистрация</Link>}
                {location.pathname === "/sign-up" && <Link className="header__link" to="/sign-in">Войти</Link>}
                {location.pathname === "/" && <Link className="header__link" to="/sign-in" onClick={signOut}>Выйти</Link>}
            </div>
        </header>
    );
}

export default Header;
