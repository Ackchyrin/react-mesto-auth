import register__ok from "../images/register_ok.svg";
import register__bad from "../images/register_bad.svg";

function InfoTooltip(props){
    return(
        <div className={`popup popup_transition ${props.view ? 'popup_open' : ''} `}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose} ></button>
                <img className="info-tooltip__image" alt="статус регистрации" src={props.registerStatus ? register__ok : register__bad}/>
                <p className="info-tooltip__text">{props.registerStatus ? props.TextRegisterOk : props.TextRegisterBad}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;
