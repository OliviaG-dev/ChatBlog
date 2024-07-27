import './nav.css';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className="nav_links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }
          >
            Rechercher
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? 'activeLink' : 'inactiveLink'
            }
          >
            Ajouter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
