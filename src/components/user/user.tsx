import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function User(): JSX.Element {
  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favotites}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        <span className="header__favorite-count">3</span>
      </Link>
    </li>
  );
}

export default User;
