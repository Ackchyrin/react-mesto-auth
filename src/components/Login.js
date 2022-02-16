import React from "react";

function Login({handleLogin}){
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
        handleLogin(userData);
        setUserData({
            email:"",
            password:""
        });
    }

    return(
        <div className="entry">
            <p className="entry__title">Вход</p>
            <form onSubmit={handleSubmit} className="entry__form" name="register">
                <input className="entry__change-line" id="email" type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange}></input>
                <input className="entry__change-line" id="password" type="password" name="password" placeholder="Пароль" value={userData.password} onChange={handleChange}></input>
                <button className="entry__button">Войти</button>
            </form>
        </div>
    );
}

export default Login;
