import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const menus = [
    {
        id: 1,
        linkText: 'Home',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 7,
                link: '/news/news-fields',
                linkText: 'News Fields'
            },
            {
                id: 8,
                link: '/news/news-articles',
                linkText: 'News Details'
            },
  
        ]
    },
    {
        id: 2,
        linkText: 'E-services',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 9,
                link: '/service',
                linkText: 'Veille Interractive'
            },
            {
                id: 10,
                link: '/single-service',
                linkText: 'NewsLetters'
            },
        ]
    },
    {
        id: 3,
        linkText: 'E-bib',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 11,
                link: '/portfolio',
                linkText: 'Evennement Scientifique',
            },
            {
                id: 12,
                link: '/single-portfolio',
                linkText: 'Copération & Appel d\'offre',
            },
            {
                id: 13,
                link: '/Magazines',
                linkText: 'Magazines de l\'actualités',
            },
        ]
    },
    {
        id: 4,
        linkText: 'Assets',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 14,
                link: '/assets/humains',
                linkText: 'Humains'
            },
            {
                id: 15,
                link: '/assets/materials',
                linkText: 'Materials'
            },
        ]
    },
    {
        id: 5,
        linkText: 'About',
        link: '/about'
    },
    {
        id: 6,
        linkText: 'Contact',
        link: '/contact'
    },
];

const MainMenu = () => {
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

            {menus.length > 0 ? menus.map((item, i) => (
                <li key={i}
                    onClick={() => handleShowHideOnMobileMenu(item?.id)}
                    className={`${item.child ? 'dropdown' : ''} nav-item`}>
                    {item.child ? <NavLink onClick={e => e.preventDefault()} to="/"
                        className="menu-dropdown nav-link"
                        data-toggle="dropdown">{item.linkText}
                    </NavLink>
                        : <NavLink to={item.link} className="nav-link"
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