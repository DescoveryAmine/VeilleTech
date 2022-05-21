import { AuthContext } from '../../context/auth-context';
import { useState, useContext, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import PostLogmenus from './PostLogMenu';
const afterLogmenus = require ('./AfterLogMenu');

const MainMenu = () => {
    
    
    const auth = useContext(AuthContext);
    let Menus;
    const afLogmenus = afterLogmenus.AfterLogmenus(auth.userName);

    if   (auth.isLoggedIn) {
          Menus = afLogmenus}
    else {Menus = PostLogmenus}

    const [showMobileSubmenu, setShowMobileSubmenu] = useState(0);
    const handleShowHideOnMobileMenu = (id) => {
        if (showMobileSubmenu === 0) {
            setShowMobileSubmenu(id);
        } else {
            setShowMobileSubmenu(0);
        }

    }

    return (
        <ul className="navbar-nav">

            {Menus.length > 0 ? Menus.map((item, i) => (
                <li key={i}
                    onClick={() => handleShowHideOnMobileMenu(item?.id)}
                    className={`${item.child ? 'dropdown' : ''} nav-item`}>
                    {item.child ? <NavLink onClick={e => e.preventDefault()} to="/"
                        className="menu-dropdown nav-link"
                        data-toggle="dropdown">{item.linkText}
                    </NavLink>
                        : <NavLink to={item.link} className={`${i===6?"Profile-nav-link" : "nav-link"}`}
                            data-toggle="dropdown" aria-expanded="true">{item.linkText}

                        </NavLink>}

                    {item.child ?
                        <ul className={`dropdown-menu ${showMobileSubmenu === item?.id ? 'show' : ''}`} role="menu">
                            {item.submenu.map((sub_item, i) => (
                                <li key={i}>
                                    {sub_item.child ?
                                        <NavLink onClick={e => e.preventDefault()}
                                            to="/">{sub_item.linkText}</NavLink>
                                        : <NavLink
                                            to={sub_item.link} className="dropdown-item" >{sub_item.linkText}</NavLink>}

                                </li>
                            ))}
                        </ul>
                        : null
                    }
                </li>
            )) : null}
        </ul>
    );
};

export default MainMenu;