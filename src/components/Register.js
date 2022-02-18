import React from "react";
import { Link } from "react-router-dom";

function Register({handleRegister}){
    const [userData, setUserData] = React.useState({
        email:"",
        password:""
    });

    function handleChange(event){
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]:value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        handleRegister(userData);
    }

    return(
        <div className="entry">
            <p className="entry__title">Регистрация</p>
            <form onSubmit={handleSubmit} className="entry__form" name="register">
                <input className="entry__change-line" id="email" type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange}></input>
                <input className="entry__change-line" id="password" type="password" name="password" placeholder="Пароль" value={userData.password} onChange={handleChange}></input>
                <button className="entry__button">
                    Зарегистророваться
                </button>
            </form>
            <p className="entry__text">
                Уже зарегистрованы?{" "}
                <Link className="entry__text" to="/sign-in">Войти</Link>
            </p>
        </div>
    );
}

export default Register;
