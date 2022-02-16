import { Link } from "react-router-dom";

function MobileAuth({ signOut, isOpen, email }) {
  return (
    <div className={`mobile-auth ${isOpen ? "mobile-auth__active" : ""}`}>
      <p className="mobile-auth__text">{email}</p>
      <Link
        className="mobile-auth__link"
        to="/sign-in"
        onClick={signOut}
      >
        Выйти
      </Link>
    </div>
  );
}

export default MobileAuth;