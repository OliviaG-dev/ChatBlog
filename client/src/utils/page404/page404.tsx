import './page404.css';
import nofound from '../../assets/nofound.gif';
import { NavLink } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="wrapper_nofound">
      <div className="nofound">
        <h2>Page non trouvée</h2>
        <div className="container_nofound">
          <img src={nofound} alt="teemo" className="nofound_image" />
          <div className="nofound_text">
            <p>Revenir à la page d'accueil</p>
            <button className="button_retour--nofound">
              <NavLink to="/" className="link_retour">
                ici
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
