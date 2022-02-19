import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import mestoLogo from "../images/header-logo.svg"

function Header({signOut, email}){

    return(
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Лого заголовка" />
            <div className="header__profile">
                <Switch>
                    <Route path={'/sign-in'}>
                        <Link className="header__link" to="/sign-up">Регистрация</Link>
                    </Route>
                    <Route path={'/sign-up'}>
                        <Link className="header__link" to="/sign-in">Войти</Link>
                    </Route>
                    <Route path={'/'}>
                        <p className="header__text">{email}</p>
                        <Link className="header__link" to="/sign-in" onClick={signOut}>Выйти</Link>
                    </Route>
                </Switch>
            
            
            </div>
        </header>
    );
}

export default Header;
